import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { jobs, getJobBySlug, getArticleMetrics, type Job } from "@/data/jobs";
import Sidebar from "@/components/Sidebar";
import LandingHero from "@/components/LandingHero";
import BulletSection from "@/components/BulletSection";
import StepsSection from "@/components/StepsSection";
import FeatureGrid from "@/components/FeatureGrid";
import CtaButtons from "@/components/CtaButtons";
import RelatedPostsMini from "@/components/RelatedPostsMini";
import ArticleSection from "@/components/ArticleSection";
import FaqAccordion from "@/components/FaqAccordion";
import { buildPageMetadata, siteUrl } from "@/lib/seo";
import { buildSuggestedRelatedLinks } from "@/lib/relatedLinks";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61591903173398",
    icon: "f",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@sharjeelcoder82",
    icon: "T",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sharjeelcoder82/?hl=en",
    icon: "I",
  },
];

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const job = getJobBySlug(params.slug);
  if (!job) return {};

  return buildPageMetadata({
    title: job.seoTitle ?? job.metaTitle ?? job.title,
    description: job.metaDescription ?? job.excerpt,
    path: `/jobs/${job.slug}`,
    image: job.coverImage,
    imageAlt: job.coverImageAlt,
    type: "article",
    ogTitle: job.ogTitle ?? job.seoTitle ?? job.title,
    ogDescription: job.ogDescription ?? job.metaDescription ?? job.excerpt,
    twitterTitle: job.twitterTitle ?? job.seoTitle ?? job.title,
    twitterDescription: job.twitterDescription ?? job.metaDescription ?? job.excerpt,
    keywords: [job.primaryKeyword, ...(job.secondaryKeywords ?? []), ...(job.entityKeywords ?? [])].filter(Boolean) as string[],
  });
}

function getEditorialNote(job: Job) {
  if (job.editorialNote) {
    return job.editorialNote;
  }

  if (job.slug.includes("chancenkarte") || job.slug.includes("blue-card")) {
    return "This guide summarizes public guidance and the main decision points you should review before acting on a visa or salary move. Immigration outcomes still depend on your exact qualification, local authority, and paperwork.";
  }

  if (job.category === "Immigration Guide") {
    return "This guide is meant to give you a practical overview of the process and current public guidance; verify the latest requirements with the official source before acting on a visa or salary decision.";
  }

  return "This article is written from a practical editorial perspective and should be treated as a starting point rather than a substitute for employer-specific or official guidance.";
}

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = getJobBySlug(params.slug);
  if (!job) notFound();

  const isLandingTemplate = job.template === "landing";
  const related = jobs.filter((j) => j.slug !== job.slug);
  const relatedTopThree = related.slice(0, 3);
  const relatedJobs = related.slice(0, 8);
  const suggestedLinks = buildSuggestedRelatedLinks(job, jobs, 3);
  const sourceUrl = job.sourceUrl ?? job.careersPageLink;
  const lastVerified = job.lastVerified ?? job.updatedDate;
  const articleMetrics = getArticleMetrics(job);
  const articleReadTime = job.readingTime ?? job.readTime ?? articleMetrics.readingTime;
  const articleWordCount = job.wordCount ?? articleMetrics.wordCount;
  const hasFaqs = Boolean(job.faqs?.length);
  const hasHowTo = Boolean(job.howToSteps?.length || job.applySteps?.length);
  const hasComparisonTable = Boolean(job.comparisonTable?.length);
  const hasSectionList = Boolean(job.sections?.length);
  const contentModules = {
    showEditorialNote: job.contentModules?.showEditorialNote ?? Boolean(job.editorialNote),
    showSourceBox: job.contentModules?.showSourceBox ?? Boolean(sourceUrl),
    showCtaButtons: job.contentModules?.showCtaButtons ?? Boolean(job.ctaButtons?.length),
    showRelatedPosts: job.contentModules?.showRelatedPosts ?? true,
    showSalaryTable: job.contentModules?.showSalaryTable ?? Boolean(job.salaryTable?.length),
    showApplySteps: job.contentModules?.showApplySteps ?? Boolean(job.applySteps?.length),
    showAuthorBio: job.contentModules?.showAuthorBio ?? true,
    showApplyCta: job.contentModules?.showApplyCta ?? Boolean(job.careersPageLink),
  };
  const companyName =
    job.companyName ||
    job.title
      .replace(/:.*$/, "")
      .replace(/\s*(Careers|Career|Jobs|Guide|Role).*/i, "")
      .trim() ||
    "Employer listed in this guide";
  const jobLocation = /munich/i.test(job.title)
    ? "Munich, Germany"
    : /germany/i.test(job.title)
      ? "Germany"
      : "Remote / Germany";

  const authorAvatar = job.author.avatar?.includes("g%20picture.jpeg") || job.author.avatar?.includes("g picture.jpeg")
    ? "/g%20picture.jpeg"
    : job.author.avatar ?? "/g%20picture.jpeg";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: job.seoTitle ?? job.metaTitle ?? job.title,
    description: job.metaDescription ?? job.excerpt,
    image: new URL(job.coverImage, siteUrl).toString(),
    url: `${siteUrl}/jobs/${job.slug}`,
    inLanguage: "en-US",
    genre: job.category,
    about: [job.primaryKeyword, ...(job.secondaryKeywords ?? []), ...(job.entityKeywords ?? [])].filter(Boolean),
    author: {
      "@type": "Person",
      name: job.author.name,
      jobTitle: job.author.role,
      description: job.author.bio,
      image: new URL(authorAvatar, siteUrl).toString(),
      sameAs: ["https://web.facebook.com/profile.php?id=61591903173398", "https://www.instagram.com/sharjeelcoder82/?hl=en"],
      knowsAbout: [job.category, "Germany career guidance", "international job search"],
      additionalName: job.author.credentials,
    },
    publisher: {
      "@type": "Organization",
      name: "careergen.online",
      logo: `${siteUrl}/careergen-logo.svg`,
    },
    datePublished: job.publishedDate,
    dateModified: job.lastUpdated ?? job.updatedDate,
    mainEntityOfPage: `${siteUrl}/jobs/${job.slug}`,
    articleSection: job.category,
    keywords: [job.primaryKeyword, ...(job.secondaryKeywords ?? []), ...(job.entityKeywords ?? [])].filter(Boolean),
    wordCount: articleWordCount,
    timeRequired: `PT${articleMetrics.readingTime.replace(/\s|min read/gi, "")}M`,
    isAccessibleForFree: true,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: job.category, item: `${siteUrl}/jobs/${job.slug}` },
    ],
  };

  const faqSchema = hasFaqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: job.faqs?.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  const howToSchema = hasHowTo && job.howToSteps?.length
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: job.title,
        description: job.metaDescription ?? job.excerpt,
        step: job.howToSteps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step,
          text: step,
        })),
      }
    : null;

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.excerpt,
    hiringOrganization: {
      "@type": "Organization",
      name: companyName,
    },
    jobLocation: {
      "@type": "Place",
      name: jobLocation,
    },
    datePosted: job.publishedDate,
    validThrough: lastVerified || "2026-12-31",
    employmentType: "FULL_TIME",
    url: sourceUrl || `${siteUrl}/jobs/${job.slug}`,
  };

  return (
    <div className="mx-auto w-full max-w-content px-3 py-4 sm:px-6 lg:px-8 lg:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
      {howToSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} /> : null}
      {sourceUrl ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }} />
      ) : null}
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:gap-12">
        {/* Main article */}
        <article className="w-full min-w-0">
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-[11px] text-navy-800/50 sm:text-xs">
            <Link href="/" className="hover:text-gold-500">
              Home
            </Link>{" "}
            / <span className="text-navy-800/70">{job.category}</span>
          </nav>

          <span className="mb-3 inline-block rounded-sm bg-gold-500/15 px-2.5 py-1 text-xs font-semibold text-gold-500">
            {job.category}
          </span>

          <h1 className="mb-3 font-serif text-2xl font-bold leading-snug text-navy-900 sm:text-3xl md:text-4xl">
            {job.title}
          </h1>

          <p className="mb-6 text-[11px] leading-6 text-navy-800/50 sm:text-sm">
            Published {job.publishedDate} • Updated {job.lastUpdated ?? job.updatedDate} • by{" "}
            <span className="font-medium text-navy-800/70">{job.author.name}</span> ・{" "}
            {articleReadTime} read
          </p>

          <p className="mb-6 text-[15px] font-medium leading-7 text-gray-700 sm:leading-8">{job.intro}</p>

          {contentModules.showEditorialNote && (job.editorialNote || job.keyTakeaways?.length) ? (
            <div className="mb-8 rounded-md border border-navy-800/10 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-500">Editorial note</p>
              <p className="mt-2 text-sm leading-7 text-gray-700">{getEditorialNote(job)}</p>
              {job.keyTakeaways?.length ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
                  {job.keyTakeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          {contentModules.showSourceBox && sourceUrl ? (
            <div className="mb-8 rounded-md border border-gold-500/20 bg-gold-50 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">Source & verification</p>
              <p className="mt-2 text-sm leading-7 text-gray-700">
                This article references the official employer listing or company page and was last verified on {lastVerified}.
              </p>
              <a
                href={sourceUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="mt-3 inline-flex text-sm font-semibold text-navy-900 underline decoration-gold-500 underline-offset-4"
              >
                View the original source
              </a>
            </div>
          ) : null}

          <div className="relative mb-6 h-56 w-full overflow-hidden rounded-lg sm:h-72 md:h-80">
            <Image
              src={job.coverImage}
              alt={`Cover image for ${job.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              priority
              unoptimized={job.coverImage.startsWith("http")}
              className="object-cover"
            />
          </div>

          {contentModules.showCtaButtons ? <CtaButtons buttons={job.ctaButtons ?? []} /> : null}
          {contentModules.showRelatedPosts ? <RelatedPostsMini jobs={relatedTopThree} /> : null}

          {isLandingTemplate ? (
            <div>
              {job.landing && (
                <>
                  <LandingHero
                    title={job.title}
                    subtitle={job.landing.subtitle}
                    intro={job.intro}
                    ctaOptions={job.landing.ctaOptions}
                    featuredCta={job.landing.featuredCta}
                  />
                  <BulletSection
                    heading={job.landing.whyWorkHere.heading}
                    intro={job.landing.whyWorkHere.intro}
                    points={job.landing.whyWorkHere.points}
                  />
                  <BulletSection
                    heading={job.landing.prepareChecklist.heading}
                    intro={job.landing.prepareChecklist.intro}
                    points={job.landing.prepareChecklist.points}
                  />
                  <StepsSection steps={job.landing.steps} />
                  <div className="mb-8 rounded-md border border-navy-800/10 bg-white p-6 md:p-7">
                    <p className="text-sm leading-8 text-gray-700">{job.landing.expectationsNote}</p>
                  </div>
                  <FeatureGrid items={job.landing.whatYoullLearn} />
                  <div className="mb-8 rounded-md border border-navy-800/10 bg-white p-6 md:p-7">
                    <p className="text-sm leading-8 text-gray-700">{job.landing.closingNote}</p>
                  </div>
                </>
              )}
            </div>
          ) : (
              <div className="prose-content space-y-8">
              {hasSectionList
                ? job.sections.map((section, index) => <ArticleSection key={`${section.heading}-${index}`} section={section} index={index} />)
                : null}

              {contentModules.showSalaryTable && job.salaryTable?.length ? (
                <section id="salary-range" className="scroll-mt-24">
                  <h2 className="mb-4 font-serif text-xl font-bold text-navy-900">Salary range</h2>
                  <div className="mb-6 overflow-x-auto rounded-md border border-navy-800/10">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-navy-800 text-white">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Role</th>
                          <th className="px-4 py-3 font-semibold">Estimated pay</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.salaryTable.map((row, i) => (
                          <tr key={row.role} className={i % 2 === 0 ? "bg-white" : "bg-navy-800/5"}>
                            <td className="px-4 py-3 text-gray-700">{row.role}</td>
                            <td className="px-4 py-3 font-medium text-navy-900">{row.pay}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}

              {hasComparisonTable && job.comparisonTable?.length ? (
                <section id="comparison-table" className="scroll-mt-24">
                  <h2 className="mb-4 font-serif text-xl font-bold text-navy-900">Comparison</h2>
                  <div className="mb-6 overflow-x-auto rounded-md border border-navy-800/10">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-navy-800 text-white">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Option</th>
                          <th className="px-4 py-3 font-semibold">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.comparisonTable.map((row, i) => (
                          <tr key={row.role} className={i % 2 === 0 ? "bg-white" : "bg-navy-800/5"}>
                            <td className="px-4 py-3 text-gray-700">{row.role}</td>
                            <td className="px-4 py-3 font-medium text-navy-900">{row.pay}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}

              {contentModules.showApplySteps && job.applySteps?.length ? (
                <section id="application-steps" className="scroll-mt-24">
                  <h2 className="mb-4 font-serif text-xl font-bold text-navy-900">Application steps</h2>
                  <ol className="mb-6 space-y-3">
                    {job.applySteps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-6 text-gray-700">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {job.howToSteps?.length ? (
                <section id="how-to-steps" className="scroll-mt-24">
                  <h2 className="mb-4 font-serif text-xl font-bold text-navy-900">How to get started</h2>
                  <ol className="mb-6 space-y-3">
                    {job.howToSteps.map((step, i) => (
                      <li key={`${step}-${i}`} className="flex gap-3 text-sm leading-6 text-gray-700">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-xs font-bold text-gold-600">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {hasFaqs ? <FaqAccordion items={job.faqs ?? []} /> : null}
            </div>
          )}

          {/* Author bio */}
          {contentModules.showAuthorBio ? (
            <div className="mt-10 flex flex-col gap-4 rounded-md border border-navy-800/10 bg-white p-4 sm:flex-row sm:p-5">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full sm:h-16 sm:w-16">
                <Image
                  src={authorAvatar}
                  alt={`Portrait for ${job.author.name}`}
                  fill
                  sizes="64px"
                  unoptimized={authorAvatar.startsWith("http")}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-serif font-bold text-navy-900">{job.author.name}</p>
                <p className="mb-1 text-xs text-gold-500">{job.author.role}</p>
                <p className="text-sm leading-6 text-gray-600">{job.author.bio}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-navy-800/10 bg-gray-50 px-3 py-2 text-sm text-navy-800/80 transition hover:border-gold-500 hover:text-gold-500"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/15 text-xs font-bold text-gold-500">
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {/* Apply Now CTA */}
          {contentModules.showApplyCta && job.careersPageLink && (
            <div className="mt-10 rounded-lg border-2 border-gold-500 bg-gradient-to-r from-gold-50 to-white p-5 sm:p-6 md:p-8">
              <h3 className="mb-2 font-serif text-xl font-bold text-navy-900">Ready to apply?</h3>
              <p className="mb-4 text-gray-700">
                Visit the official careers page to explore current openings and submit your application.
              </p>
              <a
                href={job.careersPageLink}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-md bg-gold-500 px-6 py-3 text-center font-semibold text-navy-900 transition hover:bg-gold-400 sm:w-auto"
              >
                {job.careersPageLabel ?? "Apply Now →"}
              </a>
              {job.relatedArticle ? (
                <div className="mt-3">
                  <a
                    href={job.relatedArticle.href}
                    className="text-sm font-medium text-navy-800 underline decoration-gold-500 underline-offset-2"
                  >
                    {job.relatedArticle.text}
                  </a>
                </div>
              ) : null}
            </div>
          )}

          {/* Related posts */}
          <div className="mt-10">
            <h3 className="mb-4 font-serif text-lg font-bold text-navy-900">Related job openings</h3>
            <div className={`grid gap-3 sm:gap-4 ${isLandingTemplate ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
              {suggestedLinks.length
                ? suggestedLinks.map((link) => (
                    <Link
                      key={link.slug}
                      href={link.href}
                      className="group flex items-center gap-3 rounded-md border border-navy-800/10 bg-white p-3 transition hover:shadow-md"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={jobs.find((item) => item.slug === link.slug)?.coverImage ?? "/careergen-logo.svg"}
                          alt={`Cover image for ${link.title}`}
                          fill
                          sizes="56px"
                          unoptimized={false}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium leading-5 text-navy-800/80 transition group-hover:text-gold-500">
                        {link.title}
                      </span>
                    </Link>
                  ))
                : relatedJobs.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/jobs/${r.slug}`}
                      className="group flex items-center gap-3 rounded-md border border-navy-800/10 bg-white p-3 transition hover:shadow-md"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={r.coverImage}
                          alt={`Cover image for ${r.title}`}
                          fill
                          sizes="56px"
                          unoptimized={r.coverImage.startsWith("http")}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium leading-5 text-navy-800/80 transition group-hover:text-gold-500">
                        {r.title}
                      </span>
                    </Link>
                  ))}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <div className="w-full min-w-0 lg:sticky lg:top-6">
          <Sidebar excludeSlug={job.slug} />
        </div>
      </div>
    </div>
  );
}
