/**
 * R. Ray Barnes Productions — content data for the stage & screen site.
 *
 * Sourced verbatim from the author's verified press materials and bio
 * ("Spotlight on Ray" press feature). Project cards reflect the works
 * named in his biography: Queen Pin (book & screen adaptation), Left
 * Behind in Vietnam (Emmy-winning documentary), the biblical board game
 * Resurrection: The Life of Christ, screenplays, stage plays, and the
 * proposed animated feature The Adventures of Rapman & Homeboy and the
 * Hip-Hop Posse.
 *
 * Detailed titles, loglines, and synopses for in-development works will be
 * supplied by the author by email. Until then the cards present what is
 * publicly verifiable and invite serious inquiries.
 */

export const SITE = {
  /** Canonical production-company / stage & screen domain. */
  url: "https://robert-barnes-productions.space-z.ai",
  /** Sibling poetry & books site — cross-linked from both directions. */
  poetrySiteUrl: "https://robert-barnes.space-z.ai",
  poetrySiteLabel: "The Art of Poetry — R. Ray Barnes",
  /** Canonical Amazon author page — every book lives here. */
  amazonAuthorUrl: "https://www.amazon.com/stores/author/B00QJ4O3CW",
  /** Social handle. */
  socialHandle: "@rraybarnes",
  /** Queen Pin on Amazon (book). */
  queenPinUrl: "https://www.amazon.com/dp/B0BJQMCLZV",
};

export type Award = {
  id: string;
  /** Which medallion artwork to render. */
  medal: "emmy" | "eclipse";
  /** Short label engraved on the medallion face. */
  short: string;
  /** Year engraved under the medallion label, when applicable. */
  year?: string;
  title: string;
  subtitle: string;
  text: string;
  /**
   * Candidate paths for the real award photograph. The site probes them in
   * order and the first file that exists is shown inside a gold frame — drop
   * the file in with ANY of these names and it appears instantly.
   */
  photoCandidates: string[];
};

/** Verifiable honors drawn from the author's own press materials ("Spotlight on Ray"). */
export const awards: Award[] = [
  {
    id: "emmy",
    medal: "emmy",
    short: "EMMY",
    year: "2019",
    title: "Michigan Regional Emmy Award",
    subtitle: "Winner · 2019",
    text:
      "Presented by the National Academy of Television Arts & Sciences, Michigan Chapter, for Interview/Discussion — Left Behind in Vietnam. Produced by R. Ray Barnes with iMichigan Productions and Peaceful Warriors Foundation.",
    photoCandidates: [
      "/images/awards/award-emmy.jpg",
      "/images/award-emmy.jpg",
    ],
  },
  {
    id: "eclipse",
    medal: "eclipse",
    short: "ECLIPSE",
    title: "36th Annual Eclipse Award",
    subtitle: "Winner",
    text:
      "Presented to R. Ray Barnes for Outstanding Television or Cable Program, honoring distinguished creative work across screen, song, and the written word.",
    photoCandidates: [
      "/images/awards/award-eclipse.jpg",
      "/images/award-eclipse.jpg",
    ],
  },
];

/** Real collaborations from the author's 45+ years as a music producer & songwriter. */
export const collaborators: string[] = [
  "Stevie Wonder",
  "Mary Wilson of the Supremes",
  "James Ingram",
  "Lee Greenwood",
  "The Pointer Sisters",
];

/** Where the author's Queen Pin trailer lives. */
export const QUEEN_PIN_TRAILER_SRC = "/video/queen-pin-trailer.mp4";

/** Spotlight on Ray press feature — the author's own press profile (link supplied by email). */
export const pressFeature = {
  kicker: "Spotlight on Ray",
  note:
    "Also profiled in the “Spotlight on Ray” press feature — the author's own press profile.",
  detail:
    "“Spotlight on Ray” is the author's own press profile. The full feature link is being supplied by the author by email; available on request in the meantime.",
};

export type ProjectFormat = "Feature Film" | "Documentary" | "Stage Play" | "TV Series" | "Animated Feature" | "Board Game" | "Book & Screen";

export type Project = {
  id: string;
  title: string;
  format: ProjectFormat;
  /** Short tagline shown above the title. */
  tagline: string;
  /** One-line logline / pitch. */
  logline: string;
  /** Longer synopsis (1–3 sentences). */
  synopsis: string;
  /** Development status. */
  status: "Available" | "In Development" | "Produced" | "Award-Winning" | "Published & Adapted";
  /** Optional award badge. */
  award?: string;
  /** Optional production credit. */
  credit?: string;
  /** Optional partner / collaborator note. */
  partners?: string;
  /** Optional external link (Amazon, etc.). */
  href?: string;
  /** Cover / still path, when one is available. */
  still?: string;
  /** Accent glyph id rendered in the card corner. */
  glyph: "film" | "clapper" | "masks" | "tv" | "animation" | "book";
};

/**
 * Projects reflect the works named in the author's biography. Detailed
 * loglines and synopses for in-development works will be supplied by the
 * author by email; the cards present what is publicly verifiable and
 * invite serious inquiries via the Request-a-Script form.
 */
export const projects: Project[] = [
  {
    id: "queen-pin",
    title: "Queen Pin",
    format: "Book & Screen",
    tagline: "The Rosa Parks of bowling, on the page and the screen.",
    logline:
      "The true story of Yvonne Barnes and the Motown Records Bowlerettes — the first all-Black female pro bowling team to win first place in the highest-scoring all-white league in the United States.",
    synopsis:
      "Adapted from the author's book of the same name, Queen Pin is the screen telling of his mother's life: a tribute to the woman called the “Rosa Parks of bowling,” to the championship team she built, and to an era that moved to its own rhythm. Produced by R. Ray Barnes — watch the official trailer below.",
    status: "Published & Adapted",
    award: "Available on Amazon",
    credit: "Writer · Producer",
    href: "https://www.amazon.com/dp/B0BJQMCLZV",
    still: "/images/amazon/queen-pin.jpg",
    glyph: "film",
  },
  {
    id: "left-behind-in-vietnam",
    title: "Left Behind in Vietnam",
    format: "Documentary",
    tagline: "The Emmy-winning interview that gave veterans their say.",
    logline:
      "A long-form interview and discussion program honoring the voices of Vietnam veterans too long left out of the conversation.",
    synopsis:
      "Produced by R. Ray Barnes with iMichigan Productions and the Peaceful Warriors Foundation, Left Behind in Vietnam earned the 2019 Michigan Regional Emmy for Interview/Discussion — recognition from the National Academy of Television Arts & Sciences, Michigan Chapter.",
    status: "Award-Winning",
    award: "2019 Michigan Regional Emmy",
    credit: "Producer",
    partners: "iMichigan Productions · Peaceful Warriors Foundation",
    glyph: "tv",
  },
  {
    id: "rapman-homeboy",
    title: "The Adventures of Rapman & Homeboy and the Hip-Hop Posse",
    format: "Animated Feature",
    tagline: "A proposed animated feature for a new generation.",
    logline:
      "An animated proposed feature following Rapman, Homeboy, and their Hip-Hop Posse — a original-music-driven adventure written for the screen.",
    synopsis:
      "One of the author's long-gestating screen works: an animated feature proposal pairing original characters with the musical sensibility he built over forty-five years in the industry. Concept, treatment, and sample sequences available to qualified production partners on request.",
    status: "In Development",
    credit: "Writer · Creator",
    glyph: "animation",
  },
  {
    id: "resurrection-board-game",
    title: "Resurrection: The Life of Christ",
    format: "Board Game",
    tagline: "A biblical board game built for the whole family.",
    logline:
      "A tabletop journey through the life of Christ — the author's original biblical board game, designed for play and reflection.",
    synopsis:
      "Beyond writing and music, R. Ray Barnes created Resurrection: The Life Of Christ, an original biblical board game. The work demonstrates the same storytelling instinct that drives his scripts — a narrative made interactive.",
    status: "Produced",
    credit: "Creator · Designer",
    glyph: "book",
  },
];

export type Milestone = {
  year: string;
  title: string;
  text: string;
};

/**
 * Career highlights — verified facts only. The bio mentions screenplays and
 * stage plays generically, but Robert is sending the actual titles, loglines,
 * and dates by email, so no fabricated dates are shown here. Only the Emmy
 * year (2019) and the named "36th Annual" Eclipse Award are dated.
 */
export const journey: Milestone[] = [
  {
    year: "45+",
    title: "Years in the Studio",
    text:
      "A music production and songwriting career spanning more than forty-five years — built in the studio with three-time Grammy winner Tony Coleman, alongside Stevie Wonder, Mary Wilson, James Ingram, Lee Greenwood, The Pointer Sisters, and many more.",
  },
  {
    year: "2019",
    title: "The Michigan Regional Emmy",
    text:
      "Left Behind in Vietnam — produced with iMichigan Productions and the Peaceful Warriors Foundation — wins the Michigan Regional Emmy for Interview/Discussion.",
  },
  {
    year: "36th",
    title: "The Eclipse Award",
    text:
      "Honored with the 36th Annual Eclipse Award for Outstanding Television or Cable Program — recognition across screen, song, and the written word.",
  },
  {
    year: "Now",
    title: "Stage & Screen in Development",
    text:
      "Queen Pin is published and adapted for the screen; the proposed animated feature The Adventures of Rapman & Homeboy and the Hip-Hop Posse is in development. Additional script and stage titles will be added as they are confirmed.",
  },
];

export const processSteps = [
  {
    title: "The Story",
    text:
      "Every project begins with a story only this writer can tell — drawn from a life in studios, on sets, and inside the American family.",
  },
  {
    title: "The Craft",
    text:
      "A screenplay, a stage play, a treatment, a trailer. Each form is shaped to its medium — built to be performed, produced, and felt.",
  },
  {
    title: "The Collaboration",
    text:
      "From page to production: R. Ray Barnes Productions works with producers, directors, theaters, and studios to bring the work to audiences.",
  },
];

export const stats = [
  { value: 45, label: "YEARS IN THE STUDIO", suffix: "+" },
  { value: 2, label: "MAJOR AWARDS", suffix: "" },
  { value: 4, label: "STAGE & SCREEN WORKS", suffix: "" },
  { value: Infinity, label: "STORIES LEFT TO TELL", suffix: "" },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#awards", label: "Awards" },
  { href: "#works", label: "Works" },
  { href: "#career", label: "Career" },
  { href: "#trailer", label: "Trailer" },
  { href: "#inquire", label: "Inquire" },
  { href: "#connect", label: "Connect" },
];

/** Footer link list — mirrors the nav, with friendly labels. */
export const footerLinks = [
  { href: "#about", label: "About the Writer" },
  { href: "#awards", label: "Awards" },
  { href: "#works", label: "Stage & Screen Works" },
  { href: "#career", label: "Career Highlights" },
  { href: "#trailer", label: "Queen Pin Trailer" },
  { href: "#inquire", label: "Request a Script" },
  { href: "#connect", label: "Stay Connected" },
];
