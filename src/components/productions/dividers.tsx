"use client";

import { ButterflyMark } from "./particles";

/**
 * Decorative section divider with an ornamental flourish.
 * Variants: "butterfly", "line", "diamond", "film".
 */
export function SectionDivider({
  variant = "butterfly",
  className = "",
}: {
  variant?: "butterfly" | "line" | "diamond" | "film";
  className?: string;
}) {
  if (variant === "line") {
    return (
      <div
        aria-hidden
        className={`relative flex items-center justify-center gap-4 py-8 ${className}`}
      >
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
        <span className="h-2 w-2 rotate-45 bg-primary/60" />
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
      </div>
    );
  }

  if (variant === "diamond") {
    return (
      <div
        aria-hidden
        className={`relative flex items-center justify-center gap-3 py-6 ${className}`}
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
        <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
        <span className="h-2.5 w-2.5 rotate-45 border border-primary/40" />
        <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
      </div>
    );
  }

  if (variant === "film") {
    return (
      <div
        aria-hidden
        className={`relative flex items-center justify-center gap-4 py-10 ${className}`}
      >
        <span className="h-px w-20 bg-gradient-to-r from-transparent via-primary/30 to-primary/50" />
        <FilmFrame className="h-6 w-8 text-primary/50" />
        <span className="h-px w-20 bg-gradient-to-l from-transparent via-primary/30 to-primary/50" />
      </div>
    );
  }

  // butterfly variant (default)
  return (
    <div
      aria-hidden
      className={`relative flex items-center justify-center gap-4 py-10 ${className}`}
    >
      <span className="h-px w-20 bg-gradient-to-r from-transparent via-primary/30 to-primary/50" />
      <span className="relative text-primary/40 transition-transform duration-700 hover:rotate-6 hover:text-primary/70">
        <ButterflyMark className="h-6 w-8" />
      </span>
      <span className="h-px w-20 bg-gradient-to-l from-transparent via-primary/30 to-primary/50" />
    </div>
  );
}

/** Small film-frame glyph used by the "film" divider variant. */
function FilmFrame({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden
    >
      <rect x="2" y="2" width="28" height="20" rx="2" />
      <rect x="5" y="5" width="22" height="14" rx="1" />
      <circle cx="8.5" cy="3.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="3.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="23.5" cy="3.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="20.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="20.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="23.5" cy="20.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
