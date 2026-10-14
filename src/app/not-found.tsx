import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">404 · Page Not Found</p>
      <h1 className="mt-4 font-serif text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
        Scene Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        The page or script you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-md border border-primary/40 bg-primary/10 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-primary transition-colors hover:bg-primary/20"
      >
        Return Home
      </Link>
    </div>
  );
}
