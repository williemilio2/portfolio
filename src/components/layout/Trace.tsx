"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import type { SectionId } from "@/config/site";
import { useActiveSection } from "./ActiveSection";

/**
 * Línea técnica que recorre el lateral del portfolio (desde 1280 px).
 * El tramo en lima avanza con el progreso de lectura; cada sección es un nodo.
 */
export function ScrollTrace() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
      <div className="container-page relative h-full">
        <div className="absolute inset-y-0 left-[4rem] w-px bg-line" />
        <motion.div
          className="absolute inset-y-0 left-[4rem] w-px origin-top bg-accent-line"
          style={{ scaleY: reduce ? scrollYProgress : smooth }}
        />
      </div>
    </div>
  );
}

/** Nodo de la línea para una sección. Se colorea cuando la sección está activa. */
export function TraceNode({ id }: { id: SectionId }) {
  const active = useActiveSection() === id;

  return (
    <span
      aria-hidden="true"
      data-active={active}
      className="absolute top-[0.42em] left-[calc(-3.5rem-5px)] hidden size-[10px] rounded-[1px] border border-line-strong bg-bg transition-[background-color,border-color,transform] duration-300 ease-[var(--ease-out-quart)] data-[active=true]:scale-110 data-[active=true]:border-accent-line data-[active=true]:bg-accent xl:block"
    />
  );
}
