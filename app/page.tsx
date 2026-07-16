import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { jobs } from "@/data/jobs";
import JobCard from "@/components/JobCard";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "careergen | Jobs, career guides, and application tips",
  description:
    "careergen helps international job seekers find trusted opportunities, career advice, and market insights for Japan and Germany.",
};

export default function HomePage({
  searchParams,
}: {
  searchParams?: { page?: string | string[]; query?: string | string[] };
}) {
  const [featured, ...allJobs] = jobs;
  const pageParam = searchParams?.page;
  const queryParam = searchParams?.query;
  const query = typeof queryParam === "string" ? queryParam : Array.isArray(queryParam) ? queryParam[0] : "";
  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const filteredJobs = normalizedQuery
    ? jobs.filter((job) => {
        const haystack = [
          job.title,
          job.category,
          job.excerpt,
          job.intro,
          job.author.name,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : jobs;
  const pageNumber = Number(Array.isArray(pageParam) ? pageParam[0] : pageParam || "1");
  const currentPage = Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
  const perPage = 11;
  const totalArticles = filteredJobs.length;
  const totalPages = Math.max(1, Math.ceil(totalArticles / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * perPage;
  const visibleArticles = filteredJobs.slice(startIndex, startIndex + perPage);
  const featuredArticle = visibleArticles[0];
  const listingArticles = visibleArticles.slice(1);

  const createPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (query) {
      params.set("query", query);
    }
    if (page > 1) {
      params.set("page", page.toString());
    }
    const queryString = params.toString();
    return queryString ? `/?${queryString}` : "/";
  };

  return (
    <div className="mx-auto max-w-content px-5 py-10">
      {visibleArticles.length === 0 ? (
        <section className="rounded-3xl border border-navy-800/10 bg-white p-8 text-center shadow-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-gold-500">No results</p>
          <h1 className="font-serif text-2xl font-bold text-navy-950 md:text-3xl">
            {query ? `No jobs found for “${query}”` : "No jobs available"}
          </h1>
          <p className="mt-4 text-sm leading-7 text-gray-600">
            Try another keyword or remove the search filter to see all openings.
          </p>
        </section>
      ) : (
        <>
          <section className="mb-14 grid gap-8 overflow-hidden rounded-lg border border-navy-800/10 bg-white shadow-sm md:grid-cols-2">
            <div className="relative h-64 md:h-full">
              <Image
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized={featuredArticle.coverImage.startsWith("http")}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              {normalizedQuery ? (
                <p className="mb-4 text-sm text-navy-800/60">
                  Showing results for <span className="font-semibold text-navy-900">“{query}”</span>
                </p>
              ) : null}
              <span className="mb-3 w-fit rounded-sm bg-gold-500/15 px-2.5 py-1 text-xs font-semibold text-gold-500">
                {featuredArticle.category}
              </span>
              <h1 className="mb-4 font-serif text-2xl font-bold leading-snug text-navy-900 md:text-3xl">
                <Link href={`/jobs/${featuredArticle.slug}`} className="transition hover:text-gold-500">
                  {featuredArticle.title}
                </Link>
              </h1>
              <p className="mb-5 text-sm leading-7 text-gray-600 md:text-base">
                {featuredArticle.excerpt}
              </p>
              <p className="mb-6 text-xs text-navy-800/50">
                {featuredArticle.publishedDate} ・ by{" "}
                <span className="font-medium text-navy-800/70">{featuredArticle.author.name}</span> ・{" "}
                {featuredArticle.readTime} read
              </p>
              <Link
                href={`/jobs/${featuredArticle.slug}`}
                className="inline-flex w-fit items-center gap-1 rounded-sm bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700"
              >
                Read more <span aria-hidden>→</span>
              </Link>
            </div>
          </section>

          <div className="grid gap-10 md:grid-cols-3">
            {/* Job listing */}
            <div id="jobs" className="md:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-navy-900">Latest job openings</h2>
                <span className="text-xs text-navy-800/40">{totalArticles} total</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {listingArticles.map((job) => (
                  <JobCard key={job.slug} job={job} />
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-navy-800/10 pt-4 text-sm text-navy-800/70">
                <span>
                  Showing {startIndex + 1}-{Math.min(startIndex + visibleArticles.length, totalArticles)} of {totalArticles} articles
                </span>
                <div className="flex items-center gap-2">
                  {safePage > 1 ? (
                    <Link href={createPageHref(safePage - 1)} className="rounded-sm border border-navy-800/10 px-3 py-2 transition hover:bg-navy-800/5">
                      ← Previous
                    </Link>
                  ) : (
                    <span className="cursor-not-allowed rounded-sm border border-navy-800/10 px-3 py-2 text-navy-800/40">
                      ← Previous
                    </span>
                  )}

                  {safePage < totalPages ? (
                    <Link href={createPageHref(safePage + 1)} className="rounded-sm border border-navy-800/10 px-3 py-2 transition hover:bg-navy-800/5">
                      Next →
                    </Link>
                  ) : (
                    <span className="cursor-not-allowed rounded-sm border border-navy-800/10 px-3 py-2 text-navy-800/40">
                      Next →
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Sidebar searchQuery={query} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
