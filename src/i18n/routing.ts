import { defineRouting } from "next-intl/routing";

/**
 * Para añadir un idioma nuevo:
 * 1. Añade su código aquí y su nombre en `localeNames`.
 * 2. Crea src/messages/<código>.json con las mismas claves que es.json.
 */
export const routing = defineRouting({
  locales: ["es", "en", "de", "sv"],
  defaultLocale: "es",
  localePrefix: "always",
  // El idioma inicial es siempre español salvo preferencia guardada por el usuario
  // (cookie propia gestionada en src/proxy.ts), nunca el Accept-Language.
  localeDetection: false,
  localeCookie: false,
});

export type AppLocale = (typeof routing.locales)[number];

export const LOCALE_COOKIE = "egc-locale";

export const localeNames: Record<AppLocale, string> = {
  es: "Español",
  en: "English",
  de: "Deutsch",
  sv: "Svenska",
};

export const ogLocales: Record<AppLocale, string> = {
  es: "es_ES",
  en: "en_GB",
  de: "de_DE",
  sv: "sv_SE",
};
