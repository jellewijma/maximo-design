"use client";

/**
 * Header Component
 *
 * Main navigation header with logo and CTA buttons.
 * Based on the new design with minimal navigation.
 *
 * Features:
 * - Logo image (logo.svg) on left
 * - "Catalogus" text in center (on catalog page)
 * - Two CTA buttons on right: "CONTACT" (outline) and "BEKIJK CATALOGUS" (primary)
 * - Responsive design with mobile hamburger menu
 * - Transparent/minimal background
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 */

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui";

/**
 * Props for the Header component
 */
interface HeaderProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Main header component with navigation buttons
 */
export function Header({ className = "" }: HeaderProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if we're on the catalog page to show centered title
  const isCatalogPage = pathname?.includes("/catalogus");

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        bg-transparent
        ${className}
      `}
    >
      <div className="container-padding">
        <div className="flex items-center justify-between h-16 tablet:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="relative flex items-center"
            aria-label="Maximo Design - Home"
          >
            <Image
              src="/images/logo.svg"
              alt="Maximo Design"
              width={58}
              height={49}
              className="h-10 tablet:h-12 w-auto"
              priority
            />
          </Link>

          {/* Centered page title (visible on catalog page) */}
          {isCatalogPage && (
            <span className="hidden tablet:block text-sm font-medium uppercase tracking-wider text-foreground/80">
              {t("catalog")}
            </span>
          )}

          {/* Right side: CTA Buttons + Mobile menu */}
          <div className="flex items-center gap-3 tablet:gap-4">
            {/* Desktop navigation buttons */}
            <nav className="hidden tablet:flex items-center gap-3">
              <Button
                href="/contact"
                variant="secondary"
                size="sm"
                className="uppercase tracking-wider text-xs"
              >
                {t("contact")}
              </Button>
              <Button
                href="/catalogus"
                variant="primary"
                size="sm"
                className="uppercase tracking-wider text-xs"
              >
                {t("viewCatalog")}
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="tablet:hidden p-2 text-foreground"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav
          className="
            tablet:hidden
            bg-background/98 backdrop-blur-md
            border-t border-[#EFEFEF]
            animate-slideUp
          "
        >
          <div className="container-padding py-4 space-y-3">
            <Link
              href="/contact"
              className="
                block py-3 px-4
                text-lg font-medium text-center
                text-foreground/80 hover:text-foreground
                hover:bg-foreground/5 rounded
                border border-foreground/30
                transition-colors duration-200
              "
              onClick={closeMobileMenu}
            >
              {t("contact")}
            </Link>
            <Link
              href="/catalogus"
              className="
                block py-3 px-4
                text-lg font-medium text-center
                text-foreground bg-primary
                hover:bg-primary/90 rounded
                transition-colors duration-200
              "
              onClick={closeMobileMenu}
            >
              {t("viewCatalog")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
