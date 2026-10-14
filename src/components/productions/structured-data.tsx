import { awards, projects, SITE } from "@/lib/productions-data";

/**
 * JSON-LD structured data for the writer/producer + their screen & stage
 * works, injected into the page head for richer search results.
 */
export function StructuredData() {
  const authorLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "R. Ray Barnes",
    description:
      "Emmy Award–winning American writer, producer, and music-industry veteran. Writer of screenplays, stage plays, and the proposed animated feature The Adventures of Rapman & Homeboy and the Hip-Hop Posse. Producer of Left Behind in Vietnam (2019 Michigan Regional Emmy) and the Queen Pin screen adaptation. Over forty-five years as a music producer and songwriter collaborating with Stevie Wonder, Mary Wilson, James Ingram, Lee Greenwood, and The Pointer Sisters.",
    url: SITE.url,
    sameAs: [SITE.amazonAuthorUrl],
    jobTitle: "Writer · Producer · Songwriter",
    award: awards.map((a) => a.title),
    knowsAbout: [
      "Screenwriting",
      "Playwriting",
      "Television production",
      "Film production",
      "Music production",
      "Songwriting",
    ],
  };

  const worksLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Stage & Screen Works by R. Ray Barnes",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      description: p.logline,
      ...(p.href
        ? {
            url: p.href,
          }
        : {}),
    })),
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "R. Ray Barnes Productions — Stage & Screen",
    url: SITE.url,
    description:
      "The scripts, screenplays, stage plays, and screen work of Emmy-winning writer & producer R. Ray Barnes.",
    inLanguage: "en",
    author: { "@type": "Person", name: "R. Ray Barnes" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(worksLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
    </>
  );
}
