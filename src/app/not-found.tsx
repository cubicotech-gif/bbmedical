import Link from "next/link";

export default function NotFound() {
  return (
    <div className="frame flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-6xl text-clay">404</p>
      <h1 className="mt-4 font-display text-3xl text-ink">
        We couldn't find that page.
      </h1>
      <p className="mt-3 max-w-reading font-body text-inkSoft">
        The link may be old, or the page may have moved. Let's get you back to
        familiar ground.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-clay">
          Back home
        </Link>
        <Link href="/catalog" className="btn-outline">
          Browse the catalog
        </Link>
      </div>
    </div>
  );
}
