import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main id="main" className="container-page flex min-h-dvh flex-col items-start justify-center gap-6 py-24">
      <p className="font-mono text-sm text-accent-text">404</p>
      <h1 className="max-w-[18ch] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1] font-semibold tracking-[-0.04em]">
        {t("title")}
      </h1>
      <p className="max-w-[48ch] text-lg text-fg-muted">{t("text")}</p>
      <Link
        href="/"
        className="group mt-2 inline-flex min-h-12 items-center gap-2.5 rounded-sm bg-accent px-5 font-medium text-accent-ink transition-transform active:scale-[0.98]"
      >
        <ArrowLeftIcon aria-hidden="true" size={18} className="transition-transform group-hover:-translate-x-0.5" />
        {t("back")}
      </Link>
    </main>
  );
}
