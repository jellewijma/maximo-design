"use client";

/**
 * Catalog Sidebar Component
 *
<<<<<<< HEAD
 * A sidebar navigation component for the catalog page.
 * Shows thumbnail previews of catalog pages for quick visual browsing.
 *
 * Features:
 * - Thumbnail previews of all catalog pages
 * - Visual indicator for current page
 * - Scrollable page list
 * - Clicking a thumbnail jumps to that page
=======
 * A vertical sidebar with minimal category markers for the catalog page.
 * Features a vertical line with horizontal tick marks for each category.
 *
 * Features:
 * - Vertical line with tick marks for each finish category
 * - Category label displayed next to active tick
 * - Clicking a category jumps to that section's first page
 * - Minimal, modern design matching the new aesthetic
>>>>>>> origin/laptop
 *
 * @example
 * ```tsx
 * <CatalogSidebar
<<<<<<< HEAD
 *   currentPage={5}
=======
 *   activeFilter="gunmetal"
 *   onFilterChange={(filter) => setActiveFilter(filter)}
>>>>>>> origin/laptop
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
<<<<<<< HEAD
 * Catalog sidebar with page thumbnail previews
=======
 * Catalog sidebar with vertical category markers
>>>>>>> origin/laptop
 */
export function CatalogSidebar({
  currentPage,
  onJumpToPage,
  className = "",
}: CatalogSidebarProps) {
  const t = useTranslations("catalog");

<<<<<<< HEAD
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
                    <div className="relative aspect-2/1 bg-foreground/5">
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
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-background/90 to-transparent p-2">
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
          {t("currentPage")}:{" "}
          <span className="font-semibold text-foreground">{currentPage}</span> /{" "}
          {TOTAL_PAGES}
        </p>
=======
  /**
   * Handle category marker click
   * Changes the active filter and jumps to the first page of that category
   */
  const handleCategoryClick = (filter: FinishType) => {
    onFilterChange(filter);
    const firstPage = getFirstPageForFinish(filter);
    onJumpToPage(firstPage);
  };

  return (
    <aside className={`relative ${className}`}>
      <div className="sticky top-24 flex flex-col h-[60vh]">
        {/* Vertical line with category markers */}
        <div className="relative flex flex-col justify-between h-full">
          {/* The vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px bg-foreground/20"
            aria-hidden="true"
          />

          {/* Category markers */}
          {catalogCategories.map((category) => {
            const isActive = activeFilter === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  relative flex items-center
                  transition-all duration-200
                  group
                  ${isActive ? "opacity-100" : "opacity-60 hover:opacity-100"}
                `}
                aria-label={`${t(`filters.${category.labelKey}`)} - Pages ${category.startPage}-${category.endPage}`}
              >
                {/* Horizontal tick mark */}
                <div
                  className={`
                    w-4 h-px
                    transition-all duration-200
                    ${isActive ? "bg-foreground" : "bg-foreground/40 group-hover:bg-foreground/70"}
                  `}
                />

                {/* Category label */}
                <span
                  className={`
                    ml-3 text-xs font-medium whitespace-nowrap
                    transition-all duration-200
                    ${isActive ? "text-foreground" : "text-foreground/50 group-hover:text-foreground/80"}
                  `}
                >
                  {t(`filters.${category.labelKey}`)}
                </span>
              </button>
            );
          })}
        </div>
>>>>>>> origin/laptop
      </div>
    </aside>
  );
}

export default CatalogSidebar;
