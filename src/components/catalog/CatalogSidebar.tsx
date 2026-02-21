"use client";

/**
 * Catalog Sidebar Component
 *
 * A vertical sidebar with minimal category markers for the catalog page.
 * Features a vertical line with horizontal tick marks for each category.
 *
 * Features:
 * - Vertical line with tick marks for each finish category
 * - Category label displayed next to active tick
 * - Clicking a category jumps to that section's first page
 * - Minimal, modern design matching the new aesthetic
 *
 * @example
 * ```tsx
 * <CatalogSidebar
 *   activeFilter="gunmetal"
 *   onFilterChange={(filter) => setActiveFilter(filter)}
 *   onJumpToPage={(page) => setCurrentPage(page)}
 * />
 * ```
 */

import { useTranslations } from "next-intl";
import {
  catalogCategories,
  type FinishType,
  getFirstPageForFinish,
} from "@/lib/catalog-data";

/**
 * Props for the CatalogSidebar component
 */
interface CatalogSidebarProps {
  /** Currently active filter */
  activeFilter: FinishType;
  /** Callback when filter changes */
  onFilterChange: (filter: FinishType) => void;
  /** Callback to jump to a specific page */
  onJumpToPage: (page: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Catalog sidebar with vertical category markers
 */
export function CatalogSidebar({
  activeFilter,
  onFilterChange,
  onJumpToPage,
  className = "",
}: CatalogSidebarProps) {
  const t = useTranslations("catalog");

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
      </div>
    </aside>
  );
}

export default CatalogSidebar;
