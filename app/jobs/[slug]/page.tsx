import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { jobs, getJobBySlug } from "@/data/jobs";
import Sidebar from "@/components/Sidebar";
import LandingHero from "@/components/LandingHero";
import BulletSection from "@/components/BulletSection";
import StepsSection from "@/components/StepsSection";
import FeatureGrid from "@/components/FeatureGrid";
import CtaButtons from "@/components/CtaButtons";
import RelatedPostsMini from "@/components/RelatedPostsMini";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const job = getJobBySlug(params.slug);
  if (!job) return {};
  return {
    title: `${job.title} | careergen`,
    description: job.excerpt,
  };
}

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = getJobBySlug(params.slug);
  if (!job) notFound();

  const isLandingTemplate = job.template === "landing";
  const related = jobs.filter((j) => j.slug !== job.slug);
  const relatedTopThree = related.slice(0, 3);
  const relatedJobs = related.slice(0, 8);

  return (
    <div className="mx-auto max-w-content px-5 py-10">
      <div className="grid gap-10 md:grid-cols-3">
        {/* Main article */}
        <article className="md:col-span-2">
          <nav className="mb-4 text-xs text-navy-800/50">
            <Link href="/" className="hover:text-gold-500">
              Home
            </Link>{" "}
            / <span className="text-navy-800/70">{job.category}</span>
          </nav>

          <span className="mb-3 inline-block rounded-sm bg-gold-500/15 px-2.5 py-1 text-xs font-semibold text-gold-500">
            {job.category}
          </span>

          <h1 className="mb-3 font-serif text-2xl font-bold leading-snug text-navy-900 md:text-4xl">
            {job.title}
          </h1>

          <p className="mb-6 text-xs text-navy-800/50">
            Published {job.publishedDate} • Updated {job.updatedDate} • by{" "}
            <span className="font-medium text-navy-800/70">{job.author.name}</span> ・{" "}
            {job.readTime} read
          </p>

          <p className="mb-6 text-[15px] font-medium leading-8 text-gray-700">{job.intro}</p>

          <CtaButtons buttons={job.ctaButtons ?? []} />
          <RelatedPostsMini jobs={relatedTopThree} />

          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-md md:h-96">
            <Image src={job.coverImage} alt={job.title} fill priority className="object-cover" />
          </div>

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
            <div className="prose-content">
              {job.sections.map((section) => (
                <div key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {section.list && (
                    <ul>
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.image && (
                    <div className="relative mb-6 h-56 w-full overflow-hidden rounded-md md:h-80">
                      <Image src={section.image} alt={section.heading} fill className="object-cover" />
                    </div>
                  )}
                </div>
              ))}

              <h2>Salary range</h2>
              <div className="mb-6 overflow-x-auto rounded-md border border-navy-800/10">
                <table className="min-w-[540px] w-full text-left text-sm">
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

              <h2>Application steps</h2>
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
            </div>
          )}

          {/* Author bio */}
          <div className="mt-10 flex gap-4 rounded-md border border-navy-800/10 bg-white p-5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Image src={job.author.avatar} alt={job.author.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-serif font-bold text-navy-900">{job.author.name}</p>
              <p className="mb-1 text-xs text-gold-500">{job.author.role}</p>
              <p className="text-sm leading-6 text-gray-600">{job.author.bio}</p>
            </div>
          </div>

          {/* Apply Now CTA */}
          {job.careersPageLink && (
            <div className="mt-10 rounded-lg border-2 border-gold-500 bg-gradient-to-r from-gold-50 to-white p-8">
              <h3 className="mb-2 font-serif text-xl font-bold text-navy-900">Ready to apply?</h3>
              <p className="mb-4 text-gray-700">
                Visit the official careers page to explore current openings and submit your application.
              </p>
              <a
                href={job.careersPageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-md bg-gold-500 px-6 py-3 font-semibold text-navy-900 transition hover:bg-gold-400"
              >
                Apply Now →
              </a>
            </div>
          )}

          {/* Related posts */}
          <div className="mt-10">
            <h3 className="mb-4 font-serif text-lg font-bold text-navy-900">Related job openings</h3>
            <div className={`grid gap-4 ${isLandingTemplate ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
              {relatedJobs.map((r) => (
                <Link
                  key={r.slug}
                  href={`/jobs/${r.slug}`}
                  className="group flex items-center gap-3 rounded-md border border-navy-800/10 bg-white p-3 transition hover:shadow-md"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm">
                    <Image src={r.coverImage} alt={r.title} fill className="object-cover" />
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
        <div>
          <Sidebar excludeSlug={job.slug} />
        </div>
      </div>
    </div>
  );
}
