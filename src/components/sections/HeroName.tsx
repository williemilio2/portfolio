"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Nombre del hero: cada palabra emerge desde una máscara (solo al cargar). */
export function HeroName({ name }: { name: string }) {
  const reduce = useReducedMotion();
  const words = name.split(" ");

  return (
    <h1
      id="home-title"
      className="text-[clamp(3rem,9vw,8.75rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-fg"
    >
      {words.map((word, index) => (
        <span key={word}>
            <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                data-reveal=""
                className="inline-block"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        duration: 0.9,
                        delay: 0.12 + index * 0.08,
                        ease: EASE,
                      }
                }
              >
                {word}
              </motion.span>
            </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}
