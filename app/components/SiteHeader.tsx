import Link from "next/link";

const nav = [
  { href: "/#home", label: "Home" },
  { href: "/qa", label: "QA" },
  { href: "/#team", label: "Team" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/#home"
          className="group flex items-center gap-3 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black/40"
        >
          <span className="ct-brand text-xl font-semibold tracking-tight md:text-2xl">
            <span className="ct-brandC">C</span>omplianceTwin
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-black/70 hover:bg-black/5 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <div className="flex items-center gap-2">
            <Link href="/qa" className="ct-btn-secondary">
              QA
            </Link>
            <Link href="/#team" className="ct-btn-secondary">
              Team
            </Link>
            <Link href="/#contact" className="ct-btn-secondary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

