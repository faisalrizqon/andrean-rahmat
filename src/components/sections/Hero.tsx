"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/useI18n";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const socials = [
  {
    key: "hero.socialInstagram",
    href: siteConfig.social.instagram,
    Icon: FaInstagram,
  },
  {
    key: "hero.socialTiktok",
    href: siteConfig.social.tiktok,
    Icon: FaTiktok,
  },
  {
    key: "hero.socialWhatsapp",
    href: `https://wa.me/${siteConfig.whatsapp}`,
    Icon: FaWhatsapp,
  },
] as const;

export default function Hero() {
  const { locale, t } = useI18n();
  const { profile } = siteConfig;

  const title = locale === "id" ? profile.title : profile.titleEn;
  const tagline = locale === "id" ? profile.tagline : profile.taglineEn;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-neutral-900 pt-20"
    >
      {/* Decorative accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary-400/10 blur-3xl"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-custom relative z-10 flex flex-col items-center text-center"
      >
        {/* Name */}
        <motion.h1
          variants={item}
          className="font-heading text-4xl font-bold leading-tight text-neutral-50 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {profile.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={item}
          className="mt-4 text-lg font-medium tracking-wide text-accent-400 sm:text-xl md:text-2xl"
        >
          {title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg md:text-xl"
        >
          {tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
            className="inline-flex items-center justify-center rounded-lg bg-accent-500 px-8 py-3.5 text-base font-semibold text-neutral-900 shadow-medium transition-all duration-300 hover:bg-accent-400 hover:shadow-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
          >
            {t("hero.ctaContact")}
          </a>
          <a
            href="#portfolio"
            onClick={(e) => handleScroll(e, "portfolio")}
            className="inline-flex items-center justify-center rounded-lg border border-neutral-50 px-8 py-3.5 text-base font-semibold text-neutral-50 transition-all duration-300 hover:bg-neutral-50 hover:text-primary-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
          >
            {t("hero.ctaPortfolio")}
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div variants={item} className="mt-12 flex items-center gap-4 sm:gap-6">
          {socials.map(({ key, href, Icon }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(key)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-50/20 text-neutral-200 transition-all duration-300 hover:border-accent-400 hover:bg-accent-500/10 hover:text-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
