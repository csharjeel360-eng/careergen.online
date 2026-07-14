import Link from "next/link";

type CtaButton = {
  label: string;
  href: string;
};

type CtaButtonsProps = {
  buttons: CtaButton[];
};

export default function CtaButtons({ buttons }: CtaButtonsProps) {
  return (
    <div className="mb-6 mt-2 space-y-3">
      {buttons.map((button) => (
        <Link
          key={button.label}
          href={button.href}
          className="flex items-center justify-center rounded-sm bg-green-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-green-700"
        >
          {button.label}
        </Link>
      ))}
    </div>
  );
}
