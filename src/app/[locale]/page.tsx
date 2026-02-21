/**
 * Homepage
 *
 * The main landing page featuring:
 * - Hero section with brand title and tagline
 * - Description text
 * - Primary CTA button to view catalog
 *
 * This is a Server Component that uses next-intl for translations.
 */

import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components";
import type { Locale } from "@/lib/i18n/config";

/**
 * Props for the homepage
 */
interface HomePageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Homepage component
 */
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Hero />
    </>
  );
}
