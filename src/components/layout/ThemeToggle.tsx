"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { useEffect, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme-script";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

/** El tema vive en <html data-theme>; se observa ese atributo como fuente única. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const getServerSnapshot = (): Theme | null => null;

export function ThemeToggle({ className = "" }: { className?: string }) {
  const t = useTranslations("theme");
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Sin preferencia guardada, se sigue al tema del sistema en vivo
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      } catch {}
      applyTheme(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && typeof document.startViewTransition === "function") {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  };

  const label = theme === null ? t("toggle") : theme === "dark" ? t("toLight") : t("toDark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex size-11 items-center justify-center rounded-sm text-fg-muted transition-colors duration-200 hover:bg-surface hover:text-fg ${className}`}
    >
      <SunIcon aria-hidden="true" size={20} weight="regular" className="hidden dark:block" />
      <MoonIcon aria-hidden="true" size={20} weight="regular" className="block dark:hidden" />
    </button>
  );
}
