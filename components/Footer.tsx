import Image from "next/image";
import Link from "next/link";
import { jobs } from "@/data/jobs";

const footerLinks = [
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of use", href: "/terms-of-use" },
  { label: "LLMs.txt", href: "/llms.txt" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61591903173398",
    icon: "f",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@sharjeelcoder82",
    icon: "T",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sharjeelcoder82/?hl=en",
    icon: "I",
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-navy-800/10 bg-navy-950 text-cream/80">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/careergen-logo.svg"
              alt="careergen logo"
              width={48}
              height={48}
              priority
              className="rounded-sm object-contain"
            />
            <span className="font-serif text-xl font-bold text-white">
              careergen
            </span>
          </Link>

          <p className="mt-3 text-sm leading-6 text-cream/60">
            Trusted job opportunities and career guidance for international candidates exploring work in Germany.
          </p>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              Follow us
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-cream/80 transition hover:border-gold-400 hover:text-gold-400"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/15 text-xs font-bold text-gold-400">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-serif text-sm font-bold uppercase tracking-wide text-gold-400">
            Recent jobs
          </h3>
          <ul className="space-y-2 text-sm">
            {jobs.slice(0, 3).map((job) => (
              <li key={job.slug}>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="text-cream/70 transition hover:text-gold-400"
                >
                  {job.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-serif text-sm font-bold uppercase tracking-wide text-gold-400">
            Site info
          </h3>
          <ul className="space-y-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-cream/70 transition hover:text-gold-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/50">
        Copyright © 2026 • careergen.online • All rights reserved.
      </div>
    </footer>
  );
}
