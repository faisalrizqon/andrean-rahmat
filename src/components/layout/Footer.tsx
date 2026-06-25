"use client";

import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiExternalLink,
  FiArrowUp,
} from "react-icons/fi";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { useI18n } from "@/i18n/useI18n";
import { siteConfig } from "@/config/site";

// Same nav items as Navbar
const NAV_ITEMS = [
  { id: "hero", labelKey: "nav.home" },
  { id: "about", labelKey: "nav.about" },
  { id: "experience", labelKey: "nav.experience" },
  { id: "skills", labelKey: "nav.skills" },
  { id: "portfolio", labelKey: "nav.portfolio" },
  { id: "testimoni", labelKey: "nav.testimoni" },
  { id: "booking", labelKey: "nav.booking" },
  { id: "contact", labelKey: "nav.contact" },
  { id: "blog", labelKey: "nav.blog" },
];

export default function Footer() {
  const { t, locale } = useI18n();

  const tagline =
    locale === "en"
      ? siteConfig.profile.taglineEn
      : siteConfig.profile.tagline;

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    const el = document.getElementById("hero");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary-900 text-neutral-50">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <span className="font-heading text-xl font-bold tracking-tight">
              Andre Property
            </span>
            <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Quick Links column */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-accent-400 mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollTo(e, item.id)}
                    className="text-sm text-neutral-300 hover:text-neutral-50 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-accent-400 mb-4">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.profile.email}`}
                  className="flex items-start gap-2 text-sm text-neutral-300 hover:text-neutral-50 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                >
                  <FiMail className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{siteConfig.profile.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <FiMapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{siteConfig.profile.location}</span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-300 hover:text-neutral-50 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                >
                  <FiPhone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>WhatsApp</span>
                  <FiExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Social column */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-accent-400 mb-4">
              Social Media
            </h3>
            <div className="flex items-center gap-3 mb-5">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary-700 flex items-center justify-center text-neutral-300 hover:bg-primary-700 hover:text-neutral-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary-700 flex items-center justify-center text-neutral-300 hover:bg-primary-700 hover:text-neutral-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                aria-label="TikTok"
              >
                <FaTiktok className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
            <a
              href={siteConfig.social.cvDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-accent-600 rounded-md hover:bg-accent-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              {t("footer.downloadCv")}
              <FiExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-700">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
          <p className="text-sm text-neutral-400">{t("footer.copyright")}</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-50 transition-colors group rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            aria-label={t("footer.backToTop")}
          >
            <span>{t("footer.backToTop")}</span>
            <FiArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
