"use client";

import { useEffect, useState } from "react";
import { Film } from "lucide-react";
import { journey, processSteps, stats } from "@/lib/productions-data";

/**
 * Animated stat counters — count up when scrolled into view.
 */
export function Stats() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-counter]")
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = Number(el.dataset.counter);
          const suffix = el.dataset.suffix ?? "";
          if (!isFinite(target)) {
            el.textContent = "∞";
            io.unobserve(el);
            return;
          }
          const dur = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = `${Math.round(target * eased)}${suffix}`;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative px-5 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="reveal relative flex flex-col items-center gap-1 overflow-hidden rounded-2xl border border-border/50 bg-card/30 px-4 py-6 text-center hover-lift hover:border-primary/40"
          >
            {/* film-perforation accent along the top edge */}
            <span aria-hidden className="film-strip pointer-events-none absolute inset-x-0 top-0 h-2 opacity-40" />
            {/* small film-reel/star accent above the number */}
            <span aria-hidden className="mb-1 flex items-center gap-1 text-primary/70">
              <Film className="h-3 w-3" aria-hidden />
              <span className="block h-1 w-1 rounded-full bg-accent" />
            </span>
            <span
              data-counter={isFinite(s.value) ? s.value : "Infinity"}
              data-suffix={s.suffix}
              className="font-serif text-4xl italic text-primary sm:text-5xl"
            >
              {isFinite(s.value) ? "0" : "∞"}
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Journey() {
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("#career ol > li")
    );
    if (cards.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = cards.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="career" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-16 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-primary">the career</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            A Life on Stage &amp; Screen
          </h2>
          <p className="max-w-xl text-center text-base leading-relaxed text-muted-foreground">
            From the first studio sessions to the Emmy and beyond — every
            chapter of
            <br />
            <span>R. Ray Barnes&apos;s career as a writer and producer.</span>
          </p>
        </div>

        <div className="relative">
          {/* spine */}
          <div
            aria-hidden
            className="timeline-spine absolute left-4 top-0 h-full w-[2px] md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-10 md:space-y-12">
            {journey.map((m, i) => {
              const left = i % 2 === 0;
              const isActive = i === activeIdx;
              return (
                <li
                  key={m.year + m.title}
                  className="reveal relative pl-12 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
                  data-delay={(i % 4) * 80}
                >
                  {/* glowing marquee-bulb dot — active bulb flickers + glows */}
                  <span
                    className={`absolute left-4 top-2 z-10 grid -translate-x-1/2 place-items-center rounded-full transition-all duration-500 md:left-1/2 ${
                      isActive
                        ? "h-4 w-4 animate-bulb scale-125 bg-primary"
                        : "h-2.5 w-2.5 border border-primary/50 bg-primary/40"
                    }`}
                    aria-hidden
                  >
                    {!isActive && (
                      <span
                        className="absolute h-full w-full animate-ping rounded-full bg-primary/15"
                        style={{ animationDuration: "2.5s" }}
                      />
                    )}
                  </span>

                  {/* card */}
                  <div
                    className={`film-perf-top film-perf-bottom group relative overflow-hidden rounded-2xl border bg-card/40 p-6 backdrop-blur transition-all duration-500 hover:border-primary/40 hover:bg-card/60 hover:shadow-[0_0_40px_-12px_var(--glow-gold)] ${
                      isActive
                        ? "border-primary/50 shadow-[0_0_30px_-10px_var(--glow-gold)]"
                        : "border-border/50"
                    } ${left ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}
                  >
                    <span className="font-serif text-3xl italic text-primary">
                      {m.year}
                    </span>
                    <h3 className="mt-1 font-serif text-xl text-foreground">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {m.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="relative px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-14 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-primary">the process</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            From Story to Screen
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((s, i) => (
            <div
              key={s.title}
              className="reveal film-perf-top group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-8 text-center hover-lift hover:border-primary/40"
              data-delay={i * 100}
            >
              {/* film-strip accent along the top edge */}
              <span aria-hidden className="film-strip pointer-events-none absolute inset-x-0 top-0 h-2 opacity-40" />
              <span className="absolute -right-6 -top-6 font-serif text-[6rem] italic leading-none text-primary/10 transition-all duration-500 group-hover:text-primary/20">
                {i + 1}
              </span>
              <h3 className="relative mb-3 font-serif text-2xl italic text-primary">
                {s.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
