/**
 * MarqueeBand — a decorative full-width scrolling film-strip marquee band
 * for the R. Ray Barnes Productions site.
 *
 * Renders a horizontal "now showing" marquee of cinema-style amber caps
 * separated by red star bullets, sliding forever on the `.animate-marquee`
 * keyframe defined in globals.css. Pure decoration — pointer-events none,
 * aria-hidden, and the duplicated content track guarantees a seamless loop
 * (the animation translates 0 → -50% which lands exactly on the second copy).
 *
 * Drop it between any two sections for a cinematic "marquee band" transition.
 */
import { Star } from "lucide-react";

const DEFAULT_ITEMS: string[] = [
  "R. RAY BARNES PRODUCTIONS",
  "STAGE & SCREEN",
  "EMMY AWARD WINNER",
  "QUEEN PIN",
  "LEFT BEHIND IN VIETNAM",
  "THE ADVENTURES OF RAPMAN & HOMEBOY",
  "RESURRECTION: THE LIFE OF CHRIST",
];

export function MarqueeBand({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  // Duplicate once so the marquee animation (-50%) loops seamlessly.
  const track = [...items, ...items];

  return (
    <div
      aria-hidden
      className="relative w-full select-none overflow-hidden border-y border-primary/25 bg-card/50 py-3 backdrop-blur"
    >
      {/* film perforation top + bottom strips */}
      <div className="film-strip pointer-events-none absolute inset-x-0 top-0 h-3 opacity-40" />
      <div className="film-strip pointer-events-none absolute inset-x-0 bottom-0 h-3 opacity-40" />

      {/* sweeping amber glow trail */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/15 to-transparent blur-xl" />

      <ul className="flex w-max animate-marquee items-center gap-7 whitespace-nowrap">
        {track.map((label, i) => (
          <li
            key={`${label}-${i}`}
            className="flex items-center gap-7 text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-primary sm:text-sm"
          >
            <span className="drop-shadow-[0_0_8px_var(--glow-gold)]">{label}</span>
            <Star
              className="h-3 w-3 shrink-0 fill-accent text-accent"
              aria-hidden
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
