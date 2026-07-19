import type { Metadata } from "next";

export const siteUrl = "https://careergen.online";
export const siteName = "careergen.online";
export const defaultDescription =
  "Discover trusted Germany job listings, career guides, salary insights, and application advice for international job seekers.";

export const defaultKeywords = [
  "Germany jobs",
  "career guides",
  "job listings",
  "international jobs",
  "remote jobs Germany",
  "career advice",
  "salary insights",
];

export function buildPageMetadata({
  title,
  description = defaultDescription,
  path = "/",
  keywords = [],
  image = "/careergen-logo.svg",
  imageAlt,
  type = "website",
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}): Metadata {
  const pageTitle = title.includes("careergen") ? title : `${title} | ${siteName}`;
  const canonicalUrl = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();

  return {
    title: pageTitle,
    description,
    keywords: [...defaultKeywords, ...keywords].filter((value, index, self) => self.indexOf(value) === index),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName,
      type,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt ?? pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
