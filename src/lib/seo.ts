import { siteConfig } from "@/config/site";
import { routing, type AppLocale } from "@/i18n/routing";

export function localeUrl(locale: AppLocale) {
  return `${siteConfig.url}/${locale}`;
}

export function languageAlternates() {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) languages[locale] = localeUrl(locale);
  languages["x-default"] = localeUrl(routing.defaultLocale);
  return languages;
}

/** Datos estructurados schema.org con información real proporcionada por Emilio. */
export function personJsonLd(locale: AppLocale, jobTitle: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: localeUrl(locale),
    jobTitle,
    description,
    email: `mailto:${siteConfig.contact.email}`,
    telephone: siteConfig.contact.phone,
    sameAs: [siteConfig.contact.linkedin, siteConfig.contact.github],
    knowsLanguage: ["es", "en"],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "IES Poeta Paco Mollà",
      address: { "@type": "PostalAddress", addressLocality: "Petrer", addressCountry: "ES" },
    },
    knowsAbout: ["Desarrollo web", "Next.js", "React", "TypeScript", "Node.js", "Java", "Python", "Bash", "SQL", "Git"],
  };
}
