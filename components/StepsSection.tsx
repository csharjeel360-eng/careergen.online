type StepItem = {
  title: string;
  description: string;
};

type StepsSectionProps = {
  steps: StepItem[];
};

export default function StepsSection({ steps }: StepsSectionProps) {
  return (
    <section className="mb-8 rounded-md border border-navy-800/10 bg-white p-6 md:p-7">
      <h2 className="font-serif text-xl font-bold text-navy-900">Get Started in 3 Steps</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-md border border-navy-800/10 bg-cream p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-800 text-lg font-bold text-white">
                {index + 1}
              </span>
              <h3 className="font-serif text-lg font-bold text-navy-900">{step.title}</h3>
            </div>
            <p className="mt-4 text-sm leading-7 text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
