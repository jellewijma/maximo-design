"use client";

/**
 * Catalog Viewer Component
 *
 * A catalog viewer showing pages in a book spread format.
 * Features:
 * - Two-page spread on desktop (like an open book)
 * - Single page on mobile/tablet
 * - Centered pagination with < > arrows and "40/92" format
 * - Subtle page turn animation
 * - Keyboard navigation support (arrow keys)
 *
 * @example
 * ```tsx
 * <CatalogViewer
 *   currentPage={1}
 *   totalPages={117}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 * ```
 */

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { getPageImagePath, getPageSpread, TOTAL_PAGES } from "@/lib/catalog-data";

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
  /** Additional CSS classes */
  className?: string;
}

/**
 * Catalog viewer with full-page display and centered pagination
 */
export function CatalogViewer({
  currentPage,
  totalPages = TOTAL_PAGES,
  onPageChange,
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

  // Get the page spread (left and right pages)
  const spread = getPageSpread(currentPage);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {/* Catalog page display */}
      <div
        className={`
          relative w-full max-w-full
          bg-foreground/5 rounded-lg overflow-hidden
          border border-foreground/10
          transition-transform duration-300 ease-out
          ${isAnimating && animationDirection === "right" ? "translate-x-[-0.5%]" : ""}
          ${isAnimating && animationDirection === "left" ? "translate-x-[0.5%]" : ""}
        `}
      >
        {/* Two-page spread on desktop, single page on mobile */}
        <div className="relative">
          {/* Mobile/Tablet: Single page view */}
          <div className="desktop:hidden relative aspect-[3/4] max-h-[calc(100vh-16rem)]">
            <Image
              src={getPageImagePath(currentPage)}
              alt={`Catalog page ${currentPage}`}
              fill
              className={`
                object-contain
                transition-opacity duration-300
                ${isAnimating ? "opacity-80" : "opacity-100"}
              `}
              sizes="100vw"
              priority={currentPage <= 3}
            />
          </div>

          {/* Desktop: Two-page spread */}
          <div className="hidden desktop:flex">
            {/* Left page */}
            {spread.left && (
              <div className="relative flex-1 aspect-[3/4] max-h-[calc(100vh-16rem)] border-r border-foreground/10">
                <Image
                  src={getPageImagePath(spread.left)}
                  alt={`Catalog page ${spread.left}`}
                  fill
                  className={`
                    object-contain
                    transition-opacity duration-300
                    ${isAnimating ? "opacity-80" : "opacity-100"}
                  `}
                  sizes="50vw"
                  priority={spread.left <= 3}
                />
              </div>
            )}
            {/* Empty left page for page 1 */}
            {!spread.left && (
              <div className="flex-1 aspect-[3/4] max-h-[calc(100vh-16rem)] bg-background/50" />
            )}

            {/* Right page */}
            {spread.right && (
              <div className="relative flex-1 aspect-[3/4] max-h-[calc(100vh-16rem)]">
                <Image
                  src={getPageImagePath(spread.right)}
                  alt={`Catalog page ${spread.right}`}
                  fill
                  className={`
                    object-contain
                    transition-opacity duration-300
                    ${isAnimating ? "opacity-80" : "opacity-100"}
                  `}
                  sizes="50vw"
                  priority={spread.right <= 3}
                />
              </div>
            )}
            {/* Empty right page for last page if odd */}
            {!spread.right && (
              <div className="flex-1 aspect-[3/4] max-h-[calc(100vh-16rem)] bg-background/50" />
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
