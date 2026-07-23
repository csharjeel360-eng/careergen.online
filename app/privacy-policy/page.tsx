import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Read careergen's privacy policy to learn how we handle data, analytics, advertising, and email communication responsibly.",
  path: "/privacy-policy",
  keywords: [
    "privacy policy",
    "Germany career website privacy",
    "data protection",
    "cookie policy",
  ],
  geoRegion: "DE",
  geoPlacename: "Germany",
  geoPosition: "51.1657;10.4515",
});

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
        <div className="mt-6 space-y-5 text-base leading-8 text-navy-700">
          <p>
            careergen.online collects limited information to improve the user experience, understand site
            performance, and keep our career content relevant. We may use tools such as analytics services,
            performance monitoring, and third-party advertising technology to measure traffic and personalize
            or improve ad delivery.
          </p>

          <h2 className="font-serif text-xl font-semibold text-navy-900">What information we collect</h2>
          <p>
            Depending on how you use the site, we may collect information such as your IP address, browser
            type, device information, pages viewed, referral source, and general interaction data. We may
            also collect information you voluntarily provide, such as when you contact us by email or submit
            a question through the site.
          </p>

          <h2 className="font-serif text-xl font-semibold text-navy-900">Cookies and advertising</h2>
          <p>
            Cookies and similar technologies may be used to remember preferences, support basic site
            functionality, analyze aggregate usage, and help deliver relevant advertising. Some advertising
            partners may use cookies or similar technologies to show tailored ads based on browsing activity
            or device characteristics. If you do not want certain cookies or personalized advertising, you can
            adjust your browser settings or use industry opt-out tools where available.
          </p>

          <h2 className="font-serif text-xl font-semibold text-navy-900">How we use and share information</h2>
          <p>
            We use collected information to operate the website, improve content quality, understand audience
            behavior, and support advertising and analytics functions. We do not sell personal information to
            third parties for direct marketing. We may share limited data with service providers that help us
            run the site, analyze performance, or deliver ads, subject to confidentiality obligations.
          </p>

          <h2 className="font-serif text-xl font-semibold text-navy-900">Your choices and rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct, delete, or restrict processing
            of certain personal information. Users in the EU/UK and California may also have additional rights
            under applicable privacy laws, including the right to object to certain processing activities and
            to request information about the categories of data collected and shared.
          </p>

          <p>
            If you have questions about privacy practices, would like to exercise a privacy right, or want to
            request more information about our data practices, please contact us at hello@careergen.online.
          </p>
        </div>
      </section>
    </main>
  );
}
