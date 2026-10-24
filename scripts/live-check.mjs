// Diagnostic: loads every page of the live site in WebKit (iPhone) and Chromium (Android)
// and prints failed requests and errors.
import { webkit, chromium, devices } from "playwright";

const SITE = "https://recanedzamija.com";
const PAGES = ["/", "/hutbe/", "/prayer-times/", "/imam/", "/about/", "/qibla/", "/quran/", "/calendar/", "/events/", "/instaliraj/"];

for (const [engine, device] of [[webkit, "iPhone 13"], [chromium, "Galaxy S9+"]]) {
  const browser = await engine.launch();
  const ctx = await browser.newContext({ ...devices[device] });
  console.log(`\n===== ${device} =====`);
  for (const p of PAGES) {
    const page = await ctx.newPage();
    const problems = [];
    page.on("requestfailed", (r) => problems.push(`FAILED ${r.url()} ${r.failure()?.errorText}`));
    page.on("response", (r) => r.status() >= 400 && problems.push(`HTTP ${r.status()} ${r.url()}`));
    page.on("pageerror", (e) => problems.push(`PAGEERROR ${e.message}`));
    page.on("console", (m) => m.type() === "error" && problems.push(`CONSOLE ${m.text()}`));
    try {
      const res = await page.goto(SITE + p, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(1500);
      const info = await page.evaluate(() => ({
        h1: document.querySelector("h1")?.innerText,
        styled: getComputedStyle(document.body).fontFamily,
        scripts: [...document.querySelectorAll("script[src],link[rel=modulepreload]")].map((e) => e.src || e.href).length,
      }));
      console.log(`${p} -> ${res?.status()} ${JSON.stringify(info)}`);
    } catch (e) {
      console.log(`${p} -> GOTO ERROR ${e.message}`);
    }
    for (const x of problems) console.log("   ", x);
    // Click through to Hutbe from the home page as a user would
    await page.close();
  }
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("requestfailed", (r) => errs.push(`FAILED ${r.url()}`));
  await page.goto(SITE + "/", { waitUntil: "networkidle" }).catch(() => {});
  for (const link of ["/hutbe", "/prayer-times", "/imam", "/"]) {
    await page.evaluate((h) => { const a = [...document.querySelectorAll("a")].find((x) => x.getAttribute("href")?.replace(/\/$/, "") === h.replace(/\/$/, "")); a ? a.click() : (location.href = h); }, link).catch((e) => errs.push(e.message));
    await page.waitForTimeout(2500);
    console.log(`client nav ${link} -> ${page.url()} h1=${await page.evaluate(() => document.querySelector("h1")?.innerText).catch(() => "?")}`);
  }
  for (const x of errs) console.log("   ", x);
  await browser.close();
}
