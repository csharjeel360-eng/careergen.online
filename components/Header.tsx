import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Job advice", href: "/jobs/job-advice-career-tips-2026" },
  { label: "Hospitality tips", href: "/jobs/hospitality-career-tips-2026" },
  { label: "Interview tips", href: "/jobs/interview-tips-2026" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy-800/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/careergen-logo.svg"
            alt="careergen logo"
            width={48}
            height={48}
            priority
            className="rounded-sm object-contain"
          />
          <span className="font-serif text-xl font-bold tracking-tight text-navy-900">
            careergen
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-navy-800/80 transition hover:text-gold-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#jobs"
          className="hidden rounded-sm bg-navy-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-700 md:inline-block"
        >
          View jobs
        </Link>
      </div>
    </header>
  );
}
