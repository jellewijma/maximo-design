/**
 * Hero Section Component
 *
 * Main hero section for the homepage featuring:
 * - Two-column layout (text left, image right on desktop)
 * - Description/lorem ipsum text at TOP of left column
 * - Tagline "Kranen met kwaliteit" below description
 * - Brand title "Maximo Design" at BOTTOM of left column (in Abril Display font)
 * - Hero product image on the right
 * - No CTA button (moved to header)
 *
 * @example
 * ```tsx
 * <Hero />
 * ```
 */

import { useTranslations } from "next-intl";
import Image from "next/image";

/**
 * Props for the Hero component
 */
interface HeroProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Homepage hero section with two-column layout
 * New design: Description at top, brand title at bottom
 */
export function Hero({ className = "" }: HeroProps) {
  const t = useTranslations("home");

  return (
    <section
      className={`
        relative min-h-screen
        pt-16 tablet:pt-20
        ${className}
      `}
    >
      {/* Two-column layout container */}
      <div className="h-full min-h-[calc(100vh-4rem)] tablet:min-h-[calc(100vh-5rem)] flex flex-col tablet:flex-row">
        {/* Left column - Text content */}
        <div
          className="
            flex-1 flex flex-col justify-between
            container-padding py-12 tablet:py-16 desktop:py-20
            order-2 tablet:order-1
            tablet:border-r border-[#EFEFEF]
          "
        >
          {/* Top section: Description */}
          <div
            className="max-w-lg animate-slideUp"
            style={{ animationDelay: "100ms" }}
          >
            <p
              className="
                text-sm tablet:text-base text-foreground/70
                leading-relaxed
              "
            >
              {t("description")}
            </p>
          </div>

          {/* Bottom section: Tagline and Brand Title */}
          <div className="mt-auto">
            {/* Tagline */}
            <p
              className="
                text-base tablet:text-lg desktop:text-xl font-light
                mb-2 tablet:mb-3 text-foreground/80
                animate-slideUp
              "
              style={{ animationDelay: "200ms" }}
            >
              {t("tagline")}
            </p>

            {/* Brand Title */}
            <h1
              className="
                font-display text-4xl tablet:text-5xl desktop:text-6xl wide:text-7xl
                tracking-wide
                animate-slideUp
              "
              style={{ animationDelay: "300ms" }}
            >
              {t("brandName")}
            </h1>
          </div>
        </div>

        {/* Right column - Hero Image */}
        <div
          className="
            relative w-full tablet:w-1/2
            h-[50vh] tablet:h-auto
            order-1 tablet:order-2
            animate-fadeIn
          "
        >
          <Image
            src="/images/hero/hero-main.png"
            alt="Maximo Design premium bathroom faucets"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
          />
          {/* Subtle gradient overlay for depth */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-b from-transparent via-transparent to-background/60
              tablet:bg-gradient-to-r tablet:from-background/20 tablet:via-transparent tablet:to-transparent
            "
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
