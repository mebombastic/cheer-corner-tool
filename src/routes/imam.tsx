import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { canonical } from "@/lib/utils";

export const Route = createFileRoute("/imam")({
  head: () => ({
    meta: [
      { title: "Imam džamije | Džamija Rečane" },
      {
        name: "description",
        content: "Masar ef. Fejza, prof., imam, hatib i muallim džamije u Rečanu od 1996. godine. Biografija.",
      },
      { property: "og:title", content: "Masar ef. Fejza, prof. | Imam džamije Rečane" },
      { property: "og:description", content: "Imam, hatib i muallim u Rečanu od 1996. godine." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: canonical("/imam") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical("/imam") }],
  }),
  component: ImamPage,
});

const FACTS = [
  { value: "1996.", label: "imam u Rečanu" },
  { value: "12", label: "generacija mektebske nastave" },
  { value: "prof.", label: "islamskih studija" },
];

const TIMELINE: { year: string; text: string }[] = [
  { year: "1975.", text: "Rođen 15. augusta u Novom Selu, od oca Asana i majke Firdeske. Osnovnu školu završio u rodnom mjestu." },
  { year: "1991.", text: "Upisuje Medresu „Gazi Isa-beg“ u Skoplju." },
  { year: "1992.", text: "Dužnost imama, hatiba i muallima u selu Grnčare." },
  {
    year: "do 1995.",
    text: "U Prizrenu, kao učenik, na praksi u nekoliko džamija: Stara džamija u Krilu, Iskender džamija u Krilu, a bio je i imam u Emin-pašinoj džamiji.",
  },
  { year: "1995.", text: "Uspješno završava medresu. Odlazi u Tursku radi studija, ali se zbog nemogućnosti vraća kući." },
  { year: "1996.", text: "Od 3. marta preuzima dužnost imama, hatiba i muallima u Rečanu, gdje je i danas." },
  { year: "2008.", text: "Upisuje Fakultet islamskih studija u Prištini." },
  {
    year: "2011.",
    text: "Završava fakultet diplomskim radom „Umjerenost u hadisima Allahovog Poslanika a.s.“, odbranjenim ocjenom 9, i stiče zvanje profesora islamskih studija.",
  },
];

function ImamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Imam džamije"
        title="Masar ef. Fejza, prof."
        description="Imam, hatib i muallim džamije u Rečanu od 1996. godine."
      />

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[20rem_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/60 bg-card p-7 text-center shadow-[var(--shadow-soft)]">
              <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-primary font-display text-4xl text-[color:var(--gold)] ring-4 ring-[var(--gold)]/40">
                MF
              </div>
              <p className="mt-5 font-display text-2xl text-primary">Masar ef. Fejza</p>
              <p className="mt-1 text-sm uppercase tracking-widest text-[color:var(--wood)]">Imam · Rečane</p>
              <dl className="mt-6 grid gap-3 border-t border-border/60 pt-6">
                {FACTS.map((f) => (
                  <div key={f.label} className="rounded-xl bg-secondary/50 px-4 py-3">
                    <dt className="font-display text-3xl text-primary">{f.value}</dt>
                    <dd className="text-sm text-muted-foreground">{f.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          <div>
            <h2 className="font-display text-3xl text-primary md:text-4xl">Biografija</h2>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Masar ef. Fejza rođen je 15. augusta 1975. godine u Novom Selu, od oca Asana i majke Firdeske. Nakon
                osnovne škole u rodnom kraju, 1991. godine upisuje Medresu „Gazi Isa-beg“ u Skoplju, koju uspješno
                završava 1995. godine.
              </p>
              <p>
                Od 3. marta 1996. godine obavlja dužnost imama, hatiba i muallima u Rečanu. Uz službu je 2011. godine
                završio Fakultet islamskih studija u Prištini i stekao zvanje profesora islamskih studija.
              </p>
              <p>
                Autor je nekoliko tema za ediciju <em>Takvim</em>, a pisao je i tekstove iz oblasti islama za list{" "}
                <em>Ikr'e</em>, koji se štampao pod pokroviteljstvom medrese u Skoplju. Do sada je mektebsku nastavu
                kod njega uspješno završilo 12 generacija, a angažovan je i kao predavač u mnogim našim džamijama.
              </p>
            </div>

            <h2 className="mt-14 font-display text-3xl text-primary md:text-4xl">Životni put</h2>
            <ol className="relative mt-8 space-y-7 border-l-2 border-[var(--gold)]/50 pl-7">
              {TIMELINE.map((t) => (
                <li key={t.year + t.text.slice(0, 12)} className="relative">
                  <span className="absolute -left-[2.15rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--gold)] bg-background" aria-hidden />
                  <p className="font-display text-xl text-[color:var(--wood)]">{t.year}</p>
                  <p className="mt-1 leading-relaxed">{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
