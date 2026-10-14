"use client";

import { ThemeProvider } from "@/components/productions/theme-provider";
import { Particles } from "@/components/productions/particles";
import { Navbar, BackToTop } from "@/components/productions/nav";
import { ReadingProgress } from "@/components/productions/reading-progress";
import { SectionDivider } from "@/components/productions/dividers";
import { MarqueeBand } from "@/components/productions/marquee-band";
import { Hero, About } from "@/components/productions/hero";
import { Awards } from "@/components/productions/awards";
import { Projects } from "@/components/productions/projects";
import { Journey, Process, Stats } from "@/components/productions/career";
import { QueenPinTrailer } from "@/components/productions/trailer";
import { Inquire } from "@/components/productions/inquire";
import { Newsletter, CallToAction, Footer } from "@/components/productions/connect";
import { StructuredData } from "@/components/productions/structured-data";
import { useReveal } from "@/hooks/use-reveal";
import { useParallax } from "@/hooks/use-parallax";

export default function Home() {
  useReveal();
  useReveal(["#works", "#career"]);
  useParallax();

  return (
    <ThemeProvider>
      <StructuredData />
      <ReadingProgress />
      <Particles />
      <Navbar />
      <main className="relative z-10 flex min-h-screen flex-col">
        <Hero />
        <About />
        <SectionDivider variant="line" />
        <Awards />
        <MarqueeBand />
        <Projects />
        <Stats />
        <SectionDivider variant="line" />
        <Journey />
        <SectionDivider variant="diamond" />
        <Process />
        <MarqueeBand
          items={[
            "Now Playing",
            "Queen Pin — Official Trailer",
            "Produced by R. Ray Barnes",
          ]}
        />
        <QueenPinTrailer />
        <SectionDivider variant="film" />
        <Inquire />
        <Newsletter />
        <CallToAction />
        <Footer />
      </main>
      <BackToTop />
    </ThemeProvider>
  );
}
