import { ChatsCircleIcon, LightningIcon, TargetIcon, TreeStructureIcon, FileArrowDownIcon } from "@phosphor-icons/react/ssr";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const principles = [
  { key: "communication", Icon: ChatsCircleIcon },
  { key: "goals", Icon: TargetIcon },
  { key: "fullstack", Icon: TreeStructureIcon },
  { key: "learning", Icon: LightningIcon },
] as const;

export async function About() {
  const t = await getTranslations("about");

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <div className="trace-content grid gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <SectionHeading id="about" title={t("title")} />
            <Reveal delay={0.1} className="mt-10 max-w-[62ch] space-y-6 text-[1.0625rem] leading-[1.75] text-fg-muted md:text-lg">
              <p>
                <span className="text-fg">{t("p1")}</span>
              </p>
              <p>{t("p2")}</p>
              <ButtonLink href="/cv.pdf" download="Emilio_Gonzalez_CV.pdf" icon={<FileArrowDownIcon size={18} weight="bold" />} nudge="down">
                {t("cv")}
              </ButtonLink>
            </Reveal>
          </div>

          <div className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9 lg:pt-3">
            <Reveal delay={0.1}>
              <h3 className="label-mono border-t border-line pt-4 text-fg-subtle">{t("principlesLabel")}</h3>
              <ul className="mt-6 flex flex-col gap-7">
                {principles.map(({ key, Icon }) => (
                  <li key={key} className="grid grid-cols-[1.75rem_1fr] gap-x-3">
                    <Icon aria-hidden="true" size={22} weight="regular" className="mt-0.5 text-accent-text" />
                    <div>
                      <p className="font-medium tracking-[-0.01em] text-fg">{t(`principles.${key}.title`)}</p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-fg-muted">{t(`principles.${key}.text`)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="border-l-2 border-accent-line pl-5">
                <h3 className="label-mono text-fg-subtle">{t("lookingLabel")}</h3>
                <p className="mt-3 text-lg leading-snug font-medium tracking-[-0.015em] text-fg">{t("lookingText")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
