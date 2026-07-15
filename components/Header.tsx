"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Job advice", href: "/jobs/job-advice-career-tips-2026" },
  { label: "Hospitality tips", href: "/jobs/hospitality-career-tips-2026" },
  { label: "Interview tips", href: "/jobs/interview-tips-2026" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-800/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/careergen-logo.svg"
            alt="careergen logo"
            width={40}
            height={40}
            priority
            className="rounded-sm object-contain"
          />
          <span className="font-serif text-lg font-bold tracking-tight text-navy-900 sm:text-xl">
            careergen
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex items-center justify-center rounded-sm border border-navy-800/10 bg-white px-2.5 py-2 text-[13px] font-semibold text-navy-900 transition hover:bg-navy-50 md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? "Close" : "Menu"}
        </button>

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

      <div className={`${isOpen ? "block" : "hidden"} border-t border-navy-800/10 bg-white px-5 pb-4 md:hidden`}>
        <nav className="flex flex-col gap-3 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-sm px-3 py-2 text-sm font-medium text-navy-800/80 transition hover:bg-navy-50 hover:text-navy-900"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#jobs"
            className="rounded-sm bg-navy-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-navy-700"
            onClick={() => setIsOpen(false)}
          >
            View jobs
          </Link>
        </nav>
      </div>
    </header>
  );
}
