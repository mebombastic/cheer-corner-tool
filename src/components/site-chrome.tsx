import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { withBase } from "@/lib/utils";
import { InstallAppFooter } from "./install-app";
import { NotificationsButton } from "./notifications";

const NAV = [
  { to: "/", label: "Početna" },
  { to: "/about", label: "O nama" },
  { to: "/imam", label: "Imam" },
  { to: "/prayer-times", label: "Vreme namaza" },
  { to: "/qibla", label: "Kibla i tesbih" },
  { to: "/quran", label: "Kur'an i dove" },
  { to: "/calendar", label: "Kalendar" },
  { to: "/hutbe", label: "Hutbe" },
  { to: "/events", label: "Događaji" },
] as const;

function Mark({ className = "" }: { className?: string }) {
  // The mosque's ن badge, matching the favicon
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-[var(--gold)] text-primary font-arabic ${className}`}
      aria-hidden
    >
      ن
    </span>
  );
}

// The header menu, grouped into dropdowns (the flat NAV above is used by the footer)
const MENU = [
  {
    label: "Džamija",
    items: [
      { to: "/about", label: "O nama" },
      { to: "/imam", label: "Imam" },
      { to: "/events", label: "Događaji" },
    ],
  },
  {
    label: "Namaz",
    items: [
      { to: "/prayer-times", label: "Vreme namaza" },
      { to: "/qibla", label: "Kibla i tesbih" },
      { to: "/calendar", label: "Kalendar" },
    ],
  },
  {
    label: "Učenje",
    items: [
      { to: "/quran", label: "Kur'an i dove" },
      { to: "/hutbe", label: "Hutbe" },
    ],
  },
] as const;

const samePath = (a: string, b: string) => a.replace(/\/$/, "") === b.replace(/\/$/, "");

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = useLocation().pathname;
  const [open, setOpen] = useState<string | null>(null); // which desktop dropdown is open
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close everything after navigating, on Escape and on a click outside the menu
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const isActive = (to: string) => samePath(pathname, withBase(to)) || samePath(pathname, to);
  const groupActive = (g: (typeof MENU)[number]) => g.items.some((i) => isActive(i.to));

  return (
    <header className="sticky top-0 z-40 bg-primary/95 text-primary-foreground backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <Mark className="h-9 w-9 text-lg" />
          <span className="leading-tight">
            <span className="block font-display text-xl">Džamija Rečane</span>
            <span className="block text-[11px] uppercase tracking-[0.22em] text-[color:var(--gold)]">Prizren · Kosovo</span>
          </span>
        </Link>

        {/* Desktop: dropdowns */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-1 text-sm" aria-label="Glavni meni">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "bg-white/10 text-[color:var(--gold)]" }}
            inactiveProps={{ className: "text-primary-foreground/75" }}
            className="rounded-full px-4 py-2 hover:text-primary-foreground hover:bg-white/5 transition"
          >
            Početna
          </Link>
          {MENU.map((g) => {
            const isOpen = open === g.label;
            return (
              <div key={g.label} className="relative">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setOpen(isOpen ? null : g.label)}
                  className={`flex items-center gap-1 rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-primary-foreground ${
                    groupActive(g) ? "bg-white/10 text-[color:var(--gold)]" : "text-primary-foreground/75"
                  }`}
                >
                  {g.label}
                  <Chevron open={isOpen} />
                </button>
                {isOpen && (
                  <div className="absolute right-0 top-full pt-2">
                    <ul className="min-w-52 overflow-hidden rounded-2xl border border-border/60 bg-card p-1.5 text-foreground shadow-[var(--shadow-soft)]">
                      {g.items.map((i) => (
                        <li key={i.to}>
                          <Link
                            to={i.to}
                            activeProps={{ className: "bg-secondary text-primary font-semibold" }}
                            className="block rounded-xl px-4 py-2.5 hover:bg-secondary/70 transition"
                          >
                            {i.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Phone / tablet: one menu button */}
        <button
          type="button"
          onClick={() => setMobile((m) => !m)}
          aria-expanded={mobile}
          aria-controls="mobilni-meni"
          className="lg:hidden flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
            {mobile ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
          {mobile ? "Zatvori" : "Meni"}
        </button>
      </div>

      {mobile && (
        <nav id="mobilni-meni" aria-label="Glavni meni" className="lg:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 px-6 pb-28 pt-2">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-[color:var(--gold)]" }}
            className="block py-3 font-display text-2xl"
          >
            Početna
          </Link>
          {MENU.map((g) => (
            <div key={g.label} className="border-t border-white/10 py-3">
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--gold)]">{g.label}</p>
              <ul className="mt-1">
                {g.items.map((i) => (
                  <li key={i.to}>
                    <Link
                      to={i.to}
                      activeProps={{ className: "text-[color:var(--gold)] font-semibold" }}
                      inactiveProps={{ className: "text-primary-foreground/85" }}
                      className="block py-2.5 text-lg"
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}

/** The mosque's Facebook page */
export const FACEBOOK_URL = "https://www.facebook.com/share/1JRMQJDnUC/";

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3z" />
    </svg>
  );
}

/** "Follow us on Facebook" button; `tone` picks colours for dark (footer) or light backgrounds. */
export function FacebookLink({ tone = "dark", label = "Pratite nas na Facebooku" }: { tone?: "dark" | "light"; label?: string }) {
  return (
    <a
      href={FACEBOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
        tone === "dark"
          ? "border border-white/25 text-primary-foreground hover:bg-white/10"
          : "bg-primary text-primary-foreground hover:brightness-125"
      }`}
    >
      <FacebookIcon className="h-4 w-4" />
      {label}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="h-1 bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-60" aria-hidden />
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Mark className="h-10 w-10 text-xl" />
            <span className="font-display text-2xl">Džamija Rečane</span>
          </div>
          <p className="mt-5 max-w-sm text-primary-foreground/75 leading-relaxed">
            Mjesto ibadeta, učenja i zajednice. Dobro došli, posjetioci, komšije i vjernici.
          </p>
          <div className="mt-6">
            <FacebookLink />
          </div>
          <InstallAppFooter />
          <div className="mt-4">
            <NotificationsButton />
          </div>
          <p className="mt-6 font-arabic text-2xl text-[color:var(--gold)]" dir="rtl" lang="ar">
            إِنَّمَا يَعْمُرُ مَسَاجِدَ ٱللَّهِ
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.22em] text-[color:var(--gold)] mb-4">Posjetite nas</h4>
          <p className="text-primary-foreground/85 leading-relaxed">
            28, Septembar
            <br />
            Rečane, Prizren
            <br />
            Kosovo
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.22em] text-[color:var(--gold)] mb-4">Brzi linkovi</h4>
          <ul className="space-y-2 text-primary-foreground/85">
            {NAV.filter((n) => ["/prayer-times", "/hutbe", "/calendar", "/events", "/quran"].includes(n.to)).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-[color:var(--gold)] transition">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Džamija Rečane. Sva prava zadržana.
      </div>
    </footer>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 overflow-hidden opacity-[0.14]" aria-hidden>
        <div className="pattern-floor" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black/20" aria-hidden />
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24 relative">
        <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--gold)] mb-5">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.08] max-w-3xl">{title}</h1>
        {description && description.trim() && (
          <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
