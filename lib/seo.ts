import type { Metadata } from "next";

export const siteUrl = "https://careergen.online";
export const siteName = "careergen.online";
export const defaultDescription =
  "Discover trusted Germany job listings, career guides, salary insights, and application advice for international job seekers.";

export function buildPageMetadata({
  title,
  description = defaultDescription,
  path = "/",
  keywords = [],
  image = "/careergen-logo.svg",
  imageAlt,
  type = "website",
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  locale = "en_US",
  geoRegion = "DE",
  geoPlacename = "Germany",
  geoPosition = "51.1657;10.4515",
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  locale?: string;
  geoRegion?: string;
  geoPlacename?: string;
  geoPosition?: string;
}): Metadata {
  const pageTitle = title.includes("careergen") ? title : `${title} | ${siteName}`;
  const canonicalUrl = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();
  const metaDescription = description || defaultDescription;

  return {
    title: pageTitle,
    description: metaDescription,
    keywords: keywords.filter(Boolean),
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      generator: siteName,
      "application-name": siteName,
      "geo.region": geoRegion,
      "geo.placename": geoPlacename,
      "geo.position": geoPosition,
      ICBM: geoPosition,
    },
    openGraph: {
      title: ogTitle ?? pageTitle,
      description: ogDescription ?? metaDescription,
      url: canonicalUrl,
      siteName,
      type,
      locale,
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
      title: twitterTitle ?? pageTitle,
      description: twitterDescription ?? metaDescription,
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
