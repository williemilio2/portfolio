/**
 * Datos personales y de configuración del portfolio.
 * Todo lo que aparece aquí ha sido proporcionado por Emilio.
 * Los valores marcados con PENDIENTE deben completarse antes de publicar.
 */

export const siteConfig = {
  name: "Emilio González Cánovas",
  shortName: "EGC",

  /**
   * PENDIENTE: dominio definitivo de producción.
   * Se usa para la URL canónica, el sitemap, Open Graph y los datos estructurados.
   * Defínelo con la variable de entorno NEXT_PUBLIC_SITE_URL (sin barra final).
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  contact: {
    email: "emilio.gonzalezcanovas@gmail.com",
    phone: "+34611690405",
    phoneDisplay: "+34 611 69 04 05",
    linkedin: "https://www.linkedin.com/in/emilio-gonzalez",
    github: "https://github.com/williemilio2",
    githubHandle: "williemilio2",
    location: "Calle Padre Eloy de Orihuela, 2",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Calle Padre Eloy de Orihuela 2"),
  },

  /**
   * PENDIENTE: foto de Emilio.
   * Coloca la imagen en /public (por ejemplo /public/emilio.webp, proporción 4:5)
   * y escribe aquí su ruta: photo: "/emilio.webp".
   * Mientras sea null se muestra el marco con el monograma.
   */
  photo: "/fotoMia.webp" as string | null,

  /** Emilio busca empleo y proyectos freelance (confirmado por él). */
  openToWork: true,
} as const;

export const sectionIds = ["home", "about", "projects", "stack", "education", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];
