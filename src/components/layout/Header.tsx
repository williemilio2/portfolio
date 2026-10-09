"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { sectionIds, siteConfig, type SectionId } from "@/config/site";
import { useActiveSection } from "./ActiveSection";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const EASE = [0.22, 1, 0.36, 1] as const;
const navSections = sectionIds.filter((id) => id !== "contact");

export function Header() {
  const t = useTranslations("nav");
  const tPath = useTranslations("path");
  const tA11y = useTranslations("a11y");
  const active = useActiveSection();
  const reduce = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Estado del header según el scroll (solo cambia al cruzar umbrales, sin re-render continuo)
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const nextScrolled = y > 16;
    if (nextScrolled !== scrolled) setScrolled(nextScrolled);
    const nextHidden = !reduce && !open && y > 480 && y > prev + 4;
    const show = y < prev - 4 || y <= 480;
    if (nextHidden && !hidden) setHidden(true);
    else if (show && hidden) setHidden(false);
  });

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // Menú móvil: bloqueo de scroll, contenido de fondo inerte y cierre con Escape
  useEffect(() => {
    if (!open) return;
    const main = document.getElementById("main");
    const footer = document.getElementById("footer");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const desktop = window.matchMedia("(min-width: 72rem)");
    const onResize = () => desktop.matches && closeMenu(false);

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, closeMenu]);

  const pathLabel = tPath(active);

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-sm bg-accent px-4 py-3 text-sm font-medium text-accent-ink transition-transform focus:translate-y-0"
      >
        {tA11y("skip")}
      </a>

      <header
        data-scrolled={scrolled || open}
        data-hidden={hidden && !open}
        className="group/header fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[transform,background-color,border-color] duration-300 ease-[var(--ease-out-quart)] data-[hidden=true]:-translate-y-full border-b border-transparent data-[scrolled=true]:border-line data-[scrolled=true]:bg-bg/85 data-[scrolled=true]:backdrop-blur-md"
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          {/* Identidad + ruta de la sección actual */}
          <a href="#home" aria-label={t("homeLink")} className="group flex min-h-11 items-center gap-3 rounded-sm">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-sm bg-fg font-mono text-[0.8125rem] font-semibold tracking-tight text-bg transition-transform duration-200 group-hover:-rotate-3"
            >
              {siteConfig.shortName}
            </span>
            <span aria-hidden="true" className="hidden font-mono text-[0.8125rem] text-fg-subtle sm:inline">
              ~/<span className="text-fg">{pathLabel}</span>
            </span>
          </a>

          {/* Navegación de escritorio */}
          <nav aria-label={t("label")} className="hidden nav:block">
            <ul className="flex items-center gap-1">
              {navSections.map((id) => (
                <li key={id}>
                  <NavLink id={id} label={t(id)} active={active === id} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden nav:block">
              <LanguageSwitcher />
            </div>
            <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-line nav:block" />
            <ThemeToggle />
            <a
              href="#contact"
              aria-current={active === "contact" ? "true" : undefined}
              className="hidden min-h-10 items-center rounded-sm bg-accent px-4 text-sm font-medium text-accent-ink transition-transform duration-150 active:scale-[0.98] nav:inline-flex"
            >
              {t("contact")}
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => (open ? closeMenu() : setOpen(true))}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("menuClose") : t("menuOpen")}
              className="inline-flex size-11 items-center justify-center rounded-sm text-fg transition-colors hover:bg-surface nav:hidden"
            >
              {open ? <XIcon aria-hidden="true" size={22} /> : <ListIcon aria-hidden="true" size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("label")}
            className="fixed inset-x-0 top-[calc(4rem+env(safe-area-inset-top))] bottom-0 z-40 overflow-y-auto border-t border-line bg-bg nav:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <div className="container-page flex min-h-full flex-col justify-between gap-10 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
              <nav aria-label={t("label")}>
                <ul className="flex flex-col">
                  {sectionIds.map((id, index) => (
                    <motion.li
                      key={id}
                      className="border-b border-line"
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: reduce ? 0 : 0.03 * index, ease: EASE }}
                    >
                      <a
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={`#${id}`}
                        onClick={() => closeMenu(false)}
                        aria-current={active === id ? "true" : undefined}
                        className="flex min-h-16 items-center justify-between gap-4 text-[1.75rem] font-semibold tracking-[-0.03em] text-fg aria-[current=true]:text-fg"
                      >
                        <span>{t(id)}</span>
                        <span
                          aria-hidden="true"
                          data-active={active === id}
                          className="size-2.5 rounded-[1px] border border-line-strong data-[active=true]:border-accent-line data-[active=true]:bg-accent"
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="flex flex-col gap-4">
                <p className="label-mono text-fg-subtle">{t("language")}</p>
                <LanguageSwitcher size="lg" onSelect={() => closeMenu(false)} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function NavLink({ id, label, active }: { id: SectionId; label: string; active: boolean }) {
  return (
    <a
      href={`#${id}`}
      aria-current={active ? "true" : undefined}
      className="group relative inline-flex min-h-10 items-center rounded-sm px-3 text-sm text-fg-muted transition-colors duration-200 hover:text-fg aria-[current=true]:text-fg"
    >
      {label}
      <span
        aria-hidden="true"
        className="absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-accent-line transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-x-100 group-aria-[current=true]:scale-x-100"
      />
    </a>
  );
}
