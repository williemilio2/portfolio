import type { StaticImageData } from "next/image";

import suplementacionTall from "@/assets/projects/suplementacion-tall.webp";
import suplementacionMobile from "@/assets/projects/suplementacion-mobile.webp";
import carboomCatalogo from "@/assets/projects/carboom-catalogo.webp";
import carboomMobile from "@/assets/projects/carboom-mobile.webp";
import aulasDesktop from "@/assets/projects/aulas-desktop.webp";
import powerfittMobile from "@/assets/projects/powerfitt-mobile.webp";
import powerfittDesktop from "@/assets/projects/powerfitt-desktop.webp";
import efitecTall from "@/assets/projects/efitec-tall.webp";
import efitecMobile from "@/assets/projects/efitec-mobile.webp";

/**
 * Datos no traducibles de cada proyecto.
 * Los textos (descripción, problema, funcionalidades) viven en src/messages/<idioma>.json
 * bajo projects.items.<id>.
 *
 * Tecnologías: solo las verificadas en el package.json del repositorio público
 * de cada proyecto (github.com/williemilio2). Efitec no tiene repositorio público,
 * por eso no se declara su stack.
 *
 * Imágenes: capturas reales tomadas de cada web el 9 de octubre de 2026.
 */

export type ProjectId = "suplementacion" | "carboom" | "aulas" | "powerfitt" | "efitec";

export type Project = {
  id: ProjectId;
  url: string;
  host: string;
  repo: string | null;
  stack: readonly string[];
  /** Número de funcionalidades definidas en los mensajes (projects.items.<id>.features.<n>) */
  featureCount: number;
  images: {
    desktop: StaticImageData;
    mobile?: StaticImageData;
    /** true si la imagen de escritorio es una captura larga que se desplaza al pasar el ratón */
    scrollable?: boolean;
  };
};

export const projects: readonly Project[] = [
  {
    id: "suplementacion",
    url: "https://www.suplementaciondeportiva.es/",
    host: "suplementaciondeportiva.es",
    repo: "https://github.com/williemilio2/suplementaci-nDeportiva",
    stack: ["Next.js", "React", "TypeScript", "Prisma", "libSQL", "Stripe", "Zustand", "Framer Motion", "Vercel"],
    featureCount: 8,
    images: { desktop: suplementacionTall, mobile: suplementacionMobile, scrollable: true },
  },
  {
    id: "carboom",
    url: "https://www.carboom.es/",
    host: "carboom.es",
    repo: "https://github.com/williemilio2/ventaCoches",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Puppeteer", "Cheerio", "libSQL", "Vercel Cron"],
    featureCount: 5,
    images: { desktop: carboomCatalogo, mobile: carboomMobile },
  },
  {
    id: "aulas",
    url: "https://proyecto-marcas-five.vercel.app/",
    host: "proyecto-marcas-five.vercel.app",
    repo: "https://github.com/williemilio2/proyectoMarcas",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "libSQL", "JWT", "Nodemailer"],
    featureCount: 5,
    images: { desktop: aulasDesktop },
  },
  {
    id: "powerfitt",
    url: "https://reservaspowerfitt.onrender.com/",
    host: "reservaspowerfitt.onrender.com",
    repo: "https://github.com/williemilio2/ReservasPowerFitt",
    stack: ["Node.js", "Express", "JavaScript", "Socket.IO", "libSQL", "Nodemailer", "Render"],
    featureCount: 5,
    images: { desktop: powerfittDesktop, mobile: powerfittMobile },
  },
  {
    id: "efitec",
    url: "https://efitec.com.es/",
    host: "efitec.com.es",
    repo: null,
    stack: [],
    featureCount: 5,
    images: { desktop: efitecTall, mobile: efitecMobile, scrollable: true },
  },
];

/**
 * Rutas reales de la plataforma Aulas, extraídas de su repositorio (carpeta app/).
 * Se muestran porque la aplicación requiere iniciar sesión y solo el login es público.
 */
export const aulasRouteTree = [
  { depth: 0, path: "app/(dashboard)/" },
  { depth: 1, path: "buscarGrupos/" },
  { depth: 1, path: "grupos/[grupoId]/" },
  { depth: 2, path: "chat/" },
  { depth: 2, path: "asignaturas/[asignaturaId]/" },
  { depth: 3, path: "recursos/" },
  { depth: 3, path: "chat/" },
] as const;

/** Matriz de evidencias: qué tecnología aparece en qué proyecto (solo repos públicos). */
export const evidenceProjects = ["suplementacion", "carboom", "aulas", "powerfitt"] as const satisfies readonly ProjectId[];

export const techEvidence: readonly { tech: string; group: "front" | "back" | "data" | "integrations" | "deploy"; used: readonly ProjectId[] }[] = [
  { tech: "TypeScript", group: "front", used: ["suplementacion", "carboom", "aulas"] },
  { tech: "React", group: "front", used: ["suplementacion", "carboom", "aulas"] },
  { tech: "Next.js", group: "front", used: ["suplementacion", "carboom", "aulas"] },
  { tech: "Tailwind CSS", group: "front", used: ["carboom", "aulas"] },
  { tech: "Node.js + Express", group: "back", used: ["powerfitt"] },
  { tech: "Socket.IO", group: "back", used: ["powerfitt"] },
  { tech: "JWT", group: "back", used: ["suplementacion", "aulas", "powerfitt"] },
  { tech: "libSQL / Turso", group: "data", used: ["suplementacion", "carboom", "aulas", "powerfitt"] },
  { tech: "Prisma", group: "data", used: ["suplementacion"] },
  { tech: "Supabase", group: "data", used: ["aulas"] },
  { tech: "Stripe", group: "integrations", used: ["suplementacion"] },
  { tech: "Puppeteer + Cheerio", group: "integrations", used: ["carboom"] },
  { tech: "Nodemailer", group: "integrations", used: ["suplementacion", "aulas", "powerfitt"] },
  { tech: "Vercel", group: "deploy", used: ["suplementacion", "carboom", "aulas"] },
  { tech: "Render", group: "deploy", used: ["powerfitt"] },
];

/** Lenguajes y herramientas que Emilio declara dominar (información proporcionada por él). */
export const declaredSkills = ["Java", "Python", "Bash", "SQL", "Git"] as const;
