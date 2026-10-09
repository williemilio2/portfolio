import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { siteConfig } from "@/config/site";
import { ogLocales, routing } from "@/i18n/routing";
import { languageAlternates, localeUrl, personJsonLd } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme-script";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "latin-ext"], display: "swap" });

/** Espacios de traducción que necesitan los componentes de cliente. */
const CLIENT_NAMESPACES = ["a11y", "nav", "path", "theme", "contact"] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b0f" },
    { media: "(prefers-color-scheme: light)", color: "#eef1f4" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: t("title"),
    description: t("description"),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.contact.linkedin }],
    creator: siteConfig.name,
    alternates: {
      canonical: localeUrl(locale),
      languages: languageAlternates(),
    },
    openGraph: {
      type: "profile",
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      url: localeUrl(locale),
      locale: ogLocales[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      firstName: "Emilio",
      lastName: "González Cánovas",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [messages, tMeta, tAbout] = await Promise.all([
    getMessages({ locale }),
    getTranslations({ locale, namespace: "meta" }),
    getTranslations({ locale, namespace: "about" }),
  ]);

  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((ns) => [ns, messages[ns]]));
  const jsonLd = personJsonLd(locale, tMeta("title").split("·")[1]?.trim() ?? "", tAbout("p1"));

  return (
    <html lang={locale} suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Sin JavaScript, el contenido animado se muestra directamente */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
