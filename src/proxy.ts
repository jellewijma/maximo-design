/**
 * Next.js Middleware for Internationalization
 *
 * Handles locale detection and routing for the multi-language site.
 * Redirects users to the appropriate locale-prefixed URL.
 */

import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/lib/i18n/config";
import { pathnames } from "@/lib/i18n/navigation";

/**
 * Create the internationalization middleware
 * This automatically handles:
 * - Detecting user's preferred language
 * - Redirecting to locale-prefixed URLs
 * - Setting the locale cookie
 * - Mapping pathnames to locale-specific URLs
 */
export default createMiddleware({
  locales,
  defaultLocale,
  pathnames,
  // Use prefix for all locales (e.g., /nl/..., /en/...)
  localePrefix: "always",
});

/**
 * Configure which paths the middleware should run on
 * Excludes static files, API routes, and Next.js internals
 */
export const config = {
  matcher: [
    // Match all pathnames except for:
    // - API routes (/api/...)
    // - Static files (/_next/static/..., /_next/image/..., /favicon.ico, etc.)
    // - Public files (/images/..., /fonts/..., etc.)
    "/((?!api|_next/static|_next/image|favicon.ico|images|fonts|.*\\..*).*)",
  ],
};
