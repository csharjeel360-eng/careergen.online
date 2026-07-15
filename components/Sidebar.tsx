import Link from "next/link";
import { jobs, Job } from "@/data/jobs";

type SidebarProps = {
  excludeSlug?: string;
  searchQuery?: string;
};

export default function Sidebar({ excludeSlug, searchQuery }: SidebarProps) {
  const items: Job[] = jobs.filter((j) => j.slug !== excludeSlug);

  return (
    <aside className="space-y-8">
      <div className="rounded-md border border-navy-800/10 bg-white p-5">
        <h3 className="mb-4 font-serif text-base font-bold text-navy-900">Search</h3>
        <form method="get" action="/" className="flex overflow-hidden rounded-sm border border-navy-800/15">
          <input
            type="text"
            name="query"
            defaultValue={searchQuery}
            placeholder="Search jobs..."
            className="w-full px-3 py-2 text-sm outline-none"
          />
          <button type="submit" className="bg-navy-800 px-4 text-sm font-semibold text-white">
            Search
          </button>
        </form>
      </div>

      <div className="rounded-md border border-navy-800/10 bg-white p-5">
        <h3 className="mb-4 font-serif text-base font-bold text-navy-900">Recent jobs</h3>
        <ul className="space-y-4">
          {items.slice(0, 3).map((job) => (
            <li key={job.slug}>
              <Link
                href={`/jobs/${job.slug}`}
                className="text-sm font-medium leading-6 text-navy-800/80 transition hover:text-gold-500"
              >
                {job.title}
              </Link>
              <p className="mt-1 text-xs text-navy-800/40">{job.publishedDate}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-md border border-gold-500/30 bg-navy-900 p-5 text-cream">
        <h3 className="mb-2 font-serif text-base font-bold text-gold-400">Job alerts</h3>
        <p className="mb-4 text-xs leading-5 text-cream/70">
          Get the latest job openings as soon as they appear. Check the newest opportunities by category.
        </p>
        <Link
          href="/#jobs"
          className="inline-block rounded-sm bg-gold-500 px-4 py-2 text-xs font-semibold text-navy-950 transition hover:bg-gold-400"
        >
          View job list
        </Link>
      </div>
    </aside>
  );
}
