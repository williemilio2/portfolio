import Image, { type StaticImageData } from "next/image";

type BrowserFrameProps = {
  host: string;
  image: StaticImageData;
  alt: string;
  sizes: string;
  /** Captura larga: se recorre al pasar el cursor o al enfocar el proyecto */
  scrollable?: boolean;
  aspect?: string;
  className?: string;
};

/**
 * Ventana de navegador minimalista. La barra muestra el dominio real del proyecto.
 * El desplazamiento interno usa solo transform y se desactiva con movimiento reducido
 * y en dispositivos sin cursor.
 */
export function BrowserFrame({ host, image, alt, sizes, scrollable, aspect = "aspect-[16/10]", className = "" }: BrowserFrameProps) {
  return (
    <div className={`shadow-frame overflow-hidden rounded-md border border-line bg-bg-elevated ${className}`}>
      <div className="flex h-9 items-center gap-3 border-b border-line px-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-[1px] border border-line-strong" />
          <span className="size-2 rounded-[1px] border border-line-strong" />
          <span className="size-2 rounded-[1px] border border-line-strong" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-sm bg-surface px-2.5 py-0.5 text-center font-mono text-[0.6875rem] text-fg-subtle">
          {host}
        </span>
        <span aria-hidden="true" className="w-[2.375rem]" />
      </div>
      <div className={`relative overflow-hidden ${aspect} [container-type:size]`}>
        <div
          className={
            scrollable
              ? "transition-transform duration-[2600ms] ease-[cubic-bezier(0.45,0,0.2,1)] motion-safe:[@media(hover:hover)]:group-hover/case:[transform:translateY(calc(-100%+100cqh))] motion-safe:group-focus-within/case:[transform:translateY(calc(-100%+100cqh))]"
              : "transition-transform duration-700 ease-[var(--ease-out-quart)] motion-safe:[@media(hover:hover)]:group-hover/case:scale-[1.02]"
          }
        >
          <Image src={image} alt={alt} sizes={sizes} placeholder="blur" className="block h-auto w-full" />
        </div>
      </div>
    </div>
  );
}

type PhoneFrameProps = {
  image: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
};

/** Móvil sin adornos: bisel fino y pantalla con la captura real a 2x. */
export function PhoneFrame({ image, alt, sizes, className = "" }: PhoneFrameProps) {
  return (
    <div className={`shadow-frame rounded-[1.375rem] border border-line-strong bg-bg-elevated p-[5px] ${className}`}>
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.0625rem] bg-surface">
        <Image src={image} alt={alt} sizes={sizes} placeholder="blur" className="h-full w-full object-cover object-top" />
      </div>
    </div>
  );
}

type RouteTreeProps = {
  title: string;
  note: string;
  routes: readonly { depth: number; path: string }[];
  className?: string;
};

/** Árbol de rutas real de una aplicación, en formato de explorador de archivos. */
export function RouteTree({ title, note, routes, className = "" }: RouteTreeProps) {
  return (
    <figure className={`shadow-frame rounded-md border border-line bg-bg-elevated ${className}`}>
      <figcaption className="border-b border-line px-4 py-2.5 font-mono text-[0.6875rem] tracking-wide text-fg-subtle uppercase">
        {title}
      </figcaption>
      {/* Desplazable con teclado si no cabe en pantallas estrechas */}
      <ul tabIndex={0} aria-label={title} className="overflow-x-auto px-4 py-3.5 font-mono text-[0.75rem] leading-[1.9] sm:text-[0.8125rem]">
        {routes.map((route, index) => (
          <li key={`${route.path}-${index}`} className="flex whitespace-nowrap text-fg-muted">
            <span aria-hidden="true" className="text-line-strong">
              {route.depth > 0 ? `${"│  ".repeat(route.depth - 1)}├─ ` : ""}
            </span>
            <span className={route.path.includes("recursos") || route.path.includes("chat") ? "text-accent-text" : "text-fg"}>
              {route.path}
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-line px-4 py-2.5 text-xs leading-relaxed text-fg-subtle">{note}</p>
    </figure>
  );
}
