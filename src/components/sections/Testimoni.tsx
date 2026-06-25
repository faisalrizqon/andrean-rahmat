"use client";

import { FiMessageSquare } from "react-icons/fi";
import { useI18n } from "@/i18n/useI18n";
import { siteConfig } from "@/config/site";
import type { Testimoni } from "@/types";

export default function TestimoniSection() {
  const { t, locale } = useI18n();
  const items: Testimoni[] = siteConfig.testimoni;

  return (
    <section id="testimoni" className="section-padding bg-neutral-100">
      <div className="container-custom">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-800 text-center">
          {t("testimoni.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {items.map((item) => {
            const message = locale === "id" ? item.message : item.messageEn;
            const role = locale === "id" ? item.role : item.roleEn;
            const initial = item.name.charAt(0).toUpperCase();

            return (
              <div
                key={item.id}
                data-testid="testimoni-card"
                className="bg-neutral-50 rounded-lg shadow-soft p-6 flex flex-col"
              >
                <FiMessageSquare
                  className="w-8 h-8 text-accent-500/40 mb-4"
                  aria-hidden="true"
                />
                <p className="text-neutral-700 italic leading-relaxed flex-1">
                  &ldquo;{message}&rdquo;
                </p>

                <hr className="my-4 border-neutral-200" />

                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold shrink-0">
                    {initial}
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary-800">{item.name}</h3>
                    <p className="text-sm text-neutral-500">{role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-neutral-500">
          {t("testimoni.note")}
        </p>
      </div>
    </section>
  );
}
