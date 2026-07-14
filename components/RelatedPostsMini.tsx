import Image from "next/image";
import Link from "next/link";

import type { Job } from "@/data/jobs";

type RelatedPostsMiniProps = {
  jobs: Job[];
};

export default function RelatedPostsMini({ jobs }: RelatedPostsMiniProps) {
  return (
    <div className="mb-8 rounded-sm border border-navy-800/10 bg-gray-50 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-navy-800/70">
        RELATED POSTS
      </p>
      <div className="mt-2 border-b border-navy-800/10" />

      <div className="mt-4 space-y-2">
        {jobs.slice(0, 3).map((job) => (
          <Link
            key={job.slug}
            href={`/jobs/${job.slug}`}
            className="flex items-center justify-between gap-3 rounded-sm border border-navy-800/10 bg-white px-3 py-3 transition hover:border-gold-500 hover:bg-cream"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm">
                <Image src={job.coverImage} alt={job.title} fill className="object-cover" />
              </div>
              <span className="line-clamp-2 text-sm font-semibold leading-5 text-navy-800">
                {job.title}
              </span>
            </div>
            <span className="shrink-0 text-lg text-navy-800/70">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
