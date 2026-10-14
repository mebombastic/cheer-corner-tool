import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import duskImg from "@/assets/mosque-recane-dusk.jpg";
import { canonical } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "O nama | Džamija Rečane" },
      { name: "description", content: "Naša istorija, misija i zajednica kojoj služimo u džamiji Rečane." },
      { property: "og:title", content: "O džamiji Rečane" },
      { property: "og:description", content: "Naša istorija, misija i zajednica." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical("/about") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical("/about") }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader
        eyebrow="O nama"
        title="Dobro došli na zvaničnu stranicu naše džamije"
        description={"\n"}
      />
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-14 items-start" data-reveal-stagger>
          <img src={duskImg} alt="Džamija Rečane u sumrak" width={960} height={960} loading="lazy" className="rounded-xl shadow-[var(--shadow-soft)]" />
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Naša misija je da kroz ibadet, edukaciju i društveno korisne aktivnosti jačamo vjeru, njegujemo islamske vrijednosti i gradimo snažnu i povezanu zajednicu.
            </p>
            <p className="whitespace-pre-line">
              Allahov Poslanik, Muhammed, sallallahu alejhi ve sellem, rekao je:

              „Allahu su najdraža mjesta na Zemlji džamije.“

              Ove plemenite riječi podsjećaju nas na posebnu vrijednost džamije kao mjesta u kojem se vjernici okupljaju radi ibadeta, učenja, dove i međusobnog jačanja  veza.
            </p>
            <p>
              Neka ova stranica bude prostor koji će vas približiti našoj džamiji, njenim aktivnostima i džematu, te vas podsjetiti na ljepotu okupljanja u Allahovoj kući i važnost zajedničkog činjenja dobra. Dobro nam došli.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50 border-y border-border/60">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl mb-12 text-center">Naše vrijednosti</h2>
          <div className="grid md:grid-cols-3 gap-8" data-reveal-stagger>
            {[
              { t: "Vjera", d: "Utemeljeni u Kur'anu i Sunnetu, trudimo se ibadetiti Allahu s iskrenošću." },
              { t: "Znanje", d: "Vjerujemo da je učenje doživotna obaveza i radost. Svi su dobrodošli da uče s nama." },
              { t: "Zajednica", d: "Džamija je dom. Brinemo jedni o drugima, o komšijama i o onima kojima je pomoć potrebna." },
            ].map((v) => (
              <div key={v.t} className="text-center">
                <h3 className="font-display text-2xl text-primary mb-3">{v.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            to="/imam"
            className="group flex flex-col items-start gap-5 rounded-2xl border border-border/60 bg-card p-7 transition hover:border-[var(--gold)] hover:shadow-[var(--shadow-soft)] sm:flex-row sm:items-center"
          >
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-primary font-arabic text-3xl text-[color:var(--gold)] ring-4 ring-[var(--gold)]/40" aria-hidden>
              ۞
            </span>
            <span className="flex-1">
              <span className="block text-xs uppercase tracking-[0.22em] text-[color:var(--gold)]">Naš imam</span>
              <span className="mt-1 block font-display text-3xl text-primary">Masar ef. Fejza</span>
              <span className="mt-1 block text-muted-foreground">Imam, hatib i muallim u Rečanu od 1996. godine.</span>
            </span>
            <span className="font-semibold text-[color:var(--wood)] group-hover:text-primary">Upoznajte našeg imama →</span>
          </Link>
        </div>
      </section>
    </>
  );
}
