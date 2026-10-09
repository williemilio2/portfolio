import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#080b0f",
          color: "#e8ecf1",
          backgroundImage:
            "linear-gradient(to right, rgba(232,236,241,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(232,236,241,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              background: "#e8ecf1",
              color: "#080b0f",
              fontSize: 24,
              fontWeight: 700,
              borderRadius: 4,
            }}
          >
            EGC
          </div>
          <div style={{ width: 14, height: 14, background: "#d4ff3a" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 40, color: "#a1aab6", letterSpacing: -1 }}>{t("ogTagline")}</div>
        </div>
        <div style={{ display: "flex", height: 4, width: 240, background: "#d4ff3a" }} />
      </div>
    ),
    size,
  );
}
