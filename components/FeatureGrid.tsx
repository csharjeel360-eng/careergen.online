type FeatureItem = {
  title: string;
  description: string;
};

type FeatureGridProps = {
  items: FeatureItem[];
};

export default function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <section className="mb-8 grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-md border border-navy-800/10 bg-white p-5">
          <h3 className="font-serif text-lg font-bold text-navy-900">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-gray-700">{item.description}</p>
        </div>
      ))}
    </section>
  );
}
