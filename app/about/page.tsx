import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About careergen",
  description:
    "Learn how careergen supports international job seekers with trusted Germany job listings, application tips, and career guidance.",
  path: "/about",
  keywords: [
    "about careergen",
    "Germany career guidance",
    "international job support",
    "employment resources Germany",
  ],
  geoRegion: "DE",
  geoPlacename: "Germany",
  geoPosition: "51.1657;10.4515",
});

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-5 py-16 sm:px-8 lg:px-10">
      <div className="mb-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-500">
          ← Back home
        </Link>
      </div>

      <section className="rounded-3xl border border-navy-800/10 bg-white p-8 shadow-sm sm:p-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
          About us
        </p>
        <h1 className="font-serif text-3xl font-bold text-navy-950 sm:text-4xl">
          We help job seekers discover trusted opportunities and career guidance.
        </h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-navy-700">
          <p>
            careergen.online is a career-focused platform designed to make it easier for people to explore
            work opportunities, understand hiring expectations, and prepare for applications in Germany,
            Europe, and beyond. Our content is created for job seekers who want practical guidance without
            the confusion of overly technical or overly generic advice.
          </p>

          <h2 className="font-serif text-xl font-semibold text-navy-900">What we do</h2>
          <p>
            We publish practical guides, company-focused articles, salary and role explainers, and step-by-step
            application advice to help candidates understand what employers are looking for and how to prepare
            a stronger application. We also highlight real-world hiring patterns so readers can make better
            career decisions.
          </p>

          <h2 className="font-serif text-xl font-semibold text-navy-900">Who we serve</h2>
          <p>
            Our audience includes international professionals, early-career applicants, and experienced candidates
            who want more clarity about hiring processes, salary expectations, and the realities of working for
            specific companies. Whether someone is exploring a new market or refining their application strategy,
            our goal is to make the information easier to act on.
          </p>

          <h2 className="font-serif text-xl font-semibold text-navy-900">Our editorial approach</h2>
          <p>
            We aim to present information in a clear, structured, and trustworthy way. Where possible, we reference
            official employer pages, public job postings, and verified company sources so readers can cross-check
            the information they are using. We also regularly update articles when hiring details or company
            information changes.
          </p>

          <p>
            Our mission is simple: deliver clear, relevant, and useful career information in a format that feels
            approachable, actionable, and easy to trust.
          </p>
        </div>
      </section>
    </main>
  );
}
