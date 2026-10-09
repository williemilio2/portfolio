import type { ReactNode } from "react";
import type { SectionId } from "@/config/site";
import { TraceNode } from "@/components/layout/Trace";
import { Reveal } from "./Reveal";

type Props = {
  id: SectionId;
  title: string;
  children?: ReactNode;
  className?: string;
};

/** Título de sección anclado a la línea de trazado. */
export function SectionHeading({ id, title, children, className = "" }: Props) {
  return (
    <Reveal className={`relative max-w-4xl ${className}`}>
      <TraceNode id={id} />
      <h2 id={`${id}-title`} className="text-[clamp(2.125rem,4.6vw,4rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-fg">
        {title}
      </h2>
      {children ? <div className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">{children}</div> : null}
    </Reveal>
  );
}
