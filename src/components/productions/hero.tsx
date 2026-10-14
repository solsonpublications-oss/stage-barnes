"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Clapperboard, FileText } from "lucide-react";

const rotatingSubtitles = [
  "Emmy-winning writer & producer — scripts, screenplays, and stage plays.",
  "From the studio with Stevie Wonder to the set of Queen Pin.",
  "Forty-five years of American stories, told for stage and screen.",
  "Screenplays, stage plays, and the next chapter — available to partners now.",
];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = rotatingSubtitles[idx];
    let delay = deleting ? 24 : 48;
    if (!deleting && text === full) {
      delay = 2600;
    } else if (deleting && text === "") {
      delay = 350;
    }
    const t = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIdx((i) => (i + 1) % rotatingSubtitles.length);
      } else if (deleting) {
        setText(full.substring(0, text.length - 1));
      } else {
        setText(full.substring(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <p
      className="max-w-xl text-base italic md:text-lg"
      style={{
        fontFamily: "var(--font-literata), serif",
        color: "var(--mist)",
        lineHeight: 1.6,
        minHeight: "3.2em",
      }}
    >
      <span aria-live="polite" aria-label={rotatingSubtitles[idx]}>
        {text}
        <span className="typing-cursor" aria-hidden="true">
          &nbsp;|
        </span>
      </span>
    </p>
  );
}

/** A small film-reel motif spinning slowly behind the hero title. */
function ReelMark() {
  return (
    <svg
      width="92"
      height="92"
      viewBox="0 0 92 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      className="mt-1 opacity-80"
    >
      <g className="animate-reel" style={{ transformOrigin: "46px 46px" }}>
        <circle cx="46" cy="46" r="40" stroke="var(--ember-soft)" strokeWidth="1.2" fill="none" />
        <circle cx="46" cy="46" r="6" fill="var(--ember)" />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = Number((46 + 26 * Math.cos(rad)).toFixed(2));
          const y = Number((46 + 26 * Math.sin(rad)).toFixed(2));
          return <circle key={deg} cx={x} cy={y} r="5.5" fill="none" stroke="var(--ember-soft)" strokeWidth="1" />;
        })}
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-24 text-center"
    >
      {/* sweeping cinema spotlight beam */}
      <div aria-hidden className="spotlight-beam" />
      {/* film-strip motif across the very top */}
      <div aria-hidden className="film-strip pointer-events-none absolute inset-x-0 top-0 h-5 opacity-40" />
      <div aria-hidden className="film-strip pointer-events-none absolute inset-x-0 bottom-0 h-5 opacity-40" />

      <div className="reveal relative z-10 flex max-w-2xl flex-col items-center gap-5 text-center" data-delay="0">
        {/* NOW SHOWING marquee badge */}
        <div className="relative flex items-center gap-2 rounded-full border border-primary/50 bg-card/60 px-5 py-1.5 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary">
            Now Showing
          </span>
        </div>

        <p className="font-serif text-lg italic text-muted-foreground md:text-xl">
          a life, written for performance
        </p>

        <h1
          className="hero-title w-full font-serif text-[clamp(3rem,11vw,5.6rem)] italic leading-[1.08] tracking-tight"
          style={{ fontWeight: 500 }}
        >
          Stage &amp; Screen
        </h1>

        <Typewriter />

        {/* thin divider line */}
        <span
          aria-hidden="true"
          className="block h-px w-10 bg-primary/60"
        />
        <p className="text-xs uppercase tracking-[0.2em] text-primary md:text-sm">
          By R. Ray Barnes · Emmy-winning writer &amp; producer
        </p>

        {/* CTAs */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#inquire"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("inquire")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_36px_-6px_var(--glow-gold)] hover:brightness-110"
          >
            <FileText className="h-4 w-4" />
            Request a Script
          </a>
          <a
            href="#works"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/10"
          >
            <Clapperboard className="h-4 w-4" />
            View the Works
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <ReelMark />
      </div>

      {/* scroll cue */}
      <div className="reveal absolute bottom-10 left-1/2 -translate-x-1/2" data-delay="500">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border/70 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        {/* portrait */}
        <div className="reveal relative mx-auto w-full max-w-sm" data-delay="0">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/30 shadow-xl">
            <Image
              src="/images/author-portrait.webp"
              alt="R. Ray Barnes — writer, producer, music producer, songwriter"
              width={640}
              height={800}
              className="aspect-[4/5] w-full object-cover object-top"
              priority
            />
          </div>
          <p className="kicker mt-4 text-center text-primary leading-snug">
            writer · producer,
            <br />
            music producer · songwriter
          </p>
        </div>

        {/* copy — rewritten to lead with stage & screen */}
        <div className="flex flex-col items-start gap-6">
          <p className="reveal kicker text-primary" data-delay="80">
            about the writer
          </p>
          <h2
            className="reveal max-w-xl font-serif text-[clamp(1.9rem,4vw,3rem)] italic leading-tight text-balance text-foreground"
            data-delay="140"
            style={{ fontWeight: 300 }}
          >
            A life on the page, the stage, and the screen.
          </h2>
          <div className="reveal flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground" data-delay="220">
            <p>
              R. Ray Barnes is an Emmy-winning writer and producer whose work
              moves between the screenplay, the stage play, and the screen —
              a storyteller shaped by forty-five years in the recording studio
              and a lifetime of American stories behind him.
            </p>
            <p>
              A 2019 Michigan Regional Emmy winner for{" "}
              <em>Left Behind in Vietnam</em>, R. Ray Barnes has spent over
              forty-five years as a music producer and songwriter ⎯ collaborating
              with his 3-time Grammy Award winning partner, Tony Coleman, they have
              worked with major recording artists the likes of Stevie Wonder,
              Quincy Jones, James Ingram, Aretha Franklin, The Pointer Sisters,
              Lee Greenwood, Rita Coolidge and many others. He is the author of{" "}
              <em>Queen Pin: The Story of Yvonne Barnes and the Motown Records Bowlerettes</em>,
              a tribute to his mother who was known as &ldquo;the Rosa Parks of
              bowling,&rdquo; and to the other extraordinary women who comprised
              their championship team — and the producer of its screen adaptation.
              Beyond writing and music, he created the biblical board game{" "}
              <em>Resurrection: The Life Of Christ</em>, and authored screenplays,
              stage plays and the animated proposed feature,{" "}
              <em>The Adventures of Rapman &amp; Homeboy and the Hip-Hop Posse</em>.
            </p>
            <p>
              This is the home of his work for stage and screen — the scripts,
              the treatments, and the projects in development, available to
              producers, directors, theaters, and studios who want to bring the
              next one to life.
            </p>
            <p className="kicker text-xl text-accent">— on to the next story</p>
          </div>
        </div>
      </div>
    </section>
  );
}
