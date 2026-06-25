import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nProvider";
import { siteConfig } from "@/config/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const seoDescription = siteConfig.profile.taglineEn;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Andre Property - Digital Marketing & Social Media Specialist",
    template: "%s | Andre Property",
  },
  description: seoDescription,
  keywords: [
    "Andre Rahmat",
    "Andre Property",
    "Digital Marketing",
    "Social Media Specialist",
    "Property Sales",
    "Meta Ads",
    "TikTok Marketing",
    "Indonesia",
  ],
  authors: [{ name: "Andre Rahmat" }],
  creator: "Andre Rahmat",
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "Andre Property",
    title: "Andre Property - Digital Marketing & Social Media Specialist",
    description: seoDescription,
    // TODO: Add /public/og-image.png (1200x630) for social sharing previews
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Andre Property",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andre Property - Digital Marketing & Social Media Specialist",
    description: seoDescription,
    // TODO: Add /public/og-image.png for Twitter card previews
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "id-ID": siteUrl,
      "en-US": siteUrl,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.profile.name,
  jobTitle: siteConfig.profile.titleEn,
  email: `mailto:${siteConfig.profile.email}`,
  url: siteUrl,
  sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok],
  description: siteConfig.profile.taglineEn,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary-800 focus:px-4 focus:py-2 focus:text-neutral-50"
        >
          Skip to content
        </a>
        <I18nProvider>{children}</I18nProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
