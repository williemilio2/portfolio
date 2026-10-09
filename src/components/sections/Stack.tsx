import {
  BrowserIcon,
  BuildingsIcon,
  CodeIcon,
  HardDrivesIcon,
  RobotIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react/ssr";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { declaredSkills, evidenceProjects, techEvidence } from "@/content/projects";

const areas = [
  { key: "web", Icon: BrowserIcon },
  { key: "apps", Icon: CodeIcon },
  { key: "ecommerce", Icon: ShoppingCartIcon },
  { key: "business", Icon: BuildingsIcon },
  { key: "automation", Icon: RobotIcon },
  { key: "sysadmin", Icon: HardDrivesIcon },
] as const;

/** Nombres de marca para las columnas (abreviados en móvil). */
const columnNames: Record<(typeof evidenceProjects)[number], { short: string; long: string }> = {
  suplementacion: { short: "SUP", long: "Suplementación" },
  carboom: { short: "CBM", long: "CarBoom" },
  aulas: { short: "AUL", long: "Aulas" },
  powerfitt: { short: "PWF", long: "PowerFitt" },
};

export async function Stack() {
  const [t, tItems] = await Promise.all([getTranslations("stack"), getTranslations("projects.items")]);

  return (
    <section id="stack" aria-labelledby="stack-title" className="relative py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <div className="trace-content">
          <SectionHeading id="stack" title={t("title")} />

          <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-16 lg:grid-cols-12 lg:gap-6">
            {/* Áreas de trabajo */}
            <Reveal className="lg:col-span-5">
              <h3 className="label-mono border-t border-line pt-4 text-fg-subtle">{t("areasLabel")}</h3>
              <ul className="mt-8 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {areas.map(({ key, Icon }) => (
                  <li key={key} className="group">
                    <Icon
                      aria-hidden="true"
                      size={26}
                      weight="light"
                      className="text-fg-subtle transition-[color,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5 group-hover:text-accent-text"
                    />
                    <p className="mt-4 font-medium tracking-[-0.01em] text-fg">{t(`areas.${key}.title`)}</p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg-muted">{t(`areas.${key}.text`)}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Matriz de evidencias: tecnología x proyecto */}
            <Reveal delay={0.1} className="min-w-0 lg:col-span-6 lg:col-start-7">
              <h3 className="label-mono border-t border-line pt-4 text-fg-subtle">{t("matrixLabel")}</h3>
              <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-fg-muted">{t("matrixIntro")}</p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">{t("matrixCaption")}</caption>
                  <thead>
                    <tr className="border-b border-line-strong">
                      <th scope="col" className="py-3 pr-3 font-mono text-[0.6875rem] font-normal tracking-wide text-fg-subtle uppercase">
                        {t("matrixTech")}
                      </th>
                      {evidenceProjects.map((id) => (
                        <th
                          key={id}
                          scope="col"
                          className="w-[3.25rem] px-1 py-3 text-center font-mono text-[0.6875rem] font-normal tracking-wide text-fg-subtle uppercase sm:w-auto sm:min-w-[5.5rem] lg:min-w-0 xl:min-w-[5.5rem]"
                        >
                          <abbr title={tItems(`${id}.name`)} className="no-underline sm:hidden lg:inline xl:hidden">
                            {columnNames[id].short}
                          </abbr>
                          <span className="hidden sm:inline lg:hidden xl:inline">{columnNames[id].long}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {techEvidence.map((row, index) => {
                      const groupStart = index > 0 && techEvidence[index - 1].group !== row.group;
                      return (
                        <tr
                          key={row.tech}
                          className={`transition-colors duration-150 hover:bg-surface/70 ${groupStart ? "border-t border-line" : ""}`}
                        >
                          <th scope="row" className="py-2 pr-3 text-[0.875rem] font-normal whitespace-nowrap text-fg sm:text-[0.9375rem]">
                            {row.tech}
                          </th>
                          {evidenceProjects.map((id) => {
                            const used = row.used.includes(id);
                            return (
                              <td key={id} className="px-1 py-2 text-center">
                                {used ? (
                                  <span className="inline-block size-2.5 rounded-[1px] bg-accent-line align-middle" />
                                ) : (
                                  <span aria-hidden="true" className="inline-block h-px w-2.5 bg-line-strong align-middle" />
                                )}
                                <span className="sr-only">{used ? t("used") : t("notUsed")}</span>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-fg-subtle">{t("matrixNote")}</p>
            </Reveal>
          </div>

          {/* Lenguajes y herramientas declarados por Emilio */}
          <Reveal className="mt-20 grid gap-6 border-t border-line pt-8 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-5">
              <h3 className="label-mono text-fg-subtle">{t("declaredLabel")}</h3>
              <p className="mt-3 max-w-[44ch] leading-relaxed text-fg-muted">{t("declaredText")}</p>
            </div>
            <ul className="flex flex-wrap items-start gap-2 md:col-span-7 md:justify-end">
              {declaredSkills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-sm border border-line-strong px-4 py-2.5 font-mono text-[0.9375rem] text-fg transition-colors duration-200 hover:border-accent-line"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
