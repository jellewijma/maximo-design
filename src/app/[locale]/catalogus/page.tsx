/**
 * Catalog Page
 *
 * Displays the product catalog as browsable images with filtering.
 * Features:
 * - Left sidebar with filter categories (Gun Metal, Goud, Brons, etc.)
 * - Main area with two-panel catalog viewer showing current spread
 * - Page counter showing current position (X / 117)
 * - Previous/Next navigation
 * - Clicking filter jumps to that section's first page
 * - Subtle page turn animation
 *
 * This page uses client-side state for page navigation and filtering.
 */

import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n/config";
import { CatalogPageClient } from "./CatalogPageClient";

/**
 * Generate metadata for the catalog page
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });

  return {
    title: t("title"),
    description:
      locale === "nl"
        ? "Bekijk onze complete catalogus met kranen in Gun Metal, Goud, Brons, Chroom en Mat Zwart."
        : "Browse our complete catalog of faucets in Gun Metal, Gold, Bronze, Chrome and Matte Black.",
  };
}

/**
 * Props for the catalog page
 */
interface CatalogPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Catalog page server component
 * Wraps the client component with server-side locale setup
 */
export default async function CatalogPage({ params }: CatalogPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <CatalogPageClient />;
}
