/**
 * Hero Section Component
 *
 * Main hero section for the homepage featuring:
 * - Two-column layout (text left, image right on desktop)
 * - Brand title "Maximo Design" in Abril Display font
 * - Tagline "Kranen met kwaliteit"
 * - Description text
 * - Primary CTA button "Bekijk catalogus" in electric blue (#2E00E5)
 * - Hero product image (hero-main.png)
 *
 * @example
 * ```tsx
 * <Hero />
 * ```
 */

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui";

/**
 * Props for the Hero component
 */
interface HeroProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Homepage hero section with two-column layout
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
            container-padding py-12 tablet:py-20
            order-2 tablet:order-1
            tablet:border-r border-[#EFEFEF]
          "
        >
          {/* Description - At Top */}
          <div className="max-w-xl">
            <p
              className="
                text-base tablet:text-lg text-foreground/70
                max-w-lg leading-relaxed
                animate-slideUp
              "
            >
              {t("description")}
            </p>
          </div>

          {/* Tagline and Brand Title - At Bottom */}
          <div className="mt-auto space-y-2">
            {/* Tagline */}
            <p
              className="
                text-xl tablet:text-2xl desktop:text-3xl font-light
                text-foreground/90
                animate-slideUp
              "
              style={{ animationDelay: "100ms" }}
            >
              {t("tagline")}
            </p>

            {/* Brand Title */}
            <h1
              className="
                font-display font-semibold text-5xl tablet:text-6xl desktop:text-7xl wide:text-8xl
                tracking-wide
                tablet:whitespace-nowrap
                animate-slideUp
              "
              style={{ animationDelay: "200ms" }}
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
          {/* Gradient overlay for text readability on mobile */}
          <div
            className="
              absolute inset-0
              bg-linear-to-b from-transparent via-transparent to-background/80
              tablet:bg-gradient-to-r tablet:from-background/40 tablet:via-transparent tablet:to-transparent
            "
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
