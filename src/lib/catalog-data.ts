/**
 * Catalog Data Module
 *
 * This module contains the catalog page data and category groupings.
 * The catalog consists of 117 pages organized by product finish.
 *
 * File naming convention:
 * - Page 1: Maximo-magazine-zonder-prijzen-17juli.jpg
 * - Pages 2-117: Maximo-magazine-zonder-prijzen-17juli{N}.jpg
 *
 * Category organization is based on typical faucet catalog structure:
 * - Introduction/Index pages at the start
 * - Products grouped by finish type
 */

/**
 * Finish type identifiers used for filtering
 */
export type FinishType =
  | "all"
  | "gunmetal"
  | "gold"
  | "bronze"
  | "chrome"
  | "matte_black";

/**
 * Represents a single catalog page
 */
export interface CatalogPage {
  /** Page number (1-117) */
  pageNumber: number;
  /** Image filename */
  filename: string;
  /** Full path to the image */
  imagePath: string;
  /** The finish category this page belongs to (if applicable) */
  category?: FinishType;
}

/**
 * Represents a category/section of the catalog
 */
export interface CatalogCategory {
  /** Unique identifier for the category */
  id: FinishType;
  /** Translation key for the category name */
  labelKey: string;
  /** Starting page number (inclusive) */
  startPage: number;
  /** Ending page number (inclusive) */
  endPage: number;
  /** Display name for Dutch locale */
  nameNl: string;
  /** Display name for English locale */
  nameEn: string;
}

/**
 * Total number of pages in the catalog
 */
export const TOTAL_PAGES = 117;

/**
 * Base path for catalog images
 */
export const CATALOG_IMAGE_BASE_PATH = "/images/catalog";

/**
 * Generates the filename for a given page number
 * @param pageNumber - The page number (1-117)
 * @returns The filename for that page
 */
export function getPageFilename(pageNumber: number): string {
  if (pageNumber < 1 || pageNumber > TOTAL_PAGES) {
    throw new Error(
      `Invalid page number: ${pageNumber}. Must be between 1 and ${TOTAL_PAGES}`
    );
  }

  // First page has no number suffix
  if (pageNumber === 1) {
    return "Maximo-magazine-zonder-prijzen-17juli.jpg";
  }

  return `Maximo-magazine-zonder-prijzen-17juli${pageNumber}.jpg`;
}

/**
 * Generates the full image path for a given page number
 * @param pageNumber - The page number (1-117)
 * @returns The full path to the image
 */
export function getPageImagePath(pageNumber: number): string {
  return `${CATALOG_IMAGE_BASE_PATH}/${getPageFilename(pageNumber)}`;
}

/**
 * Catalog categories with their page ranges
 *
 * Note: These page ranges are estimated based on typical catalog structure.
 * Adjust as needed based on actual catalog content.
 *
 * Typical catalog structure:
 * - Pages 1-5: Cover, Index, Introduction
 * - Pages 6-25: Gun Metal collection
 * - Pages 26-45: Gold/Brass collection
 * - Pages 46-65: Bronze collection
 * - Pages 66-85: Chrome collection
 * - Pages 86-105: Matte Black collection
 * - Pages 106-117: Accessories, Technical specs, Back matter
 */
export const catalogCategories: CatalogCategory[] = [
  {
    id: "gunmetal",
    labelKey: "gunmetal",
    startPage: 6,
    endPage: 25,
    nameNl: "Gun Metal",
    nameEn: "Gun Metal",
  },
  {
    id: "gold",
    labelKey: "gold",
    startPage: 26,
    endPage: 45,
    nameNl: "Goud",
    nameEn: "Gold",
  },
  {
    id: "bronze",
    labelKey: "bronze",
    startPage: 46,
    endPage: 65,
    nameNl: "Brons",
    nameEn: "Bronze",
  },
  {
    id: "chrome",
    labelKey: "chrome",
    startPage: 66,
    endPage: 85,
    nameNl: "Chroom",
    nameEn: "Chrome",
  },
  {
    id: "matte_black",
    labelKey: "matte_black",
    startPage: 86,
    endPage: 105,
    nameNl: "Mat Zwart",
    nameEn: "Matte Black",
  },
];

/**
 * Determines which category a page belongs to
 * @param pageNumber - The page number to check
 * @returns The finish type category, or undefined if not in a category
 */
export function getPageCategory(pageNumber: number): FinishType | undefined {
  const category = catalogCategories.find(
    (cat) => pageNumber >= cat.startPage && pageNumber <= cat.endPage
  );
  return category?.id;
}

/**
 * Generates an array of all catalog pages
 */
export const catalogPages: CatalogPage[] = Array.from(
  { length: TOTAL_PAGES },
  (_, index) => {
    const pageNumber = index + 1;
    return {
      pageNumber,
      filename: getPageFilename(pageNumber),
      imagePath: getPageImagePath(pageNumber),
      category: getPageCategory(pageNumber),
    };
  }
);

/**
 * Gets pages filtered by a specific finish type
 * @param finishType - The finish type to filter by ("all" returns all pages)
 * @returns Array of catalog pages matching the filter
 */
export function getPagesByFinish(finishType: FinishType): CatalogPage[] {
  if (finishType === "all") {
    return catalogPages;
  }

  const category = catalogCategories.find((cat) => cat.id === finishType);
  if (!category) {
    return catalogPages;
  }

  return catalogPages.filter(
    (page) =>
      page.pageNumber >= category.startPage &&
      page.pageNumber <= category.endPage
  );
}

/**
 * Gets the first page number for a given finish type
 * @param finishType - The finish type
 * @returns The first page number for that category, or 1 if not found
 */
export function getFirstPageForFinish(finishType: FinishType): number {
  if (finishType === "all") {
    return 1;
  }

  const category = catalogCategories.find((cat) => cat.id === finishType);
  return category?.startPage ?? 1;
}

/**
 * Gets the category that contains a specific page
 * @param pageNumber - The page number to look up
 * @returns The category containing the page, or undefined
 */
export function getCategoryForPage(
  pageNumber: number
): CatalogCategory | undefined {
  return catalogCategories.find(
    (cat) => pageNumber >= cat.startPage && pageNumber <= cat.endPage
  );
}

/**
 * Validates a page number
 * @param pageNumber - The page number to validate
 * @returns True if the page number is valid
 */
export function isValidPageNumber(pageNumber: number): boolean {
  return (
    Number.isInteger(pageNumber) && pageNumber >= 1 && pageNumber <= TOTAL_PAGES
  );
}

/**
 * Gets a page spread (left and right pages) for the catalog viewer
 * In a typical book/magazine spread:
 * - Even pages are on the left
 * - Odd pages are on the right
 *
 * @param currentPage - The current page being viewed
 * @returns Object with left and right page numbers (null if outside spread)
 */
export function getPageSpread(currentPage: number): {
  left: number | null;
  right: number | null;
} {
  // For a proper book spread view:
  // - Page 1 (cover) is shown alone on the right
  // - Pages 2-3 form a spread (2 left, 3 right)
  // - Pages 4-5 form a spread (4 left, 5 right)
  // etc.

  if (currentPage === 1) {
    return { left: null, right: 1 };
  }

  // For page 2 onwards, show as spreads
  // Adjust to show even pages on left, odd on right
  const leftPage = currentPage % 2 === 0 ? currentPage : currentPage - 1;
  const rightPage = leftPage + 1;

  return {
    left: leftPage,
    right: rightPage <= TOTAL_PAGES ? rightPage : null,
  };
}

/**
 * Default export for easy importing
 */
const catalogData = {
  TOTAL_PAGES,
  CATALOG_IMAGE_BASE_PATH,
  catalogCategories,
  catalogPages,
  getPageFilename,
  getPageImagePath,
  getPagesByFinish,
  getFirstPageForFinish,
  getCategoryForPage,
  isValidPageNumber,
  getPageSpread,
};

export default catalogData;
