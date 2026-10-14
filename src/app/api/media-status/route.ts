import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/**
 * Resolves which drop-in media files exist right now in /public, so the
 * client can render real photos/logos/videos only when they're actually
 * present — and show graceful fallbacks otherwise. One silent 200 call.
 *
 * Probes the canonical candidate paths for: the author logo, the Queen Pin
 * trailer, and the two award photographs (Emmy + Eclipse).
 */
const CANDIDATES = {
  logo: ["/images/barnes-logo.jpg"],
  trailer: ["/video/queen-pin-trailer.mp4"],
  awardEmmy: ["/images/awards/award-emmy.jpg", "/images/award-emmy.jpg"],
  awardEclipse: ["/images/awards/award-eclipse.jpg", "/images/award-eclipse.jpg"],
} as const;

async function resolveFirst(publicDir: string, paths: readonly string[]): Promise<string | null> {
  for (const p of paths) {
    // strip leading slash so it joins under publicDir
    const rel = p.replace(/^\//, "");
    try {
      const stat = await fs.stat(path.join(publicDir, rel));
      if (stat.isFile()) return p;
    } catch {
      // not present, try next
    }
  }
  return null;
}

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const [logo, trailer, awardEmmy, awardEclipse] = await Promise.all([
      resolveFirst(publicDir, CANDIDATES.logo),
      resolveFirst(publicDir, CANDIDATES.trailer),
      resolveFirst(publicDir, CANDIDATES.awardEmmy),
      resolveFirst(publicDir, CANDIDATES.awardEclipse),
    ]);

    return NextResponse.json({
      ok: true,
      media: { logo, trailer, awardEmmy, awardEclipse },
    });
  } catch (err) {
    console.error("[media-status] failed:", err);
    return NextResponse.json({ ok: false, media: {} }, { status: 200 });
  }
}
