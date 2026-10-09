"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LOCALE_COOKIE, localeNames, routing, type AppLocale } from "@/i18n/routing";
import { useActiveSection } from "./ActiveSection";

function rememberLocale(locale: AppLocale) {
  // Preferencia explícita del usuario: se respeta al volver a la raíz del sitio
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ size = "sm", onSelect }: { size?: "sm" | "lg"; onSelect?: () => void }) {
  const t = useTranslations("nav");
  const current = useLocale() as AppLocale;
  const active = useActiveSection();

  return (
    <nav aria-label={t("language")}>
      <ul className={`flex items-center ${size === "lg" ? "gap-2" : "gap-0.5"}`}>
        {routing.locales.map((locale) => {
          const isCurrent = locale === current;
          return (
            <li key={locale}>
              <Link
                href={{ pathname: "/", hash: active === "home" ? undefined : active }}
                locale={locale}
                lang={locale}
                hrefLang={locale}
                scroll={false}
                aria-current={isCurrent ? "true" : undefined}
                aria-label={localeNames[locale]}
                title={localeNames[locale]}
                onClick={() => {
                  rememberLocale(locale);
                  onSelect?.();
                }}
                className={`label-mono inline-flex items-center justify-center rounded-sm transition-colors duration-200 ${
                  size === "lg" ? "min-h-12 min-w-14 border px-3 text-sm" : "min-h-9 min-w-9 px-1.5"
                } ${
                  isCurrent
                    ? size === "lg"
                      ? "border-fg text-fg"
                      : "text-fg underline decoration-accent-line decoration-2 underline-offset-[6px]"
                    : size === "lg"
                      ? "border-line text-fg-subtle hover:border-line-strong hover:text-fg"
                      : "text-fg-subtle hover:text-fg"
                }`}
              >
                {locale.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
