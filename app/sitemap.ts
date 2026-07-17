import type { MetadataRoute } from "next";
import { jobs } from "@/data/jobs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://careergen.online";
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
  ];

  const staticEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const jobEntries = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...jobEntries];
}
