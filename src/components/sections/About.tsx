"use client";

import { FiMapPin, FiMail, FiBook } from "react-icons/fi";
import { useI18n } from "@/i18n/useI18n";
import { siteConfig } from "@/config/site";
import type { IconType } from "react-icons";

type InfoCardProps = {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
};

function InfoCard({ icon: Icon, label, value, href }: InfoCardProps) {
  const valueContent = href ? (
    <a
      href={href}
      className="text-neutral-700 hover:text-primary-800 transition-colors break-words rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
    >
      {value}
    </a>
  ) : (
    <p className="text-neutral-700 break-words">{value}</p>
  );

  return (
    <div className="bg-neutral-50 rounded-lg shadow-soft p-6 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-accent-500/15 text-accent-600 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </span>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-700">
          {label}
        </h3>
      </div>
      {valueContent}
    </div>
  );
}

export default function About() {
  const { t, locale } = useI18n();
  const { profile } = siteConfig;

  const aboutText = locale === "id" ? profile.about : profile.aboutEn;
  const education = locale === "id" ? profile.education : profile.educationEn;

  return (
    <section id="about" className="section-padding bg-neutral-100">
      <div className="container-custom">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-800 text-center">
          {t("about.title")}
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-neutral-700 leading-relaxed text-center">
          {aboutText}
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={FiMapPin}
            label={t("about.location")}
            value={profile.location}
          />
          <InfoCard
            icon={FiMail}
            label={t("about.email")}
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
          <InfoCard
            icon={FiBook}
            label={t("about.education")}
            value={education}
          />
        </div>
      </div>
    </section>
  );
}
