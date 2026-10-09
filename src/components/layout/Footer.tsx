import { ArrowUpIcon } from "@phosphor-icons/react/ssr";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

/** Año del último despliegue; se fija en build para mantener la página estática. */
const YEAR = 2026;

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer id="footer" className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-subtle">
          © {YEAR} {siteConfig.name}. {t("rights")}
        </p>
        <a
          href="#home"
          className="group inline-flex min-h-11 items-center gap-2 self-start rounded-sm text-sm text-fg-muted transition-colors hover:text-fg sm:self-auto"
        >
          {t("backToTop")}
          <ArrowUpIcon
            aria-hidden="true"
            size={16}
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </footer>
  );
}
