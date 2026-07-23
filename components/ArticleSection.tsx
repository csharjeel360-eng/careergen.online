import Image from "next/image";
import type { JobSection, JobInline } from "@/data/jobs";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "section";
}

function renderInlineText(value: JobInline) {
  if (typeof value === "string") {
    return value;
  }

  const content = value.text;
  const textNode = value.bold ? <strong>{content}</strong> : content;

  if (value.href) {
    return (
      <a
        href={value.href}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="font-medium text-navy-900 underline decoration-gold-500 underline-offset-4"
      >
        {value.text}
      </a>
    );
  }

  return value.text;
}

export default function ArticleSection({
  section,
  index,
  id,
}: {
  section: JobSection;
  index: number;
  id?: string;
}) {
  const anchorId = id ?? `${slugify(section.heading)}-${index + 1}`;

  return (
    <section id={anchorId} className="scroll-mt-24">
      <h2 id={anchorId} className="mb-4 font-serif text-xl font-bold leading-tight text-navy-900 sm:text-2xl">
        {section.heading}
      </h2>
      {section.subheading ? (
        <h3 className="mb-4 text-lg font-semibold text-navy-900">{section.subheading}</h3>
      ) : null}

      {section.paragraphs.map((paragraph, paragraphIndex) => (
        <p key={`${anchorId}-paragraph-${paragraphIndex}`} className="mb-4 text-[15px] leading-8 text-gray-700">
          {renderInlineText(paragraph)}
        </p>
      ))}

      {section.list && section.list.length > 0 ? (
        <ul className="mb-6 list-disc space-y-2 pl-5 text-[15px] leading-8 text-gray-700">
          {section.list.map((item, itemIndex) => (
            <li key={`${anchorId}-list-${itemIndex}`}>{renderInlineText(item)}</li>
          ))}
        </ul>
      ) : null}

      {section.table ? (
        <div className="mb-6 overflow-x-auto rounded-md border border-navy-800/10">
          <table className="min-w-full divide-y divide-navy-800/10 text-left text-sm">
            <thead className="bg-navy-900 text-white">
              <tr>
                {section.table.headers.map((header, headerIndex) => (
                  <th key={`${anchorId}-header-${headerIndex}`} className="whitespace-nowrap px-4 py-3 font-semibold">
                    {renderInlineText(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/10 bg-white">
              {section.table.rows.map((row, rowIndex) => (
                <tr key={`${anchorId}-row-${rowIndex}`} className={rowIndex % 2 === 0 ? "bg-white" : "bg-navy-800/5"}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${anchorId}-cell-${rowIndex}-${cellIndex}`} className="whitespace-normal px-4 py-3 text-gray-700">
                      {renderInlineText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {section.image ? (
        <div className="relative mb-6 h-56 w-full overflow-hidden rounded-md md:h-80">
          <Image
            src={section.image}
            alt={`Illustration for ${section.heading}`}
            fill
            sizes="100vw"
            unoptimized={section.image.startsWith("http")}
            className="object-cover"
          />
        </div>
      ) : null}
    </section>
  );
}
