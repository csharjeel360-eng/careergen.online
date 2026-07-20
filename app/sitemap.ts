import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { jobs } from "@/data/jobs";

const staticPages = [
  "",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-use",
];

function parseLastModified(dateString: string) {
  const date = new Date(dateString);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const jobEntries = jobs.map((job) => ({
    url: `${siteUrl}/jobs/${job.slug}`,
    lastModified: parseLastModified(job.updatedDate ?? job.publishedDate),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...jobEntries];
}
