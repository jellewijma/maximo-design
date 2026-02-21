/**
 * Security Review Page
 *
 * Loads and displays the security review document from the CMS repository.
 */

import { readFile } from "fs/promises";
import path from "path";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/config";

const securityReviewPath = path.resolve(
  process.cwd(),
  "..",
  "maximoCMS",
  "docs",
  "security-review.md",
);

async function getSecurityReviewContent() {
  try {
    return await readFile(securityReviewPath, "utf8");
  } catch (error) {
    return "Security review document is not available.";
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "nl" ? "Security review" : "Security review",
    description:
      locale === "nl"
        ? "Beveiligingsreview documentatie vanuit de CMS repository."
        : "Security review documentation loaded from the CMS repository.",
  };
}

interface SecurityReviewPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SecurityReviewPage({
  params,
}: SecurityReviewPageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  const content = await getSecurityReviewContent();

  return (
    <section className="container-padding section-spacing">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tablet:text-4xl">
          Security review
        </h1>
        <p className="mt-3 text-sm text-foreground/80">
          Content is sourced from <span className="font-semibold">maximoCMS</span>
          /docs/security-review.md.
        </p>
        <pre className="mt-8 whitespace-pre-wrap rounded-lg bg-[#1a1919] p-6 text-sm leading-relaxed text-foreground/90">
          {content}
        </pre>
      </div>
    </section>
  );
}
