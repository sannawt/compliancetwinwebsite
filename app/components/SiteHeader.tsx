import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/#home", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/qa", label: "QA" },
  { href: "/#team", label: "Team" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[color:var(--ct-blue-100)]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/#home"
          className="group flex items-center gap-3 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black/40"
        >
          <span className="win-icon">
            <Image
              src="/brand/compliancetwin-logo.svg"
              alt="ComplianceTwin"
              width={28}
              height={28}
              priority
            />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            ComplianceTwin
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="win-nav-btn"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Link href="/qa" className="win-nav-btn">
            QA
          </Link>
        </div>
      </div>
    </header>
  );
}

