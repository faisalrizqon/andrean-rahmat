"use client";

import { FiEdit3 } from "react-icons/fi";
import { useI18n } from "@/i18n/useI18n";

export default function Blog() {
  const { t } = useI18n();

  return (
    <section id="blog" className="section-padding">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-800">
            {t("blog.title")}
          </h2>

          <div className="mx-auto w-16 h-16 rounded-full bg-accent-500/15 text-accent-600 flex items-center justify-center mt-6">
            <FiEdit3 className="w-8 h-8" aria-hidden="true" />
          </div>

          <span className="inline-block mt-6 px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-semibold uppercase tracking-wide">
            {t("blog.comingSoon")}
          </span>

          <p className="mt-4 text-neutral-600 leading-relaxed">
            {t("blog.comingSoonMessage")}
          </p>

          <p className="mt-6 text-sm text-neutral-500">
            {t("blog.notifyText")}
          </p>
        </div>
      </div>
    </section>
  );
}
