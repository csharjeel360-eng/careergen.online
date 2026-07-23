import Link from "next/link";

type CtaButton = {
  label: string;
  href: string;
};

type CtaButtonsProps = {
  buttons: CtaButton[];
};

const genericButtonLabels = [
  "Browse Available Positions",
  "Learn How to Apply",
  "Review Job Requirements",
  "Explore More Helpful Guide",
  "Find Practical Steps-by-Step Advice",
  "Discover Useful Guidance for Everyday Needs",
];

export default function CtaButtons({ buttons }: CtaButtonsProps) {
  return (
    <div className="mb-6 mt-2 flex flex-col gap-3">
      {buttons.map((button, index) => {
        const label = button.label?.trim() ? button.label : genericButtonLabels[index] ?? "Learn more";

        return (
          <Link
            key={`${button.href}-${index}`}
            href={button.href}
            className="flex min-h-[44px] w-full items-center justify-center rounded-sm bg-green-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-green-700 sm:text-base"
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
