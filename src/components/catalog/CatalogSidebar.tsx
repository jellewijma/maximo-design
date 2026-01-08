"use client";

/**
 * Catalog Sidebar Component
 *
 * A sidebar navigation component for the catalog page.
 * Shows thumbnail previews of catalog pages for quick visual browsing.
 *
 * Features:
 * - Thumbnail previews of all catalog pages
 * - Visual indicator for current page
 * - Scrollable page list
 * - Clicking a thumbnail jumps to that page
 *
 * @example
 * ```tsx
 * <CatalogSidebar
 *   currentPage={5}
 *   onJumpToPage={(page) => setCurrentPage(page)}
 * />
 * ```
 */

import { useTranslations } from "next-intl";
import Image from "next/image";
import { TOTAL_PAGES, getPageImagePath } from "@/lib/catalog-data";

/**
 * Props for the CatalogSidebar component
 */
interface CatalogSidebarProps {
  /** Currently active page */
  currentPage: number;
  /** Callback to jump to a specific page */
  onJumpToPage: (page: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Catalog sidebar with page thumbnail previews
 */
export function CatalogSidebar({
  currentPage,
  onJumpToPage,
  className = "",
}: CatalogSidebarProps) {
  const t = useTranslations("catalog");

  // Generate array of page pairs (1-2, 3-4, 5-6, etc.)
  const pagePairs: Array<{ start: number; end: number }> = [];
  for (let i = 1; i <= TOTAL_PAGES; i += 2) {
    pagePairs.push({
      start: i,
      end: Math.min(i + 1, TOTAL_PAGES),
    });
  }

  return (
    <aside className={`w-full border-r border-foreground/10 pr-4 ${className}`}>
      <div className="sticky top-24">
        {/* Sidebar title */}
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          {t("pages")}
        </h2>

        {/* Page thumbnails - scrollable */}
        <div className="max-h-[calc(100vh-20rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-foreground/20 scrollbar-track-transparent">
          <ul className="space-y-3">
            {pagePairs.map((pair) => {
              const isActive =
                currentPage >= pair.start && currentPage <= pair.end;
              return (
                <li key={`${pair.start}-${pair.end}`}>
                  <button
                    onClick={() => onJumpToPage(pair.start)}
                    className={`
                      w-full group relative rounded overflow-hidden
                      transition-all duration-200
                      ${
                        isActive
                          ? "ring-2 ring-primary shadow-lg scale-105"
                          : "hover:ring-2 hover:ring-foreground/30 hover:scale-102"
                      }
                    `}
                    aria-label={`${t("goToPage")} ${pair.start}-${pair.end}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* Thumbnail grid - show both pages side by side */}
                    <div className="relative aspect-[2/1] bg-foreground/5">
                      <div className="absolute inset-0 flex">
                        {/* First page of the pair */}
                        <div className="relative flex-1">
                          <Image
                            src={getPageImagePath(pair.start)}
                            alt={`Page ${pair.start}`}
                            fill
                            className="object-cover"
                            sizes="150px"
                            quality={75}
                          />
                        </div>
                        {/* Second page of the pair (if exists) */}
                        {pair.end !== pair.start && (
                          <div className="relative flex-1 border-l border-foreground/10">
                            <Image
                              src={getPageImagePath(pair.end)}
                              alt={`Page ${pair.end}`}
                              fill
                              className="object-cover"
                              sizes="150px"
                              quality={75}
                            />
                          </div>
                        )}
                      </div>

                      {/* Page numbers overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2">
                        <span className="text-xs font-medium text-foreground">
                          {pair.start}-{pair.end}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Current page indicator */}
        <p className="mt-4 text-sm text-foreground/70">
          {t("currentPage")}: <span className="font-semibold text-foreground">{currentPage}</span> / {TOTAL_PAGES}
        </p>
      </div>
    </aside>
  );
}

export default CatalogSidebar;
