"use client";

import { FiZap, FiHeart, FiTool } from "react-icons/fi";
import { useI18n } from "@/i18n/useI18n";
import { siteConfig } from "@/config/site";
import type { IconType } from "react-icons";

type SkillCategoryProps = {
  icon: IconType;
  title: string;
  skills: readonly string[];
};

function SkillCategory({ icon: Icon, title, skills }: SkillCategoryProps) {
  return (
    <div
      data-testid="skill-category"
      className="bg-neutral-50 rounded-lg shadow-soft p-8 flex flex-col gap-5"
    >
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-accent-500/15 text-accent-600 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </span>
        <h3 className="font-heading text-xl font-bold text-primary-800">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useI18n();
  const { skills } = siteConfig;

  return (
    <section id="skills" className="section-padding bg-neutral-100">
      <div className="container-custom">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-800 text-center">
          {t("skills.title")}
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkillCategory
            icon={FiZap}
            title={t("skills.hard")}
            skills={skills.hard}
          />
          <SkillCategory
            icon={FiHeart}
            title={t("skills.soft")}
            skills={skills.soft}
          />
          <SkillCategory
            icon={FiTool}
            title={t("skills.tools")}
            skills={skills.tools}
          />
        </div>
      </div>
    </section>
  );
}
