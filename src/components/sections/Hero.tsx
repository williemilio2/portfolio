import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { TraceNode } from "@/components/layout/Trace";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { HeroName } from "./HeroName";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative flex min-h-[100dvh] flex-col justify-center pt-[calc(4rem+env(safe-area-inset-top)+2.5rem)] pb-16 md:pb-20"
    >
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />

      <div className="container-page relative">
        <div className="trace-content relative">
          {siteConfig.openToWork ? (
            <Reveal className="mb-6 md:mb-8" y={8}>
              <p className="inline-flex items-center gap-2.5 rounded-sm border border-line bg-bg-elevated/70 px-3 py-1.5 font-mono text-xs text-fg-muted">
                {/* Indicador de estado real: Emilio busca empleo */}
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-line" />
                {t("status")}
              </p>
            </Reveal>
          ) : null}

          <div className="relative">
            <TraceNode id="home" />
            <HeroName name={siteConfig.name} />
          </div>

          <div className="mt-8 grid grid-cols-[1fr_auto] gap-x-5 gap-y-6 max-lg:[grid-template-areas:'headline_photo'_'lead_lead'_'cta_cta'] md:mt-10 lg:grid-cols-12 lg:gap-x-6">
            <Reveal delay={0.35} className="max-lg:[grid-area:headline] lg:col-span-7 lg:col-start-1 lg:row-start-1">
              <p className="max-w-[22ch] text-[clamp(1.375rem,2.5vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.025em] text-fg">
                {t("headline")}
              </p>
            </Reveal>

            <Reveal delay={0.45} className="max-lg:[grid-area:lead] lg:col-span-6 lg:col-start-1 lg:row-start-2">
              <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-fg-muted md:text-lg">{t("lead")}</p>
            </Reveal>

            <Reveal
              delay={0.55}
              className="flex flex-wrap items-center gap-3 max-lg:[grid-area:cta] lg:col-span-7 lg:col-start-1 lg:row-start-3"
            >
              <ButtonLink href="#projects" icon={<ArrowDownIcon size={18} weight="bold" />} nudge="down">
                {t("ctaProjects")}
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary" icon={<ArrowRightIcon size={18} />} nudge="right">
                {t("ctaContact")}
              </ButtonLink>
            </Reveal>

            <Reveal
              delay={0.5}
              className="max-lg:[grid-area:photo] w-[5.5rem] self-start sm:w-32 lg:col-span-4 lg:col-start-9 lg:row-span-3 lg:row-start-1 lg:w-full lg:max-w-[18.5rem] lg:justify-self-end lg:-mt-[clamp(5rem,8.5vw,8.25rem)]"
            >
              <Portrait alt={t("photoAlt")} pending={t("photoPending")} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Marco del retrato. Mientras no haya foto (siteConfig.photo = null)
 * muestra el monograma; el hueco ya reserva la proporción 4:5 para evitar saltos.
 */
function Portrait({ alt, pending }: { alt: string; pending: string }) {
  return (
    <figure className="relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line bg-bg-elevated">
        {siteConfig.photo ? (
          <Image src={siteConfig.photo} alt={alt} fill priority sizes="(min-width: 1024px) 296px, 128px" className="object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="sr-only">{pending}</span>
            <span
              aria-hidden="true"
              className="font-mono text-[clamp(1.25rem,3vw,3.25rem)] font-semibold tracking-[-0.04em] text-line-strong"
            >
              {siteConfig.shortName}
            </span>
          </div>
        )}
      </div>
      {/* Marcas de registro: el retrato como pieza técnica de la ficha */}
      <span aria-hidden="true" className="absolute -top-1.5 -left-1.5 size-3 border-t border-l border-accent-line" />
      <span aria-hidden="true" className="absolute -right-1.5 -bottom-1.5 size-3 border-r border-b border-accent-line" />
    </figure>
  );
}
