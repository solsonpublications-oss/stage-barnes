"use client";

import { Newspaper, Quote, ArrowRight } from "lucide-react";
import { pressFeature } from "@/lib/productions-data";

/**
 * "Spotlight on Ray" press feature block. The author's own press profile
 * is mentioned on the live site; the actual link/file is being supplied by
 * the author by email. Until then this block presents the feature as a
 * press pull-quote with an invitation to request the full feature —
 * consistent with how the rest of the in-development content is handled.
 */
export function Spotlight() {
  return (
    <section id="spotlight" className="relative overflow-hidden px-5 py-24 sm:py-32">
      {/* spotlight cone backdrop */}
      <div
        aria-hidden
        className="spotlight-cone pointer-events-none absolute inset-x-0 -top-10 h-[420px] opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_20%,rgba(217,164,77,0.10),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="reveal mb-10 flex flex-col items-center gap-3 text-center">
          <p className="kicker inline-flex items-center gap-2 text-primary">
            <Newspaper className="h-4 w-4" aria-hidden />
            {pressFeature.kicker}
          </p>
          <h2
            className="font-serif text-[clamp(2rem,5vw,3.25rem)] italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            {pressFeature.title}
          </h2>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {pressFeature.outlet}
          </p>
        </div>

        <figure className="reveal relative mx-auto max-w-3xl rounded-[1.75rem] border border-primary/25 bg-card/40 p-8 backdrop-blur sm:p-12">
          <Quote
            className="absolute -top-5 left-8 h-10 w-10 rotate-180 text-primary/40"
            aria-hidden
          />
          <blockquote className="font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] italic leading-relaxed text-foreground/90 text-balance">
            {pressFeature.quote}
          </blockquote>
          <figcaption className="mt-6 flex flex-col items-start gap-3 border-t border-border/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pressFeature.detail}
            </p>
            <a
              href="#inquire"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("inquire")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_24px_-8px_var(--glow-gold)]"
            >
              Request the full feature
              <ArrowRight className="h-4 w-4" />
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
