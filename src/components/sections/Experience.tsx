"use client";

import { FiBriefcase, FiCalendar, FiCheck } from "react-icons/fi";
import { useI18n } from "@/i18n/useI18n";
import { siteConfig } from "@/config/site";
import type { Experience } from "@/types";

export default function ExperienceSection() {
  const { t, locale } = useI18n();
  const { experiences } = siteConfig;

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-800 text-center">
          {t("experience.title")}
        </h2>

        <div className="mt-12 max-w-3xl mx-auto">
          <ol className="relative border-l-2 border-primary-200 pl-8 space-y-10">
            {experiences.map((entry: Experience) => {
              const role = locale === "id" ? entry.role : entry.roleEn;
              const description =
                locale === "id" ? entry.description : entry.descriptionEn;
              const achievements =
                locale === "id" ? entry.achievements : entry.achievementsEn;
              const typeLabel =
                entry.type === "relevant"
                  ? t("experience.relevant")
                  : t("experience.other");
              const typeClasses =
                entry.type === "relevant"
                  ? "bg-primary-100 text-primary-800"
                  : "bg-neutral-200 text-neutral-700";

              return (
                <li key={entry.id} className="relative">
                  {/* Timeline dot */}
                  <span
                    className="absolute -left-[2.125rem] top-1 w-3 h-3 rounded-full bg-accent-500 ring-4 ring-neutral-50"
                    aria-hidden="true"
                  />

                  {/* Period + type badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm font-medium">
                      <FiCalendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {entry.period}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${typeClasses}`}
                    >
                      <FiBriefcase className="w-3.5 h-3.5" aria-hidden="true" />
                      {typeLabel}
                    </span>
                  </div>

                  {/* Role + company */}
                  <h3 className="font-heading text-xl font-bold text-primary-800">
                    {role}
                  </h3>
                  <p className="mt-1 text-neutral-600 font-medium">
                    {entry.company}
                  </p>

                  {/* Description */}
                  <p className="mt-3 text-neutral-700 leading-relaxed">
                    {description}
                  </p>

                  {/* Achievements */}
                  {achievements.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-700 mb-2">
                        {t("experience.achievements")}
                      </h4>
                      <ul className="space-y-2">
                        {achievements.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-neutral-700"
                          >
                            <FiCheck
                              className="w-4 h-4 mt-0.5 text-accent-600 shrink-0"
                              aria-hidden="true"
                            />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
