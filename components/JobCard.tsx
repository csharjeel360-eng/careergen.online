import Image from "next/image";
import Link from "next/link";
import { Job } from "@/data/jobs";

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-navy-800/10 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/jobs/${job.slug}`} className="relative block h-52 w-full overflow-hidden">
        <Image
          src={job.coverImage}
          alt={job.title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          unoptimized={job.coverImage.startsWith("http")}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-navy-900/85 px-2.5 py-1 text-xs font-semibold text-gold-400">
          {job.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs text-navy-800/50">
          {job.publishedDate} ・ by{" "}
          <span className="font-medium text-navy-800/70">{job.author.name}</span>
        </p>

        <h2 className="mb-2 font-serif text-lg font-bold leading-snug text-navy-900">
          <Link href={`/jobs/${job.slug}`} className="transition hover:text-gold-500">
            {job.title}
          </Link>
        </h2>

        <p className="mb-4 flex-1 text-sm leading-6 text-gray-600">{job.excerpt}</p>

        <Link
          href={`/jobs/${job.slug}`}
          className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-gold-500 transition hover:text-gold-400"
        >
          Read more
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
