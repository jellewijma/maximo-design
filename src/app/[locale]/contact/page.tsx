/**
 * Contact Page
 *
 * Displays contact information for quote requests.
<<<<<<< HEAD
 * Features:
 * - Two-column layout (text left, image right on desktop)
 * - Title "Contact"
 * - Message: "Wilt u een bestelling plaatsen of heeft u een vraag? Wij staan voor u klaar."
 * - Email link: sanisupply@info.nl
 * - Contact image on the right
 * - Subtle animations
=======
 * New design features:
 * - Two-column layout (text left, photo right)
 * - Left column: "Contact" title, message with bold keywords, email
 * - Right column: Large photo of person
 * - Clean, minimal design without CTA button
>>>>>>> origin/laptop
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
<<<<<<< HEAD
    <section className="relative min-h-screen pt-16 tablet:pt-20">
      {/* Two-column layout container */}
      <div className="h-full min-h-[calc(100vh-4rem)] tablet:min-h-[calc(100vh-5rem)] flex flex-col tablet:flex-row">
        {/* Left column - Contact content */}
        <div
          className="
            flex-1 flex flex-col justify-center
            container-padding py-12 tablet:py-20
            order-2 tablet:order-1
            tablet:border-r border-[#EFEFEF]
          "
        >
          <div className="max-w-xl">
            {/* Page Title */}
            <h1 className="text-5xl tablet:text-6xl desktop:text-7xl font-display mb-6 animate-slideUp">
              {t("title")}
            </h1>

            {/* Message */}
            <p
              className="text-lg tablet:text-xl text-foreground/80 mb-12 leading-relaxed animate-slideUp"
              style={{ animationDelay: "100ms" }}
            >
              {t("message")}
            </p>

            {/* Email section */}
            <div
              className="mb-12 animate-slideUp"
              style={{ animationDelay: "200ms" }}
            >
              <p className="text-sm uppercase tracking-wider text-foreground/50 mb-3">
                {t("emailLabel")}
=======
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
>>>>>>> origin/laptop
              </p>
              <a
                href={`mailto:${email}`}
                className="
<<<<<<< HEAD
                  text-2xl tablet:text-3xl font-medium
                  text-foreground
                  hover:text-primary
                  transition-colors duration-200
                  inline-block
=======
                  text-base tablet:text-lg
                  text-foreground
                  hover:text-foreground/80
                  transition-colors duration-200
>>>>>>> origin/laptop
                "
              >
                {email}
              </a>
            </div>
<<<<<<< HEAD

            {/* CTA Button */}
            <div
              className="animate-slideUp"
              style={{ animationDelay: "300ms" }}
            >
              <a
                href={`mailto:${email}`}
                className="
                  inline-flex items-center justify-center gap-3
                  px-8 py-4 text-lg font-medium rounded-sm
                  border border-foreground text-foreground bg-transparent
                  hover:bg-foreground hover:text-background
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-foreground focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {t("cta")}
              </a>
            </div>
          </div>
        </div>

        {/* Right column - Contact Image */}
        <div
          className="
            relative w-full tablet:w-1/2
            h-[50vh] tablet:h-auto
=======
          </div>
        </div>

        {/* Right column - Photo */}
        <div
          className="
            relative w-full tablet:w-1/2 desktop:w-[50%]
            h-[40vh] tablet:h-auto min-h-[300px]
>>>>>>> origin/laptop
            order-1 tablet:order-2
            animate-fadeIn
          "
        >
          <Image
<<<<<<< HEAD
            src="/images/contact.png"
            alt="Contact Maximo Design"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Gradient overlay for better mobile appearance */}
          <div
            className="
              absolute inset-0
              bg-linear-to-b from-transparent via-transparent to-background/80
              tablet:bg-gradient-to-r tablet:from-background/40 tablet:via-transparent tablet:to-transparent
=======
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
>>>>>>> origin/laptop
            "
            aria-hidden="true"
          />
        </div>
      </div>
<<<<<<< HEAD
    </section>
=======
    </div>
>>>>>>> origin/laptop
  );
}
