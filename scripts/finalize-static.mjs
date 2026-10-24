// Flattens the build output so a plain static host can serve `dist/` directly.
//
// TanStack Start writes the browser bundle + prerendered HTML into `dist/client`.
// Static hosts (GitHub Pages, Netlify, nginx, ...) serve the root of
// `dist`, so without this step there is no `dist/index.html` and nginx answers
// 403 Forbidden. This script moves `dist/client/*` up into `dist/`, drops any
// server-only leftovers, and adds a `404.html` fallback for client-side routes.
import { existsSync } from "node:fs";
import { cp, readdir, rm, copyFile, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const client = path.join(dist, "client");

if (!existsSync(client) || !existsSync(path.join(client, "index.html"))) {
  // Not a prerendered build — nothing to flatten.
  console.log("[static] not a static build — skipping");
  process.exit(0);
}


// Remove server-only artifacts from a previous SSR build.
for (const leftover of ["server", "nitro.json", "package.json", "package-lock.json", ".output"]) {
  await rm(path.join(dist, leftover), { recursive: true, force: true });
}

for (const entry of await readdir(client)) {
  await cp(path.join(client, entry), path.join(dist, entry), { recursive: true });
}
await rm(client, { recursive: true, force: true });

const indexHtml = path.join(dist, "index.html");
if (!existsSync(indexHtml)) {
  console.error("[static] ERROR: dist/index.html was not produced");
  process.exit(1);
}

// SPA-style fallback so unknown paths still boot the app instead of 404ing hard.
await copyFile(indexHtml, path.join(dist, "404.html"));

await keepPreviousAssets();

console.log("[static] dist/ is ready to be served as a static site");

/**
 * Copies the script, style and font files of the version that is live right now into
 * dist/assets, next to the new ones. Every deploy renames these files, and a phone or
 * cache that still has a page from before the deploy asks for the old names; without
 * them it shows "Importing a module script failed". Keeping the previous version's files
 * for one deploy makes such pages keep working until they are reloaded.
 *
 * Runs only on GitHub Actions (or when KEEP_ASSETS_FROM is set); a failure never fails
 * the build.
 */
async function keepPreviousAssets() {
  await keepFromArchive();
  const site = process.env.KEEP_ASSETS_FROM || (process.env.GITHUB_ACTIONS === "true" ? "https://recanedzamija.com" : "");
  if (!site) return;
  const assetsDir = path.join(dist, "assets");
  const ASSET = /(?:^|[/"'`(\s,])((?:[\w.-]+-)?[\w-]{8}\.(?:js|css|woff2?|jpg|png|svg|webp))(?=[?"'`)\s,]|$)/g;
  const names = (text) => [...text.matchAll(ASSET)].map((m) => m[1]);

  try {
    // Pages listed in the sitemap, plus the home page
    const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8").catch(() => "");
    const pages = new Set(["/"]);
    for (const m of sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)) pages.add(m[1]);

    const queue = [];
    let pagesRead = 0;
    let failure = "";
    for (const page of pages) {
      const res = await fetch(new URL(page, site), { signal: AbortSignal.timeout(15000) }).catch((e) => {
        failure ||= e?.cause?.code || e?.cause?.message || e?.message || String(e);
        return null;
      });
      if (res && !res.ok) failure ||= `HTTP ${res.status}`;
      if (!res?.ok) continue;
      const html = await res.text();
      pagesRead++;
      for (const m of html.matchAll(/\/assets\/([\w.-]+)/g)) queue.push(m[1]);
    }

    const seen = new Set();
    let copied = 0;
    while (queue.length) {
      const name = queue.shift();
      if (seen.has(name)) continue;
      seen.add(name);
      const target = path.join(assetsDir, name);
      if (existsSync(target)) continue; // unchanged since the last deploy
      const res = await fetch(new URL(`/assets/${name}`, site), { signal: AbortSignal.timeout(15000) }).catch(() => null);
      if (!res?.ok) continue;
      const body = Buffer.from(await res.arrayBuffer());
      await writeFile(target, body);
      copied++;
      // Scripts and styles load further files (lazy pages, fonts): keep those too
      if (/\.(js|css)$/.test(name)) for (const n of names(body.toString("utf8"))) queue.push(n);
    }
    console.log(
      `[static] read ${pagesRead}/${pages.size} live pages from ${site}, they use ${seen.size} file(s); ` +
        `kept ${copied} that the new build no longer has (the rest are unchanged)` +
        (failure ? ` [first error: ${failure}]` : ""),
    );
  } catch (e) {
    console.warn("[static] could not keep the previous version's files:", e?.message || e);
  }
}

/**
 * Same idea without the network: KEEP_ASSETS_DIR is a folder the deploy workflow restores
 * from the Actions cache. Every deploy adds its files to it, and files of earlier deploys
 * that the new build no longer has are copied back into dist/assets.
 */
async function keepFromArchive() {
  const archive = process.env.KEEP_ASSETS_DIR;
  if (!archive) return;
  try {
    const assetsDir = path.join(dist, "assets");
    await mkdir(archive, { recursive: true });
    let restored = 0;
    for (const name of await readdir(archive)) {
      const target = path.join(assetsDir, name);
      if (existsSync(target)) continue;
      await copyFile(path.join(archive, name), target);
      restored++;
    }
    // Remember this build's files for the next deploys
    await cp(assetsDir, archive, { recursive: true });
    console.log(`[static] kept ${restored} file(s) from earlier deploys (${archive})`);
  } catch (e) {
    console.warn("[static] could not use the earlier deploys' files:", e?.message || e);
  }
}
