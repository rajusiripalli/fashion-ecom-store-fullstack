import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({
  items,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-2 text-sm"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.label}
            className="flex items-center gap-2"
          >
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-muted-foreground transition hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLast
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <FiChevronRight
                size={14}
                className="text-muted-foreground"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}