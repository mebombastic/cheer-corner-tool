import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { canonical, withBase } from "@/lib/utils";
import { MONTHS_SR } from "@/lib/hijri";
// Džuma hutbe held in our mosque. To add one: put the audio file in public/hutbe/ and add an entry here.
import hutbe from "@/data/hutbe.json";

export const Route = createFileRoute("/hutbe")({
  head: () => ({
    meta: [
      { title: "Hutbe | Džamija Rečane" },
      { name: "description", content: "Džuma hutbe iz džamije u Rečanu. Slušajte ih ovdje ili preuzmite na telefon." },
      { property: "og:title", content: "Hutbe | Džamija Rečane" },
      { property: "og:description", content: "Džuma hutbe iz džamije u Rečanu." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical("/hutbe") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical("/hutbe") }],
  }),
  component: HutbePage,
});

type Hutba = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  imam: string;
  mosque: string;
  file: string;
  minutes?: number;
};

const LIST = [...(hutbe as Hutba[])].sort((a, b) => b.date.localeCompare(a.date));

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${MONTHS_SR[m - 1]} ${y}.`;
}

function HutbePage() {
  return (
    <>
      <PageHeader
        eyebrow="Džuma"
        title="Hutbe"
        description="Džuma hutbe iz naše džamije. Poslušajte ih ovdje ili ih preuzmite na telefon."
      />
      <section className="py-14">
        <div className="mx-auto max-w-3xl space-y-6 px-6">
          {LIST.map((h, i) => (
            <article key={h.id} className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-primary px-6 py-3 text-sm text-primary-foreground">
                <span className="uppercase tracking-[0.2em] text-[color:var(--gold)]">Džuma · {formatDate(h.date)}</span>
                {i === 0 && <span className="rounded-full bg-[var(--gold)] px-3 py-0.5 text-xs font-semibold text-primary">Najnovija</span>}
              </div>
              <div className="p-6">
                <h2 className="font-display text-3xl leading-tight text-primary">{h.title}</h2>
                {h.subtitle && <p className="mt-1 font-display text-xl text-foreground/75">{h.subtitle}</p>}
                <p className="mt-3 text-sm text-muted-foreground">
                  {h.imam} · {h.mosque}
                  {h.minutes ? ` · ${h.minutes} min` : ""}
                </p>
                <audio controls preload="none" className="mt-5 w-full" src={withBase(h.file)}>
                  <a href={withBase(h.file)}>Preuzmi hutbu</a>
                </audio>
                <a
                  href={withBase(h.file)}
                  download
                  className="mt-3 inline-block text-sm font-semibold text-[color:var(--wood)] underline underline-offset-4 hover:text-primary"
                >
                  Preuzmi na telefon
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
