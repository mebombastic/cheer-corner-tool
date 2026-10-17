import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site-chrome";
import { canonical, withBase } from "@/lib/utils";
// Questions Masar ef. Fejza answers, each with the recording of his answer.
// start/end/hutba record where each answer comes from, for editing; the page does not show them.
import pitanja from "@/data/pitanja.json";
import hutbe from "@/data/hutbe.json";

export const Route = createFileRoute("/pitanja")({
  head: () => ({
    meta: [
      { title: "Pitanja i odgovori | Džamija Rečane" },
      {
        name: "description",
        content:
          "Pitanja o vjeri i odgovori Masara ef. Fejze, imama džamije u Rečanu, uz snimak odgovora.",
      },
      { property: "og:title", content: "Pitanja i odgovori | Džamija Rečane" },
      {
        property: "og:description",
        content: "Pitanja o vjeri i odgovori Masara ef. Fejze, uz snimak odgovora.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical("/pitanja") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical("/pitanja") }],
  }),
  component: PitanjaPage,
});

type Pitanje = {
  id: string;
  hutba: string;
  question: string;
  answer: string;
  clip: string;
};

// Lowercase, without diacritics and doubled letters, so "dzenet" finds "Džennet" and "cerka" finds "kćerka"
function fold(text: string) {
  return text
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/(.)\1+/g, "$1");
}

// Newest answers first, each hutba's questions in the order he answers them
const DATE = new Map(hutbe.map((h) => [h.id, h.date]));
const LIST = [...(pitanja as Pitanje[])]
  .sort((a, b) => (DATE.get(b.hutba) ?? "").localeCompare(DATE.get(a.hutba) ?? ""))
  .map((q) => ({ ...q, search: fold(`${q.question} ${q.answer}`) }));

function PitanjaPage() {
  const [query, setQuery] = useState("");
  const words = fold(query).split(/\s+/).filter(Boolean);
  const results = LIST.filter((q) => words.every((w) => q.search.includes(w)));

  return (
    <>
      <PageHeader
        eyebrow="Masar ef. Fejza"
        title="Pitanja i odgovori"
        description="Pitanja o vjeri na koja odgovara Masar ef. Fejza, imam naše džamije. Uz svaki odgovor je i snimak."
      />
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6">
          <label htmlFor="pretraga" className="sr-only">
            Pretraži pitanja
          </label>
          <input
            id="pretraga"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pretraži pitanja, npr. namaz, dug, komšija…"
            autoComplete="off"
            className="w-full rounded-full border border-border bg-card px-6 py-4 text-lg shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/40"
          />
          <p className="mt-3 px-2 text-sm text-muted-foreground" aria-live="polite">
            {words.length === 0
              ? `${LIST.length} pitanja`
              : results.length === 0
                ? "Nema pitanja za tu pretragu."
                : `Pronađeno: ${results.length}`}
          </p>

          <div className="mt-6 space-y-4">
            {results.map((q) => (
              <article
                key={q.id}
                id={q.id}
                className="scroll-mt-32 rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
              >
                <h2 className="font-display text-2xl leading-snug text-primary">{q.question}</h2>
                <p className="mt-3 leading-relaxed text-foreground/80">{q.answer}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[color:var(--wood)]">
                  Odgovara Masar ef. Fejza
                </p>
                <audio controls preload="none" className="mt-2 w-full" src={withBase(q.clip)}>
                  <a href={withBase(q.clip)}>Poslušaj odgovor</a>
                </audio>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
