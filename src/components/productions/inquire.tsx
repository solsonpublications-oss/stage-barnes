"use client";

import { useState } from "react";
import { Send, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { projects } from "@/lib/productions-data";
import { useToast } from "@/hooks/use-toast";

type FormState = {
  name: string;
  email: string;
  organization: string;
  project: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  organization: "",
  project: "General inquiry",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Request-a-Script inquiry form. Posts to /api/inquiry which persists the
 * submission to the database (Inquiry model) so the author can follow up
 * with qualified producers, directors, theaters, and studios.
 */
export function Inquire() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const { toast } = useToast();

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;

    if (!form.name.trim()) {
      toast({ title: "Your name, please", description: "So we know who's asking." });
      return;
    }
    if (!EMAIL_RE.test(form.email.trim().toLowerCase())) {
      toast({ title: "A valid email, please", description: "We'll reply by email." });
      return;
    }
    if (form.message.trim().length < 10) {
      toast({ title: "A little more detail", description: "Tell us about your project or request (at least 10 characters)." });
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok && data?.ok) {
        setState("sent");
        toast({
          title: "Inquiry received",
          description: "Thank you — R. Ray Barnes Productions will be in touch.",
        });
        setForm(EMPTY);
        setTimeout(() => setState("idle"), 4000);
      } else {
        setState("idle");
        toast({
          title: "Hmm — that didn't go through",
          description: data?.error || "Please try again in a moment.",
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

  const fieldClass =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60";

  return (
    <section id="inquire" className="relative overflow-hidden px-5 py-24 sm:py-32">
      {/* backdrop glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_30%,rgba(200,92,124,0.10),transparent_70%)]"
      />
      {/* sweeping spotlight backdrop */}
      <div aria-hidden className="spotlight-beam pointer-events-none opacity-25" />
      {/* film-strip top + bottom accents */}
      <div aria-hidden className="film-strip pointer-events-none absolute inset-x-0 top-0 h-4 opacity-25" />
      <div aria-hidden className="film-strip pointer-events-none absolute inset-x-0 bottom-0 h-4 opacity-25" />

      <div className="relative mx-auto max-w-3xl">
        <div className="reveal mb-10 flex flex-col items-center gap-3 text-center">
          <p className="kicker inline-flex items-center gap-2 text-accent">
            <FileText className="h-4 w-4" aria-hidden />
            request a script
          </p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] italic text-gold-gradient"
            style={{ fontWeight: 300 }}
          >
            Bring the Next Story to Life
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            For producers, directors, theaters, studios, and development
            executives — request perusal scripts, treatments, or a conversation
            about works in development.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="reveal film-perf-top film-perf-bottom relative overflow-hidden rounded-[1.75rem] border border-primary/30 bg-card/50 p-6 backdrop-blur sm:p-10"
        >
          {/* marquee-bulb header on the form card */}
          <div className="relative mb-7 flex items-center justify-center gap-3 overflow-hidden rounded-md border border-primary/40 bg-secondary/70 px-4 py-2.5">
            <span className="marquee-bulbs" aria-hidden>
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    left: `${(i / 15) * 100}%`,
                    top: "6px",
                    transform: "translateX(-50%)",
                    ["--bulb-delay" as string]: `${((i % 5) * 0.4).toFixed(2)}s`,
                  }}
                />
              ))}
            </span>
            <p className="relative z-10 text-[0.62rem] font-bold uppercase tracking-[0.32em] text-primary">
              Box Office · Request Desk
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="inq-name" className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
                Name <span className="text-accent">*</span>
              </label>
              <input
                id="inq-name"
                type="text"
                required
                value={form.name}
                onChange={update("name")}
                placeholder="Your name"
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="inq-email" className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="inq-email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                placeholder="you@studio.com"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="inq-org" className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
                Organization
              </label>
              <input
                id="inq-org"
                type="text"
                value={form.organization}
                onChange={update("organization")}
                placeholder="Studio · Theater · Production Co. (optional)"
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="inq-project" className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
                Project of interest
              </label>
              <select
                id="inq-project"
                value={form.project}
                onChange={update("project")}
                className={fieldClass}
              >
                <option>General inquiry</option>
                <option>A specific title (named below)</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.title}>
                    {p.title} — {p.format}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <label htmlFor="inq-message" className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              id="inq-message"
              required
              rows={5}
              value={form.message}
              onChange={update("message")}
              placeholder="Tell us about your project, format, timeline, or what you'd like to read…"
              className={`${fieldClass} resize-y`}
            />
          </div>

          <div className="mt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              Submissions are reviewed personally. We reply to every qualified inquiry.
            </p>
            <button
              type="submit"
              disabled={state === "sending"}
              className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-md border-2 border-primary bg-primary px-7 text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_-4px_var(--glow-gold)] hover:brightness-110 disabled:opacity-60"
            >
              {/* ticket-stub perforation accent on the left edge */}
              <span aria-hidden className="absolute -left-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-background" />
              <span aria-hidden className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-background" />
              {state === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : state === "sent" ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Inquiry
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
