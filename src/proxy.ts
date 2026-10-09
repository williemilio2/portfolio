import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // En la raíz se respeta el idioma que el usuario eligió explícitamente;
  // si no hay preferencia guardada, next-intl redirige al español.
  if (request.nextUrl.pathname === "/") {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    if (saved && saved !== routing.defaultLocale && (routing.locales as readonly string[]).includes(saved)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${saved}`;
      return NextResponse.redirect(url);
    }
  }

  return intlProxy(request);
}

export const config = {
  // Excluye API, archivos internos de Next y cualquier ruta con extensión
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
