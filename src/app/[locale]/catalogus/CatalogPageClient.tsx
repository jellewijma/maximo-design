"use client";

/**
 * Catalog Page Client Component
 *
 * Client-side component for the catalog page that manages:
 * - Current page state
 * - Active filter state
 * - Page navigation
 * - Filter interactions
 *
 * New design features:
 * - Three-column layout: sidebar markers | main image | category info
 * - Vertical line markers for categories on left
 * - Large product image in center
 * - Category name and description on right
 * - Centered pagination below the image
 *
 * This component is wrapped by the server component for SSR/static generation.
 */

import { useState, useCallback, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CatalogViewer, CatalogSidebar } from "@/components/catalog";
import {
  TOTAL_PAGES,
  type FinishType,
  getPageCategory,
  catalogCategories,
} from "@/lib/catalog-data";

/**
 * Category descriptions for each finish type
 */
const categoryDescriptions: Record<FinishType, { nl: string; en: string }> = {
  all: {
    nl: "Bekijk ons volledige assortiment van hoogwaardige badkamerkranen in diverse afwerkingen.",
    en: "Browse our complete collection of premium bathroom faucets in various finishes.",
  },
  gunmetal: {
    nl: "Gun metal biedt een gedurfde, industriele uitstraling die perfect past bij moderne badkamerontwerpen.",
    en: "Gun metal offers a bold, industrial aesthetic that perfectly complements modern bathroom designs.",
  },
  gold: {
    nl: "Onze gouden afwerking voegt een vleugje luxe en elegantie toe aan elke badkamerruimte.",
    en: "Our gold finish adds a touch of luxury and elegance to any bathroom space.",
  },
  bronze: {
    nl: "Bronzen kranen brengen warmte en tijdloze schoonheid in uw badkamer.",
    en: "Bronze faucets bring warmth and timeless beauty to your bathroom.",
  },
  chrome: {
    nl: "Klassieke chromen afwerking die nooit uit de mode raakt en bij elk interieur past.",
    en: "Classic chrome finish that never goes out of style and complements any interior.",
  },
  matte_black: {
    nl: "Mat zwart maakt een statement met zijn strakke, hedendaagse uitstraling.",
    en: "Matte black makes a statement with its sleek, contemporary appearance.",
  },
};

/**
 * Props for the CatalogPageClient component
 */
interface CatalogPageClientProps {
  /** Initial page number (defaults to 1) */
  initialPage?: number;
  /** Initial filter (defaults to "all") */
  initialFilter?: FinishType;
}

/**
 * Catalog page client component with state management
 */
export function CatalogPageClient({
  initialPage = 1,
  initialFilter = "all",
}: CatalogPageClientProps) {
  const t = useTranslations("catalog");
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [activeFilter, setActiveFilter] = useState<FinishType>(initialFilter);

  // Get category display info
  const category = catalogCategories.find((cat) => cat.id === activeFilter);
  const categoryName =
    activeFilter === "all"
      ? t("filters.all")
      : locale === "nl"
        ? category?.nameNl
        : category?.nameEn;
  const categoryDescription =
    categoryDescriptions[activeFilter]?.[locale as "nl" | "en"] ||
    categoryDescriptions[activeFilter]?.en;

  /**
   * Update active filter based on current page
   * This keeps the sidebar in sync with manual page navigation
   */
  useEffect(() => {
    const pageCategory = getPageCategory(currentPage);
    if (pageCategory && pageCategory !== activeFilter) {
      setActiveFilter(pageCategory);
    }
    // If page is not in any category (intro/outro pages), keep current filter
  }, [currentPage, activeFilter]);

  /**
   * Handle page change from the catalog viewer
   */
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  /**
   * Handle filter change from the sidebar
   */
  const handleFilterChange = useCallback((filter: FinishType) => {
    setActiveFilter(filter);
  }, []);

  /**
   * Handle jump to a specific page
   */
  const handleJumpToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="pt-16 tablet:pt-20 min-h-screen flex flex-col">
      {/* Main Catalog Layout - Three columns on desktop */}
      <section className="flex-1 container-padding py-8 tablet:py-12">
        <div className="flex flex-col tablet:flex-row gap-6 tablet:gap-8 desktop:gap-12 h-full">
          {/* Left Sidebar - Category markers */}
          <CatalogSidebar
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            onJumpToPage={handleJumpToPage}
            className="hidden tablet:block w-24 desktop:w-32 shrink-0"
          />

          {/* Mobile filter dropdown */}
          <div className="tablet:hidden mb-4">
            <label
              htmlFor="mobile-filter"
              className="block text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wider"
            >
              {t("filters.title")}
            </label>
            <select
              id="mobile-filter"
              value={activeFilter}
              onChange={(e) => {
                const filter = e.target.value as FinishType;
                handleFilterChange(filter);
                handleJumpToPage(
                  filter === "all"
                    ? 1
                    : {
                        gunmetal: 6,
                        gold: 26,
                        bronze: 46,
                        chrome: 66,
                        matte_black: 86,
                      }[filter] || 1
                );
              }}
              className="
                w-full px-4 py-3 rounded
                bg-foreground/5 border border-foreground/10
                text-foreground text-sm
                focus:outline-none focus:ring-2 focus:ring-primary
                transition-colors duration-200
              "
            >
              <option value="all">{t("filters.all")}</option>
              <option value="gunmetal">{t("filters.gunmetal")}</option>
              <option value="gold">{t("filters.gold")}</option>
              <option value="bronze">{t("filters.bronze")}</option>
              <option value="chrome">{t("filters.chrome")}</option>
              <option value="matte_black">{t("filters.matte_black")}</option>
            </select>
          </div>

          {/* Center - Catalog Viewer (with integrated right panel on desktop) */}
          <div className="flex-1 min-w-0">
            <CatalogViewer
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              onPageChange={handlePageChange}
              categoryName={categoryName}
              categoryDescription={categoryDescription}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default CatalogPageClient;
