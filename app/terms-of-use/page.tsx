import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | careergen",
  description:
    "Review careergen's terms of use, including site access and content usage guidelines for job seekers and partners.",
};

export default function TermsOfUsePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-5 py-16 sm:px-8 lg:px-10">
      <div className="mb-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-500">
          ← Back home
        </Link>
      </div>

      <section className="rounded-3xl border border-navy-800/10 bg-white p-8 shadow-sm sm:p-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
          Terms of use
        </p>
        <h1 className="font-serif text-3xl font-bold text-navy-950 sm:text-4xl">
          Use of this site is subject to these simple terms.
        </h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-navy-700">
          <p>
            By using careergen.online, you agree to use the website for lawful purposes and to respect the
            content, branding, and intellectual property presented here.
          </p>
          <p>
            The information provided on this website is for general informational purposes only and may
            change over time as hiring practices and company requirements evolve.
          </p>
          <p>
            We reserve the right to update these terms at any time. Continued use of the site after any
            changes constitutes acceptance of the revised terms.
          </p>
        </div>
      </section>
    </main>
  );
}
