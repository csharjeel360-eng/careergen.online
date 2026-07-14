import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About careergen | Career guidance for Japan and Germany",
  description:
    "Learn how careergen supports international job seekers with trusted job listings, application tips, and career guidance.",
};

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
        <div className="mt-6 space-y-4 text-base leading-8 text-navy-700">
          <p>
            careergen.online is a career-focused platform designed to make it easier for people to explore
            work opportunities, understand hiring expectations, and prepare for applications in Japan and
            beyond.
          </p>
          <p>
            We publish practical guides, company-focused articles, and step-by-step advice to support
            candidates at every stage of the job search process.
          </p>
          <p>
            Our mission is simple: deliver clear, relevant, and useful career information in a format that
            feels approachable and actionable.
          </p>
        </div>
      </section>
    </main>
  );
}
