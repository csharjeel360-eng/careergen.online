import type { Job } from "@/data/jobs";

function normalize(value: string) {
  return value.toLowerCase().trim();
}

export function buildSuggestedRelatedLinks(job: Job, allJobs: Job[], limit = 3) {
  const currentKeywords = [
    ...(job.entityKeywords ?? []),
    ...(job.primaryKeyword ? [job.primaryKeyword] : []),
    ...(job.secondaryKeywords ?? []),
  ].map(normalize);

  const scored = allJobs
    .filter((candidate) => candidate.slug !== job.slug)
    .map((candidate) => {
      const candidateKeywords = [
        ...(candidate.entityKeywords ?? []),
        ...(candidate.primaryKeyword ? [candidate.primaryKeyword] : []),
        ...(candidate.secondaryKeywords ?? []),
      ].map(normalize);

      const overlap = currentKeywords.filter((keyword) => candidateKeywords.includes(keyword)).length;
      const sharedCategory = candidate.category === job.category ? 1 : 0;
      const score = overlap + sharedCategory;

      return { candidate, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((entry) => ({
    slug: entry.candidate.slug,
    title: entry.candidate.title,
    href: `/jobs/${entry.candidate.slug}`,
  }));
}
