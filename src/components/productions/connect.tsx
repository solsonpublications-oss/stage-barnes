"use client";

import { useState } from "react";
import { Mail, ArrowRight, ShoppingBag, BookOpen, ExternalLink, AtSign } from "lucide-react";
import { SITE, footerLinks } from "@/lib/productions-data";
import { BrandLogo } from "./brand-logo";
import { useToast } from "@/hooks/use-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "productions" }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok && data?.ok) {
        setState("sent");
        toast({
          title: "Welcome to the inner circle",
          description: "Notes from the writer's room will find their way to your inbox.",
        });
        setEmail("");
        setTimeout(() => setState("idle"), 3000);
      } else {
        setState("idle");
        toast({
          title: "Hmm — that didn't go through",
          description: data?.error || "Please check the address and try again.",
        });
      }
    } catch {
      setState("idle");
      toast({
        title: "Connection trouble",
        description: "Please try again in a moment.",
      });
    }
  };

  return (
    <section id="connect" className="relative px-5 py-24 sm:py-28">
      <div className="reveal relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-accent/25 bg-gradient-to-br from-card/60 to-secondary/30 p-10 text-center backdrop-blur sm:p-14">
        {/* marquee-bulb accents along the top edge */}
        <span className="marquee-bulbs" aria-hidden>
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              style={{
                left: `${(i / 21) * 100}%`,
                top: "6px",
                transform: "translateX(-50%)",
                ["--bulb-delay" as string]: `${((i % 5) * 0.4).toFixed(2)}s`,
              }}
            />
          ))}
        </span>
        {/* film-strip bottom accent */}
        <div aria-hidden className="film-strip pointer-events-none absolute inset-x-0 bottom-0 h-3 opacity-30" />

        <p className="kicker relative z-10 text-accent">stay connected</p>
        <h2
          className="relative z-10 mt-3 font-serif text-[clamp(2rem,5vw,3.25rem)] italic text-foreground"
          style={{ fontWeight: 300 }}
        >
          Notes From the Writer&apos;s Room
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          Occasional updates on new scripts, projects in development, and the
          work of bringing stories to stage and screen. No spam, no noise —
          just the next chapter.
        </p>
        <form onSubmit={submit} className="relative z-10 mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              className="h-12 w-full rounded-full border border-border bg-background/60 pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
            />
          </div>
          <button
            type="submit"
            disabled={state === "sending"}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_-6px_var(--glow-gold)] hover:brightness-110 disabled:opacity-60"
          >
            {state === "sending" ? "Subscribing…" : state === "sent" ? "Subscribed" : "Subscribe"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="relative z-10 mt-4 text-xs text-muted-foreground">
          We respect your inbox. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

export function CallToAction() {
  return (
    <section id="more" className="relative overflow-hidden px-5 py-24 sm:py-32">
      {/* sweeping cinema spotlight backdrop */}
      <div aria-hidden className="spotlight-beam pointer-events-none opacity-30" />
      {/* film-strip top accent */}
      <div aria-hidden className="film-strip pointer-events-none absolute inset-x-0 top-0 h-4 opacity-25" />

      <div className="reveal relative mx-auto max-w-4xl text-center">
        <p className="kicker text-primary">coming attractions</p>
        <h2
          className="mt-3 font-serif text-[clamp(2.2rem,6vw,4rem)] italic text-gold-gradient"
          style={{ fontWeight: 300 }}
        >
          Read the Poetry &amp; the Books
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          This is the home of R. Ray Barnes&apos;s work for stage and screen.
          For his five-volume poetry collection and his other books — visit
          the companion site.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={SITE.poetrySiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-all duration-300 hover:shadow-[0_0_36px_-6px_var(--glow-gold)] hover:brightness-110"
          >
            <BookOpen className="h-4 w-4" />
            Visit The Art of Poetry
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={SITE.amazonAuthorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-300 hover:bg-primary/10"
          >
            <ShoppingBag className="h-4 w-4" />
            Amazon Author Page
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const socials = [
    { href: SITE.amazonAuthorUrl, label: "Amazon Author Page", icon: ShoppingBag },
    { href: SITE.poetrySiteUrl, label: "The Art of Poetry (books & verse)", icon: BookOpen },
    { href: `https://twitter.com/${SITE.socialHandle.replace("@", "")}`, label: `${SITE.socialHandle} on X`, icon: AtSign },
  ];
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border/50 bg-card/20 px-5 py-16">
      {/* film-strip top border */}
      <div aria-hidden className="film-strip pointer-events-none absolute inset-x-0 top-0 h-3 opacity-40" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <BrandLogo className="h-28 w-auto sm:h-32" rounded="rounded-2xl" />
          <p className="font-serif text-2xl italic text-foreground">
            R. Ray Barnes
          </p>
          <p className="text-sm text-muted-foreground">Writer · Producer · Music Producer · Songwriter</p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {footerLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-3">
          <p className="kicker text-accent">Made with love, R. Ray Barnes Productions</p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_18px_-6px_var(--glow-gold)]"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-xs tracking-wide text-muted-foreground">
            Photo by LaSalle Barnes, Sr.
          </p>
          <p className="text-xs tracking-wide text-muted-foreground">
            © {new Date().getFullYear()} R. Ray Barnes Productions · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
