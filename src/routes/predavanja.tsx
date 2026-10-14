import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site-chrome";
import { canonical } from "@/lib/utils";

// PRIMJER (preview): lecturers and placeholder lectures to show the layout.
// Real lectures are added only after the mosque approves each one.
export const Route = createFileRoute("/predavanja")({
  head: () => ({
    meta: [
      { title: "Predavanja | Džamija Rečane" },
      { name: "description", content: "Izabrana predavanja poznatih hafiza i hodža na bosanskom jeziku." },
    ],
    links: [{ rel: "canonical", href: canonical("/predavanja") }],
  }),
  component: LecturesPage,
});

type Lecturer = { id: string; name: string };
type Lecture = { id: string; lecturer: string; title: string; topic: string; length: string; youtubeId?: string };

const LECTURERS: Lecturer[] = [
  { id: "pezic", name: "Elvedin Pezić" },
  { id: "kuduzovic", name: "Safet Kuduzović" },
  { id: "halilovic", name: "Nezim Halilović Muderris" },
  { id: "bugari", name: "Sulejman Bugari" },
];

const TOPICS = ["Namaz", "Porodica", "Ramazan", "Ahlak", "Kur'an"];

// Placeholders: titles and videos are filled in with real, approved YouTube links later
const LECTURES: Lecture[] = LECTURERS.flatMap((l, i) =>
  [0, 1].map((j) => ({
    id: `${l.id}-${j}`,
    lecturer: l.id,
    title: "Naslov predavanja (primjer)",
    topic: TOPICS[(i * 2 + j) % TOPICS.length],
    length: j ? "48 min" : "32 min",
  })),
);

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

function LecturesPage() {
  const [who, setWho] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const list = LECTURES.filter((l) => !who || l.lecturer === who);

  return (
    <>
      <PageHeader
        eyebrow="Predavanja"
        title="Slušajte i učite"
        description="Izabrana predavanja poznatih hodža i predavača na našem jeziku. Pogledajte ovdje ili sačuvajte za kasnije."
      />
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl text-primary">Predavači</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {LECTURERS.map((l) => {
              const active = who === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setWho(active ? null : l.id)}
                  aria-pressed={active}
                  className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition ${
                    active ? "border-primary bg-primary text-primary-foreground" : "border-border/60 bg-card hover:border-[var(--gold)]"
                  }`}
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-[var(--gold)] font-display text-2xl text-primary">
                    {initials(l.name)}
                  </span>
                  <span className="font-display text-xl leading-tight">{l.name}</span>
                  <span className={`text-xs ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {LECTURES.filter((x) => x.lecturer === l.id).length} predavanja
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-3xl text-primary">
              {who ? LECTURERS.find((l) => l.id === who)?.name : "Sva predavanja"}
            </h2>
            {who && (
              <button onClick={() => setWho(null)} className="text-sm text-[color:var(--wood)] underline underline-offset-4">
                Prikaži sve
              </button>
            )}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((v) => {
              const lecturer = LECTURERS.find((l) => l.id === v.lecturer)!;
              return (
                <article key={v.id} className="overflow-hidden rounded-xl border border-border/60 bg-card">
                  <button
                    onClick={() => setPlaying(playing === v.id ? null : v.id)}
                    className="group relative block aspect-video w-full bg-[linear-gradient(135deg,var(--primary),#1f3d30)]"
                    aria-label={`Pusti: ${v.title}`}
                  >
                    {playing === v.id ? (
                      <span className="absolute inset-0 grid place-items-center text-sm text-primary-foreground/80">
                        Ovdje se pušta video sa YouTubea
                      </span>
                    ) : (
                      <>
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--gold)] text-primary shadow-lg transition group-hover:scale-110">
                            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden>
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                        <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">{v.length}</span>
                        <span className="absolute left-3 top-3 rounded-full bg-white/15 px-2.5 py-0.5 text-xs text-white">{v.topic}</span>
                      </>
                    )}
                  </button>
                  <div className="p-4">
                    <p className="font-display text-xl leading-snug text-primary">{v.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{lecturer.name}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
