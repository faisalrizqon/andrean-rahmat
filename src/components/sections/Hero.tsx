"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { FiArrowDown, FiTrendingUp, FiZap } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/useI18n";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.03 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stats = [
  { value: "1+", labelId: "Tahun Pengalaman", labelEn: "Year Experience", Icon: FiTrendingUp },
  { value: "10+", labelId: "Klien Ditangani", labelEn: "Clients Handled", Icon: FiZap },
  { value: "50+", labelId: "Konten Dibuat", labelEn: "Contents Created", Icon: FiTrendingUp },
];

const platformBadges = ["Meta Ads", "TikTok", "Canva", "CapCut", "WhatsApp Business"];

const socials = [
  {
    key: "hero.socialInstagram",
    href: siteConfig.social.instagram,
    Icon: FaInstagram,
    badgeClass:
      "bg-[conic-gradient(from_45deg,#F58529_0%,#DD2A7B_25%,#515BD4_50%,#F58529_100%)] text-white",
    hoverClass: "hover:scale-110 hover:shadow-lg hover:shadow-[#DD2A7B]/30",
    iconClassName: "h-5 w-5",
  },
  {
    key: "hero.socialTiktok",
    href: siteConfig.social.tiktok,
    Icon: FaTiktok,
    badgeClass:
      "bg-[conic-gradient(from_135deg,#25F4EE_0%,#000000_30%,#000000_60%,#FE2C55_85%,#25F4EE_100%)] text-white",
    hoverClass: "hover:scale-110 hover:shadow-lg hover:shadow-[#25F4EE]/25",
    iconClassName: "h-4 w-4",
  },
  {
    key: "hero.socialWhatsapp",
    href: `https://wa.me/${siteConfig.whatsapp}`,
    Icon: FaWhatsapp,
    badgeClass: "bg-[#25D366] text-white",
    hoverClass: "hover:scale-110 hover:shadow-lg hover:shadow-[#25D366]/30",
    iconClassName: "h-5 w-5",
  },
] as const;

export default function Hero() {
  const { locale, t } = useI18n();
  const { profile } = siteConfig;

  const title = locale === "id" ? profile.title : profile.titleEn;
  const tagline = locale === "id" ? profile.tagline : profile.taglineEn;

  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  const photoX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const photoY = useTransform(springY, [-0.5, 0.5], [-14, 14]);
  const cardX = useTransform(springX, [-0.5, 0.5], [14, -14]);
  const cardY = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const badgeX = useTransform(springX, [-0.5, 0.5], [24, -24]);
  const badgeY = useTransform(springY, [-0.5, 0.5], [18, -18]);
  const shape1X = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const shape1Y = useTransform(springY, [-0.5, 0.5], [20, -20]);
  const shape2X = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const shape2Y = useTransform(springY, [-0.5, 0.5], [-18, 18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToNext = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-100 px-4 pt-20 pb-10 sm:pt-24"
    >
      {/* Social media network pattern background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-50 via-neutral-50 to-accent-100/60" />
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[0.12]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="#5B9BD5" strokeWidth="1">
          <line x1="120" y1="180" x2="320" y2="120" />
          <line x1="320" y1="120" x2="540" y2="240" />
          <line x1="540" y1="240" x2="760" y2="160" />
          <line x1="760" y1="160" x2="980" y2="280" />
          <line x1="980" y1="280" x2="1080" y2="180" />
          <line x1="120" y1="180" x2="240" y2="380" />
          <line x1="240" y1="380" x2="460" y2="440" />
          <line x1="460" y1="440" x2="680" y2="380" />
          <line x1="680" y1="380" x2="900" y2="480" />
          <line x1="900" y1="480" x2="1060" y2="420" />
          <line x1="320" y1="120" x2="240" y2="380" />
          <line x1="540" y1="240" x2="460" y2="440" />
          <line x1="760" y1="160" x2="680" y2="380" />
          <line x1="980" y1="280" x2="900" y2="480" />
          <line x1="240" y1="380" x2="460" y2="440" />
          <line x1="460" y1="440" x2="680" y2="380" />
          <line x1="680" y1="380" x2="900" y2="480" />
        </g>
        <g fill="#5B9BD5">
          <circle cx="120" cy="180" r="8" />
          <circle cx="320" cy="120" r="10" />
          <circle cx="540" cy="240" r="7" />
          <circle cx="760" cy="160" r="9" />
          <circle cx="980" cy="280" r="8" />
          <circle cx="1080" cy="180" r="6" />
          <circle cx="240" cy="380" r="7" />
          <circle cx="460" cy="440" r="9" />
          <circle cx="680" cy="380" r="8" />
          <circle cx="900" cy="480" r="10" />
          <circle cx="1060" cy="420" r="6" />
        </g>
      </svg>

      {/* Decorative gradient mesh glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-accent-300/20 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/4 h-80 w-80 rounded-full bg-accent-200/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-10 h-64 w-64 rounded-full bg-accent-100/30 blur-[100px]"
      />

      {/* Floating decorative shapes */}
      <motion.div
        style={{ x: shape1X, y: shape1Y }}
        aria-hidden="true"
        className="pointer-events-none absolute top-16 right-[12%] hidden h-20 w-20 rounded-2xl border-2 border-accent-400/20 rotate-12 md:block"
      />
      <motion.div
        style={{ x: shape2X, y: shape2Y }}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-32 left-[10%] hidden h-16 w-16 rounded-full border-2 border-accent-400/20 md:block"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-custom relative z-10 flex w-full max-w-5xl flex-col items-center"
      >
        {/* Platform badges */}
        <motion.div
          variants={item}
          className="mb-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
        >
          {platformBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-white/70 px-2.5 py-1 text-[0.6rem] font-semibold text-accent-700 shadow-sm ring-1 ring-accent-200/50 backdrop-blur-sm sm:px-3 sm:text-xs"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Overlapping composition */}
        <div className="relative flex flex-col items-center gap-0 md:flex-row md:items-center md:gap-10">
          {/* Photo card */}
          <motion.div
            variants={item}
            style={{ x: photoX, y: photoY }}
            className="relative z-20"
          >
            <div className="relative h-60 w-48 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/50 sm:h-80 sm:w-60 md:h-[26rem] md:w-80">
              <Image
                src="/profile.png"
                alt={`${profile.name} - ${title}`}
                fill
                priority
                sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, 320px"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
            </div>

            {/* Floating stat badge */}
            <motion.div
              variants={item}
              style={{ x: badgeX, y: badgeY }}
              className="absolute -top-4 -right-4 z-30 flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-accent-500 shadow-xl sm:h-20 sm:w-20"
            >
              <span className="text-lg font-bold leading-none text-white sm:text-2xl">3+</span>
              <span className="hidden text-[0.5rem] font-medium uppercase tracking-wider text-white/80 sm:block">Years</span>
            </motion.div>

            {/* Floating bottom badge */}
            <motion.div
              variants={item}
              className="absolute -bottom-3 -left-3 z-30 rounded-xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm sm:px-4 sm:py-2.5"
            >
              <span className="text-[0.65rem] font-semibold text-accent-700 sm:text-sm">Digital Marketing</span>
            </motion.div>
          </motion.div>

          {/* Info card */}
          <motion.div
            variants={item}
            style={{ x: cardX, y: cardY }}
            className="relative z-30 mt-5 w-full max-w-sm rounded-2xl bg-white/80 p-5 shadow-xl ring-1 ring-white/60 backdrop-blur-md sm:max-w-md sm:p-7 md:-ml-16 md:mt-0 md:max-w-lg"
          >
            {/* Name — bigger */}
            <h1 className="font-heading text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl md:text-4xl lg:text-5xl">
              {profile.name}
            </h1>

            {/* Title */}
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-500 sm:h-2.5 sm:w-2.5" />
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent-700 sm:text-xs md:text-sm">
                {title}
              </p>
            </div>

            {/* Tagline */}
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base md:text-lg">
              {tagline}
            </p>

            {/* CTA */}
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "contact")}
                className="inline-flex items-center justify-center rounded-full bg-accent-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-accent-600 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-7 sm:py-3 sm:text-base"
              >
                {t("hero.ctaContact")}
              </a>
              <a
                href="#portfolio"
                onClick={(e) => handleScroll(e, "portfolio")}
                className="inline-flex items-center justify-center rounded-full bg-neutral-100 px-6 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all duration-300 hover:bg-neutral-200 hover:text-accent-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-7 sm:py-3 sm:text-base"
              >
                {t("hero.ctaPortfolio")}
              </a>
            </div>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ key, href, Icon, badgeClass, hoverClass, iconClassName }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(key)}
                  className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full shadow-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:h-11 sm:w-11 ${badgeClass} ${hoverClass}`}
                >
                  <Icon className={iconClassName} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={item}
          className="mt-7 grid w-full max-w-md grid-cols-3 gap-2.5 sm:max-w-lg sm:gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.value}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center rounded-xl bg-white/65 px-2 py-3 text-center shadow-sm ring-1 ring-white/50 backdrop-blur-sm transition-shadow hover:shadow-md sm:px-4 sm:py-4"
            >
              <stat.Icon className="mb-1 h-4 w-4 text-accent-500 sm:h-5 sm:w-5" />
              <span className="text-xl font-bold text-accent-700 sm:text-3xl">{stat.value}</span>
              <span className="mt-0.5 text-[0.55rem] font-medium leading-tight text-neutral-500 sm:text-xs">
                {locale === "id" ? stat.labelId : stat.labelEn}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust label */}
        <motion.div
          variants={item}
          className="mt-6 flex w-full max-w-xs items-center gap-3 sm:max-w-lg sm:gap-4"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-300/50" />
          <span className="whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-neutral-500 sm:text-xs">
            Digital Marketing &bull; Social Media &bull; Content Creation
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-300/50" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          variants={item}
          onClick={scrollToNext}
          className="mt-6 flex flex-col items-center gap-1 text-neutral-400 transition-colors hover:text-accent-600"
          aria-label={locale === "id" ? "Gulir ke bawah" : "Scroll down"}
        >
          <span className="text-[0.6rem] font-medium uppercase tracking-wider sm:text-xs">
            {locale === "id" ? "Gulir" : "Scroll"}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FiArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
