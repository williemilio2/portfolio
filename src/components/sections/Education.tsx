import { GraduationCapIcon, TranslateIcon } from "@phosphor-icons/react/ssr";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const languages = ["es", "en"] as const;

export async function Education() {
  const t = await getTranslations("education");

  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <div className="trace-content">
          <SectionHeading id="education" title={t("title")} />

          <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-12">
            <Reveal className="flex flex-col gap-8 bg-bg-elevated p-6 sm:p-8 md:col-span-7 lg:p-10">
              <h3 className="label-mono flex items-center gap-2.5 text-fg-subtle">
                <GraduationCapIcon aria-hidden="true" size={18} />
                {t("educationLabel")}
              </h3>
              <div>
                <p className="max-w-[24ch] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.12] font-semibold tracking-[-0.03em] text-fg">
                  {t("degree")}
                </p>
                <p className="mt-4 text-fg-muted">{t("school")}</p>
              </div>
              <p className="mt-auto max-w-[48ch] border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-fg-muted">
                {t("note")}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-8 bg-bg-elevated p-6 sm:p-8 md:col-span-5 lg:p-10">
              <h3 className="label-mono flex items-center gap-2.5 text-fg-subtle">
                <TranslateIcon aria-hidden="true" size={18} />
                {t("languagesLabel")}
              </h3>
              <dl className="flex flex-col gap-6">
                {languages.map((lang) => (
                  <div key={lang} className="flex items-baseline justify-between gap-6">
                    <dt className="text-lg text-fg">{t(`languages.${lang}.name`)}</dt>
                    <dd className="font-mono text-[clamp(1.5rem,2.4vw,2rem)] font-medium tracking-[-0.02em] text-accent-text">
                      {t(`languages.${lang}.level`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
