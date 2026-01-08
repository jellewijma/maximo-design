/**
 * Root Layout
 *
 * This is the root layout that wraps all pages.
 * It sets up:
 * - HTML lang attribute
 * - Font loading (Montserrat from Google Fonts)
 * - Global styles
 *
 * Note: The actual content rendering happens in [locale]/layout.tsx
 * This layout handles the base HTML structure only.
 */

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/**
 * Montserrat font configuration
 * Used for all body text throughout the site
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * Default metadata for the site
 * This is overridden by locale-specific metadata
 */
export const metadata: Metadata = {
  title: "Maximo Design",
  description: "B2B bathroom faucets catalog",
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * Root layout component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${montserrat.variable} antialiased`}
        style={
          {
            "--font-abril-display": '"Abril Display", serif',
          } as React.CSSProperties
        }
        suppressHydrationWarning
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
