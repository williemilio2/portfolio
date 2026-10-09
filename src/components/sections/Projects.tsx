import { getTranslations } from "next-intl/server";

import { BrowserFrame, PhoneFrame, RouteTree } from "@/components/projects/Frames";
import { ProjectFeatures, ProjectHeader, ProjectMeta, ProjectProblem } from "@/components/projects/ProjectInfo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aulasRouteTree, projects, type Project, type ProjectId } from "@/content/projects";

function getProject(id: ProjectId): Project {
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Error(`Proyecto no encontrado: ${id}`);
  return project;
}

export async function Projects() {
  const t = await getTranslations("projects");

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <div className="trace-content">
          <SectionHeading id="projects" title={t("title")}>
            <p>{t("intro")}</p>
          </SectionHeading>

          <div className="mt-20 flex flex-col gap-28 md:mt-24 md:gap-36 lg:gap-44">
            <FeaturedCase project={getProject("suplementacion")} />
            <CarboomCase project={getProject("carboom")} />
            <AulasCase project={getProject("aulas")} />
            <PairCases left={getProject("powerfitt")} right={getProject("efitec")} />
          </div>
        </div>
      </div>
    </section>
  );
}

async function getAlts(project: Project) {
  const [t, tItems] = await Promise.all([getTranslations("projects.labels"), getTranslations("projects.items")]);
  const name = tItems(`${project.id}.name`);
  return { desktop: t("screenshot", { name }), mobile: t("screenshotMobile", { name }), hint: t("scrollHint") };
}

/** Proyecto principal: gran ventana con recorrido interno y móvil superpuesto. */
async function FeaturedCase({ project }: { project: Project }) {
  const alt = await getAlts(project);
  return (
    <article aria-labelledby={`project-${project.id}`} className="group/case">
      <Reveal>
        <ProjectHeader project={project} headingSize="lg" />
      </Reveal>

      <Reveal delay={0.1} className="relative mt-10 md:mt-12">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-10">
            <BrowserFrame
              host={project.host}
              image={project.images.desktop}
              alt={alt.desktop}
              scrollable={project.images.scrollable}
              sizes="(min-width: 1280px) 960px, (min-width: 768px) 82vw, 100vw"
            />
          </div>
          {project.images.mobile ? (
            <div className="col-span-4 col-start-9 -mt-20 sm:col-span-3 sm:col-start-10 sm:-mt-32 md:col-span-3 md:col-start-10 md:-mt-48 lg:col-span-2 lg:col-start-11 lg:-mt-[17rem]">
              <PhoneFrame image={project.images.mobile} alt={alt.mobile} sizes="(min-width: 768px) 22vw, 33vw" />
            </div>
          ) : null}
        </div>
        {project.images.scrollable ? (
          <p className="mt-4 hidden font-mono text-xs text-fg-subtle [@media(hover:hover)]:md:block">{alt.hint}</p>
        ) : null}
      </Reveal>

      <Reveal delay={0.05} className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4">
          <ProjectProblem project={project} />
        </div>
        <div className="md:col-span-8 lg:col-span-5">
          <ProjectFeatures project={project} featureColumns={1} />
        </div>
        <div className="md:col-span-12 lg:col-span-3">
          <ProjectMeta project={project} />
        </div>
      </Reveal>
    </article>
  );
}

/** CarBoom: imagen protagonista a la izquierda, ficha a la derecha. */
async function CarboomCase({ project }: { project: Project }) {
  const alt = await getAlts(project);
  return (
    <article aria-labelledby={`project-${project.id}`} className="group/case grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:gap-6">
      <Reveal className="relative lg:col-span-7 lg:row-start-1">
        <BrowserFrame
          host={project.host}
          image={project.images.desktop}
          alt={alt.desktop}
          aspect="aspect-[16/10]"
          sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 100vw"
        />
        {project.images.mobile ? (
          <div className="absolute -bottom-10 -left-2 hidden w-[24%] sm:block lg:-left-6">
            <PhoneFrame image={project.images.mobile} alt={alt.mobile} sizes="180px" />
          </div>
        ) : null}
      </Reveal>

      <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:pt-6">
        <Reveal>
          <ProjectHeader project={project} />
        </Reveal>
        <Reveal delay={0.05}>
          <ProjectProblem project={project} />
        </Reveal>
        <Reveal delay={0.1}>
          <ProjectFeatures project={project} />
        </Reveal>
        <Reveal delay={0.15}>
          <ProjectMeta project={project} />
        </Reveal>
      </div>
    </article>
  );
}

/** Aulas: solo el acceso es público, así que se acompaña de su estructura real de rutas. */
async function AulasCase({ project }: { project: Project }) {
  const [alt, tItems] = await Promise.all([getAlts(project), getTranslations("projects.items")]);
  return (
    <article aria-labelledby={`project-${project.id}`} className="group/case grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:gap-6">
      <div className="flex flex-col gap-8 lg:col-span-4 lg:pt-6">
        <Reveal>
          <ProjectHeader project={project} />
        </Reveal>
        <Reveal delay={0.05}>
          <ProjectProblem project={project} />
        </Reveal>
        <Reveal delay={0.1}>
          <ProjectFeatures project={project} />
        </Reveal>
        <Reveal delay={0.15}>
          <ProjectMeta project={project} />
        </Reveal>
      </div>

      <Reveal className="relative lg:col-span-7 lg:col-start-6" delay={0.05}>
        <BrowserFrame
          host={project.host}
          image={project.images.desktop}
          alt={alt.desktop}
          sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 100vw"
          className="lg:ml-auto lg:w-[88%]"
        />
        <RouteTree
          title={tItems("aulas.treeTitle")}
          note={tItems("aulas.treeNote")}
          routes={aulasRouteTree}
          className="relative mt-4 sm:-mt-20 sm:mr-auto sm:w-[22rem] lg:-mt-32"
        />
      </Reveal>
    </article>
  );
}

/** PowerFitt y Efitec en pareja: uno vertical (móvil) y otro horizontal (escritorio). */
async function PairCases({ left, right }: { left: Project; right: Project }) {
  const [altLeft, altRight] = await Promise.all([getAlts(left), getAlts(right)]);
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-28 lg:grid-cols-12 lg:gap-6">
      <article aria-labelledby={`project-${left.id}`} className="group/case flex flex-col gap-10 lg:col-span-5">
        <Reveal className="relative h-[26rem] overflow-hidden rounded-md border border-line bg-surface/50 px-6 pt-10 sm:h-[30rem] sm:px-12">
          {left.images.mobile ? (
            <PhoneFrame
              image={left.images.mobile}
              alt={altLeft.mobile}
              sizes="(min-width: 1024px) 260px, 60vw"
              className="mx-auto w-[min(14.5rem,62%)] translate-y-8 transition-transform duration-700 ease-[var(--ease-out-quart)] motion-safe:[@media(hover:hover)]:group-hover/case:translate-y-2"
            />
          ) : null}
        </Reveal>
        <div className="flex flex-col gap-8">
          <Reveal>
            <ProjectHeader project={left} />
          </Reveal>
          <Reveal delay={0.05}>
            <ProjectProblem project={left} />
          </Reveal>
          <Reveal delay={0.1}>
            <ProjectFeatures project={left} />
          </Reveal>
          <Reveal delay={0.15}>
            <ProjectMeta project={left} />
          </Reveal>
        </div>
      </article>

      <article aria-labelledby={`project-${right.id}`} className="group/case flex flex-col gap-10 lg:col-span-6 lg:col-start-7 lg:mt-40">
        <Reveal>
          <BrowserFrame
            host={right.host}
            image={right.images.desktop}
            alt={altRight.desktop}
            scrollable={right.images.scrollable}
            aspect="aspect-[4/3]"
            sizes="(min-width: 1280px) 640px, (min-width: 1024px) 48vw, 100vw"
          />
        </Reveal>
        <div className="flex flex-col gap-8">
          <Reveal>
            <ProjectHeader project={right} />
          </Reveal>
          <Reveal delay={0.05}>
            <ProjectProblem project={right} />
          </Reveal>
          <Reveal delay={0.1}>
            <ProjectFeatures project={right} />
          </Reveal>
          <Reveal delay={0.15}>
            <ProjectMeta project={right} />
          </Reveal>
        </div>
      </article>
    </div>
  );
}
