/**
 * Contact Page
 *
 * Displays contact information for quote requests.
 * New design features:
 * - Two-column layout (text left, photo right)
 * - Left column: "Contact" title, message with bold keywords, email
 * - Right column: Large photo of person
 * - Clean, minimal design without CTA button
 *
 * Note: No contact form as per specification - direct email only.
 */

import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

/**
 * Generate metadata for the contact page
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("title"),
    description:
      locale === "nl"
        ? "Neem contact met ons op voor een offerte of meer informatie over onze kranen."
        : "Contact us for a quote or more information about our faucets.",
  };
}

/**
 * Props for the contact page
 */
interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Contact page component with two-column layout
 */
export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact" });

  const email = "sanisupply@info.nl";

  return (
    <div className="pt-16 tablet:pt-20 min-h-screen flex">
      {/* Two-column layout */}
      <div className="flex-1 flex flex-col tablet:flex-row">
        {/* Left column - Text content */}
        <div
          className="
            flex-1 flex flex-col justify-center
            container-padding py-12 tablet:py-16 desktop:py-20
            order-2 tablet:order-1
          "
        >
          <div className="max-w-lg">
            {/* Page Title */}
            <h1
              className="
                text-4xl tablet:text-5xl desktop:text-6xl
                font-semibold mb-8
                animate-slideUp
              "
            >
              {t("title")}
            </h1>

            {/* Message with bold keywords */}
            <p
              className="
                text-base tablet:text-lg text-foreground/80
                mb-8 leading-relaxed
                animate-slideUp
              "
              style={{ animationDelay: "100ms" }}
            >
              {locale === "nl" ? (
                <>
                  Wilt u een <strong className="text-foreground font-semibold">bestelling</strong>
                  <br />
                  plaatsen of heeft u een <strong className="text-foreground font-semibold">vraag</strong>?
                  <br />
                  Wij staan voor u klaar.
                </>
              ) : (
                <>
                  Would you like to place an <strong className="text-foreground font-semibold">order</strong>
                  <br />
                  or do you have a <strong className="text-foreground font-semibold">question</strong>?
                  <br />
                  We are here for you.
                </>
              )}
            </p>

            {/* Email */}
            <div
              className="animate-slideUp"
              style={{ animationDelay: "200ms" }}
            >
              <p className="text-sm text-foreground/60 mb-1">
                {t("emailLabel")}:
              </p>
              <a
                href={`mailto:${email}`}
                className="
                  text-base tablet:text-lg
                  text-foreground
                  hover:text-foreground/80
                  transition-colors duration-200
                "
              >
                {email}
              </a>
            </div>
          </div>
        </div>

        {/* Right column - Photo */}
        <div
          className="
            relative w-full tablet:w-1/2 desktop:w-[50%]
            h-[40vh] tablet:h-auto min-h-[300px]
            order-1 tablet:order-2
            animate-fadeIn
          "
        >
          <Image
            src="/images/contact/contact-person.svg"
            alt="Contact person"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Subtle gradient overlay for mobile */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-b from-transparent via-transparent to-background/60
              tablet:bg-gradient-to-r tablet:from-background/10 tablet:via-transparent tablet:to-transparent
            "
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
