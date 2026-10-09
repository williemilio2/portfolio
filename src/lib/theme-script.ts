export const THEME_STORAGE_KEY = "egc-theme";

/**
 * Se ejecuta en <head> antes del primer pintado: aplica la preferencia guardada
 * o, si no existe, el tema del sistema. Evita el parpadeo al cargar.
 */
export const themeInitScript = `(function(){try{var k='${THEME_STORAGE_KEY}';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`;
