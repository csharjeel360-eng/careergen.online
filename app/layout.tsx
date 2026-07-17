import type { Metadata } from "next";
import Script from "next/script";
// @ts-ignore: allow global CSS side-effect import
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildPageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Germany Job Listings & Career Guides",
    description:
      "careergen.online provides clear explanations of job listings, application tips, and salary ranges across Germany.",
    path: "/",
    keywords: ["Germany career resources", "job application tips"],
  }),
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/careergen-logo.svg",
    apple: "/careergen-logo.svg",
  },
  verification: {
    google: "o-DyFEMmO4OOaVdy40HqbVSr_5IIPLfYhPk7S8bHIDo",
  },
  category: "career",
  other: {
    "llms.txt": "/llms.txt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <Script id="application-ld+json" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "careergen.online",
            "url": siteUrl,
            "logo": `${siteUrl}/careergen-logo.svg`,
            "sameAs": [
              "https://web.facebook.com/profile.php?id=61591903173398",
              "https://www.threads.com/@sharjeelcoder82",
              "https://www.instagram.com/sharjeelcoder82/?hl=en",
            ],
          })}
        </Script>
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NRWVFJJC');`}
        </Script>

        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NRWVFJJC" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
