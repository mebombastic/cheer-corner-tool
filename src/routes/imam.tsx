import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import interiorImg from "@/assets/mosque-recane-interior.jpg";
import exteriorImg from "@/assets/mosque-recane-exterior.jpg";
import imamImg from "@/assets/imam-masar-fejza.jpg";
import { canonical } from "@/lib/utils";

export const Route = createFileRoute("/imam")({
  head: () => ({
    meta: [
      { title: "Naš imam | Džamija Rečane" },
      {
        name: "description",
        content: "Masar ef. Fejza, prof., imam, hatib i muallim džamije u Rečanu od 1996. godine.",
      },
      { property: "og:title", content: "Naš imam, Masar ef. Fejza | Džamija Rečane" },
      { property: "og:description", content: "Imam, hatib i muallim u Rečanu od 1996. godine." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: canonical("/imam") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical("/imam") }],
  }),
  component: ImamPage,
});

const SINCE = 1996;

function ImamPage() {
  const years = new Date().getFullYear() - SINCE;

  return (
    <>
      {/* Hero: the prayer hall, where the imam serves */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img src={interiorImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
          <img
            src={imamImg}
            alt="Masar ef. Fejza na kursiji u džamiji"
            width={800}
            height={796}
            className="mx-auto mb-10 w-64 rounded-3xl object-cover shadow-[var(--shadow-glow)] ring-4 ring-[var(--gold)]/60 md:w-80"
          />
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">Naš imam</p>
          <h1 className="mt-5 font-display text-5xl leading-tight md:text-7xl">Masar ef. Fejza</h1>
          <p className="mt-3 font-display text-xl italic text-primary-foreground/80 md:text-2xl">profesor islamskih studija</p>
          <div className="mx-auto mt-8 flex max-w-md items-center gap-4 text-[color:var(--gold)]" aria-hidden>
            <span className="h-px flex-1 bg-[var(--gold)]/40" />
            <span className="font-arabic text-2xl">۞</span>
            <span className="h-px flex-1 bg-[var(--gold)]/40" />
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
            Već {years} godina imam, hatib i muallim naše džamije.
          </p>
        </div>
      </section>

      {/* Opening words */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-2xl leading-relaxed text-primary md:text-3xl">
            Od 3. marta 1996. godine Masar ef. Fejza predvodi namaze, drži hutbe i uči djecu u džamiji u Rečanu. Kroz
            njegov mekteb do danas je prošlo dvanaest generacija.
          </p>
        </div>
      </section>

      {/* Ayah on the rank of knowledge */}
      <section className="border-y border-border/60 bg-secondary/50 py-14">
        <figure className="mx-auto max-w-3xl px-6 text-center">
          <p dir="rtl" lang="ar" className="font-arabic text-3xl leading-[2] text-primary md:text-4xl">
            يَرۡفَعِ ٱللَّهُ ٱلَّذِينَ ءَامَنُواْ مِنكُمۡ وَٱلَّذِينَ أُوتُواْ ٱلۡعِلۡمَ دَرَجَٰتࣲ
          </p>
          <blockquote className="mt-4 font-display text-xl text-foreground/80 md:text-2xl">
            „Allah će na visoke stepene uzdignuti one među vama koji vjeruju i kojima je dato znanje.“
          </blockquote>
          <figcaption className="mt-3 text-xs uppercase tracking-widest text-[color:var(--wood)]">El-Mudžadele, 11</figcaption>
        </figure>
      </section>

      {/* His story */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Chapter title="Prvi koraci">
            <p>
              Rođen je 15. augusta 1975. godine u Novom Selu, od oca Asana i majke Firdeske. Osnovnu školu završio je u
              rodnom kraju, a 1991. godine upisao Medresu „Gazi Isa-beg“ u Skoplju, koju je uspješno završio 1995.
              godine.
            </p>
            <p>
              Još kao učenik, 1992. godine, obavljao je dužnost imama, hatiba i muallima u selu Grnčare. Potom je u
              Prizrenu bio na praksi u Staroj džamiji i Iskender džamiji u Krilu, a bio je imam i u Emin-pašinoj
              džamiji.
            </p>
          </Chapter>

          <Chapter title="Imam Rečana">
            <p>
              Nakon medrese otišao je u Tursku na studije, ali se zbog nemogućnosti vratio kući. Dana 3. marta 1996.
              godine preuzeo je dužnost imama, hatiba i muallima u Rečanu, gdje službuje i danas.
            </p>
            <p>
              Kod njega je mektebsku nastavu uspješno završilo dvanaest generacija, a rado je viđen predavač i u mnogim
              drugim našim džamijama.
            </p>
          </Chapter>
        </div>

        <figure className="mx-auto my-14 max-w-5xl px-6">
          <img
            src={exteriorImg}
            alt="Džamija u Rečanu"
            loading="lazy"
            className="aspect-[16/7] w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
          />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">Džamija u Rečanu, njegova džamija od 1996. godine.</figcaption>
        </figure>

        <div className="mx-auto max-w-3xl px-6">
          <Chapter title="Znanje">
            <p>
              Uz službu u džamiji, krajem 2008. godine upisao je Fakultet islamskih studija u Prištini i završio ga
              2011. godine. Diplomski rad na temu „Umjerenost u hadisima Allahovog Poslanika a.s.“ odbranio je ocjenom
              9 i stekao zvanje profesora islamskih studija.
            </p>
            <p>
              Autor je nekoliko tema za ediciju <em>Takvim</em>, a pisao je i tekstove iz oblasti islama za list{" "}
              <em>Ikr'e</em>, koji se štampao pod pokroviteljstvom medrese u Skoplju.
            </p>
          </Chapter>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-2xl text-primary">Dobro došli na zajednički namaz u našu džamiju.</p>
          <Link
            to="/prayer-times"
            className="mt-6 inline-flex rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:brightness-125"
          >
            Vreme namaza
          </Link>
        </div>
      </section>
    </>
  );
}

function Chapter({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-12 first:mt-0">
      <h2 className="flex items-center gap-3 font-display text-3xl text-primary md:text-4xl">
        <span className="font-arabic text-xl text-[color:var(--gold)]" aria-hidden>
          ۞
        </span>
        {title}
      </h2>
      <div className="mt-5 space-y-5 text-lg leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
