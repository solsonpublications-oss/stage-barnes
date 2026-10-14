"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, Film, Play, Clapperboard } from "lucide-react";
import { QUEEN_PIN_TRAILER_SRC, SITE } from "@/lib/productions-data";
import { useMediaStatus } from "@/hooks/use-media-status";

/**
 * Cinematic spotlight for the author's own Queen Pin video trailer.
 * The mp4 is served from /public/video/queen-pin-trailer.mp4 — when the file
 * is not yet present the section still renders beautifully around the poster
 * and self-heals the moment the file lands. The video element only receives
 * its src once the file is confirmed (via the silent media-status API), so a
 * missing file never triggers a 404 or a dead player.
 */
export function QueenPinTrailer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const status = useMediaStatus();
  const [probedReady, setProbedReady] = useState(false);
  const [fallbackMissing, setFallbackMissing] = useState(false);
  const [errorMissing, setErrorMissing] = useState(false);
  const [started, setStarted] = useState(false);

  // Fallback probe for environments where the status API can't see public/.
  useEffect(() => {
    if (!status.ready || status.api) return;
    let cancelled = false;
    fetch(QUEEN_PIN_TRAILER_SRC, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        setProbedReady(res.ok);
        if (!res.ok) setFallbackMissing(true);
      })
      .catch(() => {
        if (!cancelled) setFallbackMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [status.ready, status.api]);

  const ready = status.api ? Boolean(status.trailer) : probedReady;
  const missing =
    errorMissing ||
    (status.api ? status.ready && !status.trailer : status.ready && fallbackMissing);
  const src = status.api ? status.trailer : QUEEN_PIN_TRAILER_SRC;

  const play = () => {
    const v = videoRef.current;
    if (!v || !ready || !src) return;
    if (v.ended || (v.duration && v.currentTime >= v.duration)) {
      v.currentTime = 0;
    }
    setStarted(true);
    v.play().catch(() => setErrorMissing(true));
  };

  return (
    <section id="trailer" className="relative overflow-hidden px-5 py-24 sm:py-32">
      {/* cinematic backdrop glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_70%_30%,rgba(217,164,77,0.10),transparent_70%)]"
      />
      {/* sweeping cinema spotlight beam (subtle) */}
      <div aria-hidden className="spotlight-beam pointer-events-none opacity-30" />
      {/* film-strip top + bottom accents */}
      <div aria-hidden className="film-strip pointer-events-none absolute inset-x-0 top-0 h-4 opacity-25" />
      <div aria-hidden className="film-strip pointer-events-none absolute inset-x-0 bottom-0 h-4 opacity-25" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        {/* copy */}
        <div className="flex flex-col items-start gap-5">
          <p className="reveal kicker inline-flex items-center gap-2 text-primary" data-delay="0">
            <Clapperboard className="h-4 w-4" aria-hidden />
            official trailer
          </p>
          <h2
            className="reveal max-w-xl font-serif text-[clamp(1.9rem,4vw,3rem)] italic leading-tight text-balance text-foreground"
            data-delay="80"
            style={{ fontWeight: 300 }}
          >
            Queen Pin — the story, brought to the screen.
          </h2>
          <div className="reveal flex flex-col gap-4 text-base leading-relaxed text-muted-foreground" data-delay="160">
            <p>
              Produced by R. Ray Barnes himself, this short film opens the door
              to <em className="text-foreground/90">Queen Pin: The Story of
              Yvonne Barnes &amp; The Motown Records Bowlerettes</em> — the true
              story of his mother, the woman called the &ldquo;Rosa Parks of
              bowling,&rdquo; and the all-Black female team that triumphed inside
              a divided America.
            </p>
            <p>
              The book became the screen adaptation. Watch the trailer here,
              then inquire about the next project in development.
            </p>
          </div>
          <div className="reveal flex flex-wrap items-center gap-4" data-delay="240">
            <a
              href={SITE.queenPinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_36px_-6px_var(--glow-gold)] hover:brightness-110"
            >
              Read Queen Pin on Amazon
              <ExternalLink className="h-4 w-4" />
            </a>
            <span className="text-xs tracking-wide text-muted-foreground">
              Kindle · Audiobook · Paperback
            </span>
          </div>
        </div>

        {/* player */}
        <div className="reveal relative" data-delay="120">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" aria-hidden />

          {/* "NOW PLAYING" cinema marquee header bar above the video frame */}
          <div className="relative mb-2 flex items-center justify-between gap-3 overflow-hidden rounded-lg border border-primary/40 bg-secondary/80 px-4 py-2 backdrop-blur">
            <span className="marquee-bulbs" aria-hidden>
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    left: `${(i / 13) * 100}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    ["--bulb-delay" as string]: `${((i % 5) * 0.4).toFixed(2)}s`,
                  }}
                />
              ))}
            </span>
            <p className="relative z-10 flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.32em] text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Now Playing
            </p>
            <p className="relative z-10 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Queen Pin · Official Trailer
            </p>
          </div>

          <div className="film-perf-top relative overflow-hidden rounded-[1.5rem] border border-primary/25 bg-black glow-soft">
            <div className="relative aspect-video w-full">
              <Image
                src="/images/amazon/queen-pin.jpg"
                alt="Queen Pin — official trailer poster"
                fill
                sizes="(max-width: 1024px) 92vw, 560px"
                className={`object-cover transition-opacity duration-500 ${started ? "opacity-0" : "opacity-100"}`}
              />

              {/* custom play button before start (only once the file is confirmed) */}
              {!started && !missing && ready && (
                <button
                  onClick={play}
                  aria-label="Play the Queen Pin trailer"
                  className="group absolute inset-0 grid place-items-center bg-black/35 transition-colors duration-300 hover:bg-black/45"
                >
                  <span className="grid h-20 w-20 place-items-center rounded-full border border-primary/60 bg-background/70 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_-6px_var(--glow-gold)]">
                    <Play className="h-8 w-8 translate-x-0.5 fill-primary text-primary" />
                  </span>
                </button>
              )}

              <video
                ref={videoRef}
                className={`h-full w-full ${started ? "" : "hidden"}`}
                controls
                preload="metadata"
                playsInline
                poster="/images/amazon/queen-pin.jpg"
                src={ready && src ? src : undefined}
                onPlaying={() => setStarted(true)}
                onEnded={() => {
                  setStarted(false);
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                  }
                }}
                onError={() => setErrorMissing(true)}
              />

              {/* graceful state while the trailer file has not been placed yet */}
              {missing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 px-6 text-center backdrop-blur-[3px]">
                  <Film className="h-9 w-9 text-[#e9c87c]" aria-hidden />
                  <p className="max-w-xs font-serif text-xl italic leading-snug text-[#f7edd6]">
                    The official trailer premieres right here.
                  </p>
                  <p className="text-xs tracking-wide text-white/70">
                    Check back shortly — the premiere is being prepared.
                  </p>
                </div>
              )}
            </div>
          </div>
          <p className="mt-4 text-center text-xs tracking-wide text-primary">
            A Queen Pin video promotion by R. Ray Barnes Productions.
          </p>
        </div>
      </div>
    </section>
  );
}
