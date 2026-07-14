import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | careergen",
  description:
    "Read careergen's privacy policy to learn how we handle data, analytics, and email communication responsibly.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-5 py-16 sm:px-8 lg:px-10">
      <div className="mb-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-500">
          ← Back home
        </Link>
      </div>

      <section className="rounded-3xl border border-navy-800/10 bg-white p-8 shadow-sm sm:p-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
          Privacy policy
        </p>
        <h1 className="font-serif text-3xl font-bold text-navy-950 sm:text-4xl">
          We value your privacy and handle information responsibly.
        </h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-navy-700">
          <p>
            This website collects limited information to improve the experience for visitors and to ensure
            our content remains relevant and useful.
          </p>
          <p>
            We may use analytics tools and cookies to understand site usage patterns, but we do not sell
            personal data to third parties.
          </p>
          <p>
            If you have questions about privacy practices, please contact us at
            hello@careergen.online.
          </p>
        </div>
      </section>
    </main>
  );
}
