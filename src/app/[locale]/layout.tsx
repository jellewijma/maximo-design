/**
 * Locale Layout
 *
 * This layout wraps all pages within a specific locale.
 * It provides:
 * - Locale-specific metadata
 * - NextIntlClientProvider for translations
 * - Header component
 * - Main content area
 *
 * @param params.locale - The current locale (nl or en)
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n/config";
import { Header } from "@/components/layout";

/**
 * Generate static params for all supported locales
 * This enables static generation for each locale
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Generate metadata for the locale
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale as Locale;

  const titles: Record<Locale, string> = {
    nl: "Maximo Design - Kranen met kwaliteit",
    en: "Maximo Design - Quality Taps",
  };

  const descriptions: Record<Locale, string> = {
    nl: "B2B badkamerkranen catalogus. Bekijk ons assortiment en neem contact met ons op voor een offerte.",
    en: "B2B bathroom faucets catalog. Browse our collection and contact us for a quote.",
  };

  return {
    title: {
      default: titles[validLocale],
      template: "%s | Maximo Design",
    },
    description: descriptions[validLocale],
    openGraph: {
      title: titles[validLocale],
      description: descriptions[validLocale],
      locale: validLocale === "nl" ? "nl_NL" : "en_US",
      type: "website",
    },
  };
}

/**
 * Props for the locale layout
 */
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Locale layout component
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const validLocale = locale as Locale;

  // Validate locale
  if (!locales.includes(validLocale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="min-h-screen">{children}</main>
    </NextIntlClientProvider>
  );
}
