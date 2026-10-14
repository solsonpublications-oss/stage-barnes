"use client";

import { useMemo, useState } from "react";
import {
  Film,
  Clapperboard,
  Tv,
  Drama,
  Sparkles,
  BookOpen,
  ExternalLink,
  Plus,
  Minus,
  Star,
  type LucideIcon,
} from "lucide-react";
import { projects, type Project, type ProjectFormat } from "@/lib/productions-data";

const GLYPH_ICONS: Record<Project["glyph"], LucideIcon> = {
  film: Film,
  clapper: Clapperboard,
  masks: Drama,
  tv: Tv,
  animation: Sparkles,
  book: BookOpen,
};

/**
 * Cinema status badges — translate internal status into marquee terms:
 *   Published & Adapted → NOW PLAYING (amber)
 *   Award-Winning       → AWARD WINNER (red/amber, with star)
 *   In Development      → COMING SOON (muted, with pulse)
 *   Produced            → PRODUCED (emerald)
 *   Available           → AVAILABLE (amber)
 */
const STATUS_BADGE: Record<Project["status"], { label: string; className: string; icon?: LucideIcon }> = {
  "Published & Adapted": {
    label: "Now Playing",
    className: "border-primary/60 bg-primary/20 text-primary shadow-[0_0_16px_-6px_var(--glow-gold)]",
  },
  "Award-Winning": {
    label: "Award Winner",
    className: "border-accent/60 bg-accent/15 text-accent shadow-[0_0_16px_-6px_var(--glow-rose)]",
    icon: Star,
  },
  "In Development": {
    label: "Coming Soon",
    className: "border-muted-foreground/40 bg-muted/40 text-muted-foreground animate-pulse",
  },
  Produced: {
    label: "Produced",
    className: "border-emerald-500/40 bg-emerald-500/15 text-emerald-400",
  },
  Available: {
    label: "Available",
    className: "border-primary/50 bg-primary/10 text-primary",
  },
};

type Filter = "All" | ProjectFormat;

/**
 * Dynamic filter list — only formats with at least one project are surfaced
 * (so we never show a dead "Stage Play" / "Feature Film" / "TV Series" chip).
 */
const FORMAT_FILTERS: Filter[] = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.format))),
];

/** Small horizontal row of glowing marquee bulbs (decorative). */
function MarqueeBulbs({ count = 10 }: { count?: number }) {
  return (
    <span className="marquee-bulbs" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${(i / (count - 1)) * 100}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            ["--bulb-delay" as string]: `${((i % 5) * 0.32).toFixed(2)}s`,
          }}
        />
      ))}
    </span>
  );
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const [open, setOpen] = useState(false);
  const Glyph = GLYPH_ICONS[p.glyph];
  const badge = STATUS_BADGE[p.status];
  const BadgeIcon = badge.icon;

  return (
    <article
      className="reveal group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/40 transition-all duration-500 hover-lift hover:border-primary/40 hover:glow-soft"
      data-delay={(i % 3) * 100}
    >
      {/* Cinema marquee header bar — format label as a marquee with bulbs */}
      <div className="relative flex items-center justify-between gap-2 overflow-hidden border-b border-primary/30 bg-secondary/80 px-4 py-2.5">
        <MarqueeBulbs count={10} />
        <p className="relative z-10 text-[0.6rem] font-bold uppercase tracking-[0.26em] text-primary">
          {p.format}
        </p>
        <span className="relative z-10 grid h-6 w-6 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
          <Glyph className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>

      {/* still image — framed as a film strip with perforations */}
      {p.still && (
        <div className="film-perf-top film-perf-bottom relative aspect-[16/9] w-full overflow-hidden border-b border-border/40">
          <img
            src={p.still}
            alt={`Cover art for ${p.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-7">
        {/* header row */}
        <div className="flex items-start justify-between gap-3">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary/70">
            Reel {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] ${badge.className}`}
          >
            {BadgeIcon && <BadgeIcon className="h-3 w-3 fill-current" aria-hidden />}
            {badge.label}
          </span>
        </div>

        <h3 className="mt-5 font-serif text-2xl italic text-foreground">
          {p.title}
        </h3>
        <p className="mt-1 font-serif text-sm italic text-accent">{p.tagline}</p>

        <p className="mt-4 text-sm leading-relaxed text-foreground/85">
          {p.logline}
        </p>

        {/* expandable synopsis */}
        <div className={`grid transition-all duration-500 ${open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {p.synopsis}
            </p>
            {(p.credit || p.partners) && (
              <dl className="mt-3 space-y-1 text-xs text-muted-foreground/80">
                {p.credit && (
                  <div className="flex gap-2">
                    <dt className="font-semibold uppercase tracking-wide text-primary/70">Credit</dt>
                    <dd>{p.credit}</dd>
                  </div>
                )}
                {p.partners && (
                  <div className="flex gap-2">
                    <dt className="font-semibold uppercase tracking-wide text-primary/70">With</dt>
                    <dd>{p.partners}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        </div>

        {/* footer */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/40 pt-4">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
          >
            {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {open ? "Less" : "Synopsis"}
          </button>
          {p.href ? (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-accent"
            >
              {p.award ?? "View"}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <a
              href="#inquire"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("inquire")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-accent"
            >
              Inquire
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.format === filter)),
    [filter]
  );

  return (
    <section id="works" className="relative px-5 py-24 sm:py-32">
      {/* film-strip motif above the heading */}
      <div aria-hidden className="film-strip pointer-events-none absolute inset-x-0 top-20 h-5 opacity-30" />
      <div aria-hidden className="film-strip pointer-events-none absolute inset-x-0 bottom-12 h-5 opacity-20" />

      <div className="mx-auto max-w-6xl">
        {/* heading with subtle sweeping spotlight beam */}
        <div className="relative mb-10">
          <div aria-hidden className="spotlight-beam pointer-events-none opacity-40" />
          <div className="reveal relative flex flex-col items-center gap-3 text-center">
            <p className="kicker text-primary">scripts · screen · stage</p>
            <h2
              className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] italic text-foreground"
              style={{ fontWeight: 300 }}
            >
              Works for Stage &amp; Screen
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              The scripts, treatments, and produced work of R. Ray Barnes —
              available to producers, directors, theaters, and studios. Filter by
              format, or request a script directly.
            </p>
          </div>
        </div>

        {/* filters — styled as cinema ticket stubs */}
        <div className="reveal mb-10 flex flex-wrap items-center justify-center gap-2.5">
          {FORMAT_FILTERS.map((f) => {
            const active = filter === f;
            const count = f === "All" ? projects.length : projects.filter((p) => p.format === f).length;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`group inline-flex items-center gap-2.5 rounded-md border px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_0_24px_-6px_var(--glow-gold)]"
                    : "border-border/70 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-card/80"
                }`}
              >
                {/* film-perforation accent on the left */}
                <span aria-hidden className="flex flex-col gap-[2px]">
                  <span className={`block h-[2px] w-2 rounded-sm ${active ? "bg-primary-foreground/70" : "bg-primary/50"}`} />
                  <span className={`block h-[2px] w-2 rounded-sm ${active ? "bg-primary-foreground/40" : "bg-primary/30"}`} />
                  <span className={`block h-[2px] w-2 rounded-sm ${active ? "bg-primary-foreground/70" : "bg-primary/50"}`} />
                </span>
                {f}
                <span
                  className={`ml-1 inline-grid h-5 min-w-[1.25rem] place-items-center rounded-full px-1.5 text-[0.62rem] ${
                    active ? "bg-primary-foreground/25 text-primary-foreground" : "bg-primary/15 text-primary"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No works in this format yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
