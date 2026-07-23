import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description:
    "Review careergen's terms of use, including site access, content usage, and advertising disclosures for visitors and partners.",
  path: "/terms-of-use",
  keywords: [
    "terms of use",
    "Germany career site terms",
    "website terms",
    "advertising disclosure",
  ],
  geoRegion: "DE",
  geoPlacename: "Germany",
  geoPosition: "51.1657;10.4515",
});

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
        <div className="mt-6 space-y-5 text-base leading-8 text-navy-700">
          <p>
            By using careergen.online, you agree to use the website for lawful purposes and to respect the
            content, branding, and intellectual property presented here. You may not scrape, republish,
            redistribute, or commercially exploit our articles, images, data, or design elements without
            permission unless expressly allowed by law or by prior written consent.
          </p>

          <h2 className="font-serif text-xl font-semibold text-navy-900">User conduct</h2>
          <p>
            You agree not to use the site for harmful, abusive, deceptive, or unlawful activities. This includes
            attempts to interfere with site performance, access restricted areas without authorization, or upload
            content that contains malware, spam, or misleading information.
          </p>

          <h2 className="font-serif text-xl font-semibold text-navy-900">Intellectual property</h2>
          <p>
            The text, layout, graphics, logos, and overall structure of this website are the property of careergen
            or its licensors unless otherwise noted. You may link to the site or share excerpts for personal,
            non-commercial reference, but you must not remove attribution or misrepresent ownership.
          </p>

          <h2 className="font-serif text-xl font-semibold text-navy-900">External links and third-party content</h2>
          <p>
            This site may contain third-party advertisements, links to employer pages, job portals, social media
            platforms, and other websites. We are not responsible for the privacy practices, content, accuracy,
            or availability of those external websites, and you access them at your own risk.
          </p>

          <h2 className="font-serif text-xl font-semibold text-navy-900">Disclaimer and limitations</h2>
          <p>
            The information provided on this website is for general informational purposes only. Job openings,
            salary ranges, employer requirements, and application processes may change quickly and should be
            verified directly with the official employer or recruiting page before making decisions. We do not
            guarantee that the information will always be complete, error-free, or up to date.
          </p>

          <p>
            We reserve the right to update, suspend, or discontinue any part of the website at any time. Continued
            use of the site after any changes constitutes acceptance of the revised terms.
          </p>
        </div>
      </section>
    </main>
  );
}
