import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Se lee el segmento [locale] con next/root-params para que las páginas
  // sigan siendo estáticas (compatible con cacheComponents).
  let resolved = locale;
  if (!resolved) {
    const segment = await rootLocale();
    resolved = hasLocale(routing.locales, segment) ? segment : routing.defaultLocale;
  }

  return {
    locale: resolved,
    messages: (await import(`../messages/${resolved}.json`)).default,
  };
});
