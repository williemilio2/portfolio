"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Desplazamiento vertical inicial en px */
  y?: number;
  as?: "div" | "li" | "section" | "article";
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Aparición al entrar en el viewport (una sola vez).
 * Opacidad + desplazamiento corto + desenfoque leve.
 * Con movimiento reducido, posición y desenfoque se resuelven al instante y solo hay un fundido breve.
 */
export function Reveal({ children, className, delay = 0, y = 16, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={
        reduce
          ? { default: { duration: 0 }, opacity: { duration: 0.2 } }
          : { duration: 0.55, delay, ease: EASE }
      }
    >
      {children}
    </Component>
  );
}
