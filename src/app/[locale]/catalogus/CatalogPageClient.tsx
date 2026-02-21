"use client";

/**
 * Catalog Page Client Component
 *
 * Client-side component for the catalog page that manages:
 * - Current page state
 * - Page navigation
 *
 * Layout features:
 * - Two-column layout: sidebar page navigator | main catalog viewer
 * - Page list on left with clickable page numbers
 * - Large product catalog viewer in center
 * - Centered pagination below the catalog
 *
 * This component is wrapped by the server component for SSR/static generation.
 */

import { useState, useCallback } from "react";
import { CatalogViewer, CatalogSidebar } from "@/components/catalog";
import { TOTAL_PAGES } from "@/lib/catalog-data";

/**
 * Props for the CatalogPageClient component
 */
interface CatalogPageClientProps {
  /** Initial page number (defaults to 1) */
  initialPage?: number;
}

/**
 * Catalog page client component with state management
 */
export function CatalogPageClient({ initialPage = 1 }: CatalogPageClientProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  /**
   * Handle page change from the catalog viewer
   */
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  /**
   * Handle jump to a specific page
   */
  const handleJumpToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="pt-16 tablet:pt-20 min-h-screen flex flex-col">
      {/* Main Catalog Layout - Two columns on desktop */}
      <section className="flex-1 container-padding py-8 tablet:py-12">
        <div className="flex flex-col tablet:flex-row gap-6 tablet:gap-8 desktop:gap-12 max-w-full">
          {/* Left Sidebar - Page navigator (desktop only) */}
          <CatalogSidebar
            currentPage={currentPage}
            onJumpToPage={handleJumpToPage}
            className="hidden tablet:block w-48 desktop:w-56 shrink-0"
          />

          {/* Catalog Viewer */}
          <div className="flex-1 min-w-0 max-w-full">
            <CatalogViewer
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default CatalogPageClient;
