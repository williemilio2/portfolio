import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-sm px-5 text-[0.9375rem] font-medium tracking-[-0.005em] transition-[transform,background-color,border-color,color] duration-200 ease-[var(--ease-out-quart)] active:scale-[0.98] active:duration-100 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[inset_0_-1px_0_rgb(0_0_0/0.18)] hover:bg-[color-mix(in_oklab,var(--accent)_88%,white)]",
  secondary: "border border-line-strong text-fg hover:border-fg hover:bg-surface/60",
  ghost: "px-0 text-fg-muted hover:text-fg min-h-11",
};

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  icon?: ReactNode;
  /** Mueve el icono ligeramente al pasar el cursor (flechas) */
  nudge?: "right" | "up-right" | "down";
  newTabLabel?: string;
};

const nudgeClass = {
  right: "group-hover/btn:translate-x-0.5",
  "up-right": "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5",
  down: "group-hover/btn:translate-y-0.5",
};

export function ButtonLink({ variant = "primary", icon, nudge, className = "", children, newTabLabel, ...rest }: Props) {
  const external = rest.target === "_blank";
  return (
    <a
      {...rest}
      rel={external ? "noopener noreferrer" : rest.rel}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {external && newTabLabel ? <span className="sr-only">{newTabLabel}</span> : null}
      {icon ? (
        <span
          aria-hidden="true"
          className={`inline-flex transition-transform duration-200 ease-[var(--ease-out-quart)] ${nudge ? nudgeClass[nudge] : ""}`}
        >
          {icon}
        </span>
      ) : null}
    </a>
  );
}
