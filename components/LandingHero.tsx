import Link from "next/link";

type LandingHeroProps = {
  title: string;
  subtitle: string;
  intro: string;
  ctaOptions: { label: string; href: string }[];
  featuredCta: {
    title: string;
    description: string;
    buttonLabel: string;
    href: string;
  };
};

export default function LandingHero({
  title,
  subtitle,
  intro,
  ctaOptions,
  featuredCta,
}: LandingHeroProps) {
  return (
    <section className="mb-8 rounded-md border border-navy-800/10 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex rounded-full border border-navy-800/10 bg-cream px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-800/70">
          Advertisement
        </span>
      </div>

      <h2 className="mt-4 font-serif text-2xl font-bold leading-snug text-navy-900 md:text-3xl">
        {title}
      </h2>

      <p className="mt-3 text-sm font-medium leading-7 text-gold-500">{subtitle}</p>
      <p className="mt-4 text-base leading-8 text-gray-700">{intro}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {ctaOptions.map((option) => (
          <Link
            key={option.label}
            href={option.href}
            className="inline-flex items-center rounded-full border border-navy-800/20 bg-white px-4 py-2 text-sm font-semibold text-navy-800 transition hover:border-gold-500 hover:text-gold-500"
          >
            {option.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-md border border-gold-500/30 bg-cream p-5 md:p-6">
        <h3 className="font-serif text-xl font-bold text-navy-900">{featuredCta.title}</h3>
        <p className="mt-2 text-sm leading-7 text-gray-700">{featuredCta.description}</p>
        <Link
          href={featuredCta.href}
          className="mt-4 inline-flex items-center rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gold-400"
        >
          {featuredCta.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
