"use client";

import { useEffect, useState } from "react";
import { FiMenu, FiX, FiGlobe } from "react-icons/fi";
import { useI18n } from "@/i18n/useI18n";

type NavItem = {
  id: string;
  labelKey: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "hero", labelKey: "nav.home" },
  { id: "about", labelKey: "nav.about" },
  { id: "experience", labelKey: "nav.experience" },
  { id: "skills", labelKey: "nav.skills" },
  { id: "portfolio", labelKey: "nav.portfolio" },
  { id: "contact", labelKey: "nav.contact" },
  { id: "blog", labelKey: "nav.blog" },
];

export default function Navbar() {
  const { t, locale, toggleLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const langToggleLabel = locale === "id" ? "EN" : "ID";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-b from-neutral-50/70 via-neutral-50/55 to-neutral-50/40 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom grid grid-cols-[1fr_auto_1fr] items-center h-20">
        {/* Left spacer — balances right cluster for true centering */}
        <div />

        <ul className="hidden xl:flex items-center gap-1 justify-self-center">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`group relative px-2.5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 ${
                  scrolled
                    ? "text-neutral-700 hover:text-accent-600"
                    : "text-accent-700 hover:text-accent-800"
                }`}
              >
                {t(item.labelKey)}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-accent-500 transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster: language toggle + mobile hamburger */}
        <div className="flex items-center gap-2 justify-self-end">
          <button
            type="button"
            onClick={toggleLocale}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold border rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 ${
              scrolled
                ? "text-accent-600 border-accent-200 hover:bg-accent-50/50"
                : "text-accent-700 border-accent-300/50 hover:bg-accent-50/30"
            }`}
            aria-label={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
          >
            <FiGlobe className="w-4 h-4" aria-hidden="true" />
            <span>{langToggleLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`xl:hidden p-2 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 ${
              scrolled
                ? "text-accent-600 hover:bg-accent-50/50"
                : "text-accent-700 hover:bg-accent-50/30"
            }`}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <FiMenu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`xl:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel (slide from right) */}
        <aside
          className={`absolute top-0 right-0 h-full w-72 max-w-[80vw] bg-neutral-50 shadow-strong flex flex-col transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-20 px-5 border-b border-neutral-200">
            <span className="font-heading text-lg font-bold text-primary-800">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="p-2 text-primary-800 hover:bg-primary-50 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
              aria-label="Close menu"
            >
              <FiX className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <ul className="flex-1 overflow-y-auto py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="block px-5 py-3 text-base font-medium text-neutral-700 hover:text-primary-800 hover:bg-primary-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-inset"
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-neutral-200 p-5">
            <button
              type="button"
              onClick={toggleLocale}
              className="flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-neutral-50 bg-primary-800 rounded-md hover:bg-primary-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
            >
              <FiGlobe className="w-4 h-4" aria-hidden="true" />
              <span>
                {locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
              </span>
            </button>
          </div>
        </aside>
      </div>
    </header>
  );
}
