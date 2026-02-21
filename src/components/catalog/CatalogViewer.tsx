"use client";

/**
 * Catalog Viewer Component
 *
 * A two-page book spread catalog viewer for desktop, single page on mobile.
 * Features:
 * - Two-page spread on desktop (image left, info right)
 * - Single page on mobile/tablet
 * - Centered pagination with < > arrows and "40/92" format
 * - Subtle page turn animation
 * - Keyboard navigation support
 *
 * @example
 * ```tsx
 * <CatalogViewer
 *   currentPage={1}
 *   totalPages={117}
 *   onPageChange={(page) => setCurrentPage(page)}
 *   categoryName="Gun Metal"
 *   categoryDescription="Gun metal offers a bold aesthetic..."
 * />
 * ```
 */

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { getPageImagePath, TOTAL_PAGES } from "@/lib/catalog-data";

/**
 * Props for the CatalogViewer component
 */
interface CatalogViewerProps {
  /** Current page number (1-117) */
  currentPage: number;
  /** Total number of pages */
  totalPages?: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Category name for the right page */
  categoryName?: string;
  /** Category description for the right page */
  categoryDescription?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Catalog viewer with two-page spread on desktop and centered pagination
 */
export function CatalogViewer({
  currentPage,
  totalPages = TOTAL_PAGES,
  onPageChange,
  categoryName,
  categoryDescription,
  className = "",
}: CatalogViewerProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right" | null
  >(null);

  /**
   * Navigate to the previous page
   */
  const goToPrevious = useCallback(() => {
    if (currentPage <= 1 || isAnimating) return;

    setAnimationDirection("left");
    setIsAnimating(true);
    onPageChange(currentPage - 1);
  }, [currentPage, isAnimating, onPageChange]);

  /**
   * Navigate to the next page
   */
  const goToNext = useCallback(() => {
    if (currentPage >= totalPages || isAnimating) return;

    setAnimationDirection("right");
    setIsAnimating(true);
    onPageChange(currentPage + 1);
  }, [currentPage, totalPages, isAnimating, onPageChange]);

  // Reset animation state after animation completes
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setAnimationDirection(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Two-page book spread on desktop, single page on mobile */}
      <div
        className={`
          relative
          bg-foreground/5 rounded-lg overflow-hidden
          border border-foreground/10
          transition-transform duration-300 ease-out
          ${isAnimating && animationDirection === "right" ? "translate-x-[-0.5%]" : ""}
          ${isAnimating && animationDirection === "left" ? "translate-x-[0.5%]" : ""}
        `}
      >
        {/* Book spread container */}
        <div className="flex flex-col desktop:flex-row">
          {/* Left page - Catalog image */}
          <div className="relative aspect-[4/3] tablet:aspect-[16/10] desktop:aspect-[4/3] desktop:flex-1">
            <Image
              src={getPageImagePath(currentPage)}
              alt={`Catalog page ${currentPage}`}
              fill
              className={`
                object-cover
                transition-opacity duration-300
                ${isAnimating ? "opacity-80" : "opacity-100"}
              `}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 50vw"
              priority={currentPage <= 3}
            />
          </div>

          {/* Right page - Category info (desktop only) */}
          <div className="hidden desktop:flex desktop:flex-1 bg-background aspect-[4/3] flex-col justify-center px-12 py-8">
            {categoryName && (
              <h2
                className="
                  text-3xl desktop:text-4xl
                  font-semibold mb-6
                  text-foreground
                  transition-all duration-300
                "
              >
                {categoryName}
              </h2>
            )}
            {categoryDescription && (
              <p
                className="
                  text-sm text-foreground/60
                  leading-relaxed
                  max-w-sm
                  transition-all duration-300
                "
              >
                {categoryDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Centered pagination controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        {/* Previous button */}
        <button
          onClick={goToPrevious}
          disabled={currentPage <= 1 || isAnimating}
          className={`
            p-2
            transition-all duration-200
            ${
              currentPage <= 1
                ? "text-foreground/20 cursor-not-allowed"
                : "text-foreground/60 hover:text-foreground"
            }
          `}
          aria-label="Previous page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Page counter: "40/92" format */}
        <span className="text-foreground/60 text-sm tabular-nums min-w-[60px] text-center">
          {currentPage}/{totalPages}
        </span>

        {/* Next button */}
        <button
          onClick={goToNext}
          disabled={currentPage >= totalPages || isAnimating}
          className={`
            p-2
            transition-all duration-200
            ${
              currentPage >= totalPages
                ? "text-foreground/20 cursor-not-allowed"
                : "text-foreground/60 hover:text-foreground"
            }
          `}
          aria-label="Next page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CatalogViewer;
