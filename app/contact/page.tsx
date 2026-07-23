import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact careergen",
  description:
    "Contact careergen for questions, feedback, or collaboration about Germany job resources, career guides, and job listings.",
  path: "/contact",
  keywords: [
    "contact careergen",
    "Germany job help",
    "career support",
    "international job questions",
  ],
  geoRegion: "DE",
  geoPlacename: "Germany",
  geoPosition: "51.1657;10.4515",
});

export default function ContactPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-5 py-16 sm:px-8 lg:px-10">
      <div className="mb-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-500">
          ← Back home
        </Link>
      </div>

      <section className="rounded-3xl border border-navy-800/10 bg-white p-8 shadow-sm sm:p-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
          Contact
        </p>
        <h1 className="font-serif text-3xl font-bold text-navy-950 sm:text-4xl">
          Get in touch with our team.
        </h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-navy-700">
          <p>
            For questions, feedback, or collaboration requests, please contact us through the email
            address below.
          </p>
          <p className="font-semibold text-navy-950">hello@careergen.online</p>
          <p>
            We typically respond within a few business days and welcome inquiries from job seekers,
            employers, and content partners.
          </p>
        </div>
      </section>
    </main>
  );
}
