"use client";

/**
 * Category Info Panel Component
 *
 * A right-side panel displaying the current category name and description.
 * Shows information about the active finish/category in the catalog.
 *
 * Features:
 * - Large category name display
 * - Description text about the category
 * - Smooth transitions when category changes
 *
 * @example
 * ```tsx
 * <CategoryInfoPanel activeCategory="gunmetal" />
 * ```
 */

import { useTranslations, useLocale } from "next-intl";
import { catalogCategories, type FinishType } from "@/lib/catalog-data";

/**
 * Props for the CategoryInfoPanel component
 */
interface CategoryInfoPanelProps {
  /** Currently active category filter */
  activeCategory: FinishType;
  /** Additional CSS classes */
  className?: string;
}

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
 * Category info panel showing the active category name and description
 */
export function CategoryInfoPanel({
  activeCategory,
  className = "",
}: CategoryInfoPanelProps) {
  const t = useTranslations("catalog");
  const locale = useLocale();

  // Find the category data
  const category = catalogCategories.find((cat) => cat.id === activeCategory);

  // Get the display name based on locale
  const displayName =
    activeCategory === "all"
      ? t("filters.all")
      : locale === "nl"
        ? category?.nameNl
        : category?.nameEn;

  // Get the description based on locale
  const description =
    categoryDescriptions[activeCategory]?.[locale as "nl" | "en"] ||
    categoryDescriptions[activeCategory]?.en;

  return (
    <aside className={`${className}`}>
      <div className="sticky top-24">
        {/* Category Name */}
        <h2
          className="
            text-2xl tablet:text-3xl desktop:text-4xl
            font-semibold mb-4
            text-foreground
            transition-all duration-300
          "
        >
          {displayName}
        </h2>

        {/* Category Description */}
        <p
          className="
            text-sm text-foreground/60
            leading-relaxed
            max-w-xs
            transition-all duration-300
          "
        >
          {description}
        </p>
      </div>
    </aside>
  );
}

export default CategoryInfoPanel;
