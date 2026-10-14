# R. Ray Barnes Productions — Stage & Screen

The scripts, screenplays, stage plays, and screen work of Emmy-winning
writer & producer R. Ray Barnes. A sibling site to *The Art of Poetry*
(rraybarnes.space-z.ai), reusing the same design system and swapping in
stage/screen content.

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York)
- **Database**: Prisma ORM (SQLite)
- **Fonts**: Fraunces (serif), Literata (body), Caveat (script), Geist Mono

## Setup

```bash
bun install          # install dependencies
bun run db:push      # create the SQLite schema
bun run dev          # start on http://localhost:3000
bun run lint         # check code quality
```

## Project structure

```
src/
  app/
    api/
      subscribe/       # POST  newsletter signup → Subscriber
      inquiry/         # POST  request-a-script → Inquiry
      media-status/    # GET   self-healing media resolution
    layout.tsx         # fonts + stage/screen metadata
    page.tsx           # assembles all sections
    globals.css        # warm dark/light theme, grain, ambient glows
    robots.ts          # dynamic robots.txt
    sitemap.ts         # dynamic sitemap.xml
  components/productions/
    nav.tsx            # sticky nav + theme toggle + mobile menu
    hero.tsx           # Stage & Screen hero + rewritten About bio
    awards.tsx         # Emmy + Eclipse cards + Tony Coleman block
    spotlight.tsx      # "Spotlight on Ray" press feature
    projects.tsx       # filterable Stage & Screen works gallery
    career.tsx         # career timeline + stats + process
    trailer.tsx        # Queen Pin self-healing video player
    inquire.tsx        # request-a-script form
    connect.tsx        # newsletter + cross-link CTA + footer
    theme-provider.tsx particles.tsx brand-logo.tsx
    dividers.tsx reading-progress.tsx structured-data.tsx
  hooks/
    use-reveal.ts use-parallax.ts use-media-status.ts
    use-mobile.ts use-toast.ts
  lib/
    productions-data.ts # all content: awards, projects, timeline, SITE
    db.ts utils.ts
public/
  images/              # author portrait, logo, awards, OG image, icons
  video/queen-pin-trailer.mp4
  favicon.ico  manifest.webmanifest
prisma/
  schema.prisma        # User, Subscriber, Inquiry, Post models
```

## Content notes

All award, collaboration, and bio content is sourced from the author's
verified press materials. Project loglines/synopses for in-development works
(Selected Screenplays, Stage Plays, The Adventures of Rapman & Homeboy) are
placeholders reflecting the bio and will be replaced with exact titles and
details when supplied by the author.

## Cross-link

The footer and call-to-action link to the companion poetry site
(`SITE.poetrySiteUrl` in `src/lib/productions-data.ts`). Update that constant
and `SITE.url` to the production domains before launch.
