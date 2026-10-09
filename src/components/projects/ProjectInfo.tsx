import { ArrowUpRightIcon, GithubLogoIcon, LockSimpleIcon } from "@phosphor-icons/react/ssr";
import { getTranslations } from "next-intl/server";

import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Project } from "@/content/projects";

type Props = {
  project: Project;
  /** Disposición de las funcionalidades: una columna o dos */
  featureColumns?: 1 | 2;
  headingSize?: "lg" | "md";
  showSummary?: boolean;
};

export async function ProjectHeader({ project, headingSize = "md", showSummary = true }: Omit<Props, "featureColumns">) {
  const t = await getTranslations("projects.items");
  return (
    <header>
      <p className="label-mono text-accent-text">{t(`${project.id}.kind`)}</p>
      <h3
        id={`project-${project.id}`}
        className={`mt-3 font-semibold tracking-[-0.035em] text-fg ${
          headingSize === "lg" ? "text-[clamp(2rem,4vw,3.25rem)] leading-[1]" : "text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05]"
        }`}
      >
        {t(`${project.id}.name`)}
      </h3>
      {showSummary ? (
        <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-fg-muted md:text-lg">{t(`${project.id}.summary`)}</p>
      ) : null}
    </header>
  );
}

export async function ProjectProblem({ project }: { project: Project }) {
  const [t, tLabels] = await Promise.all([getTranslations("projects.items"), getTranslations("projects.labels")]);
  return (
    <div>
      <h4 className="label-mono text-fg-subtle">{tLabels("problem")}</h4>
      <p className="mt-3 max-w-[48ch] leading-relaxed text-fg">{t(`${project.id}.problem`)}</p>
    </div>
  );
}

export async function ProjectFeatures({ project, featureColumns = 1 }: Pick<Props, "project" | "featureColumns">) {
  const [t, tLabels] = await Promise.all([getTranslations("projects.items"), getTranslations("projects.labels")]);
  return (
    <div>
      <h4 className="label-mono text-fg-subtle">{tLabels("features")}</h4>
      <ul className={`mt-3 grid gap-x-8 gap-y-2.5 ${featureColumns === 2 ? "sm:grid-cols-2" : ""}`}>
        {Array.from({ length: project.featureCount }, (_, i) => (
          <li key={i} className="grid grid-cols-[0.875rem_1fr] gap-x-2.5 text-[0.9375rem] leading-snug text-fg-muted">
            <span aria-hidden="true" className="mt-[0.6em] h-px w-full bg-accent-line" />
            <span>{t(`${project.id}.features.${i}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function ProjectMeta({ project }: { project: Project }) {
  const [t, tLabels, tA11y] = await Promise.all([
    getTranslations("projects.items"),
    getTranslations("projects.labels"),
    getTranslations("a11y"),
  ]);
  const name = t(`${project.id}.name`);

  return (
    <div className="flex flex-col gap-6">
      {project.stack.length > 0 ? (
        <div>
          <h4 className="label-mono text-fg-subtle">{tLabels("stack")}</h4>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${tLabels("stack")}: ${name}`}>
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-sm border border-line px-2 py-1 font-mono text-xs text-fg-muted">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <ButtonLink
          href={project.url}
          target="_blank"
          newTabLabel={`${name} ${tA11y("newTab")}`}
          icon={<ArrowUpRightIcon size={18} weight="bold" />}
          nudge="up-right"
        >
          {tLabels("visit")}
        </ButtonLink>
        {project.repo ? (
          <ButtonLink
            href={project.repo}
            target="_blank"
            variant="ghost"
            newTabLabel={`${name} ${tA11y("newTab")}`}
            icon={<GithubLogoIcon size={18} />}
          >
            {tLabels("code")}
          </ButtonLink>
        ) : (
          <span className="inline-flex min-h-11 items-center gap-2 text-sm text-fg-subtle">
            <LockSimpleIcon aria-hidden="true" size={16} />
            {tLabels("codePrivate")}
          </span>
        )}
      </div>
    </div>
  );
}
