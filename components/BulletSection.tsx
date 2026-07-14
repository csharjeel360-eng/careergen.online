type BulletSectionProps = {
  heading: string;
  intro: string;
  points: string[];
};

export default function BulletSection({ heading, intro, points }: BulletSectionProps) {
  return (
    <section className="mb-8 rounded-md border border-navy-800/10 bg-white p-6 md:p-7">
      <h2 className="font-serif text-xl font-bold text-navy-900">{heading}</h2>
      <p className="mt-3 text-sm leading-7 text-gray-700">{intro}</p>

      <ul className="mt-5 space-y-3">
        {points.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-sm font-bold text-gold-500">
              ✓
            </span>
            <span className="text-sm leading-7 text-gray-700">{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
