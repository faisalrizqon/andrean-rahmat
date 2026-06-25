"use client";

import { FiExternalLink } from "react-icons/fi";
import { useI18n } from "@/i18n/useI18n";
import { siteConfig } from "@/config/site";
import type { PortfolioItem } from "@/types";

export default function Portfolio() {
  const { t, locale } = useI18n();
  const { portfolio } = siteConfig;

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-custom">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-800 text-center">
          {t("portfolio.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {portfolio.map((item: PortfolioItem) => {
            const title = locale === "id" ? item.title : item.titleEn;
            const category =
              locale === "id" ? item.category : item.categoryEn;
            const description =
              locale === "id" ? item.description : item.descriptionEn;

            return (
              <article
                key={item.id}
                data-testid="portfolio-card"
                className="bg-neutral-50 rounded-lg shadow-soft overflow-hidden flex flex-col transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
              >
                {/* TODO: replace placeholder with real screenshot from Google Drive */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-medium text-sm">
                  {item.sampleImageLabel}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className="inline-flex self-start items-center rounded-full bg-accent-500/15 text-accent-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-3">
                    {category}
                  </span>

                  <h3 className="font-heading text-lg font-bold text-primary-800">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed flex-1">
                    {description}
                  </p>

                  <a
                    href={item.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("portfolio.viewDetail")} - ${title}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-accent-600 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
                  >
                    {t("portfolio.viewDetail")}
                    <FiExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
