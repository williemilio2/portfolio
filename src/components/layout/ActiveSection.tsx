"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { sectionIds, type SectionId } from "@/config/site";

const ActiveSectionContext = createContext<SectionId>("home");

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}

/**
 * Detecta la sección visible con IntersectionObserver (sin listeners de scroll).
 * Una sección se considera activa cuando cruza la franja superior del viewport.
 */
export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as SectionId);
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <ActiveSectionContext.Provider value={active}>{children}</ActiveSectionContext.Provider>;
}
