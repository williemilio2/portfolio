"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "error";

export function CopyButton({ value }: { value: string }) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2400);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-line px-3.5 text-sm text-fg-muted transition-[color,border-color,transform] duration-200 hover:border-line-strong hover:text-fg active:scale-[0.98]"
      >
        {status === "copied" ? (
          <CheckIcon aria-hidden="true" size={16} weight="bold" className="text-accent-text" />
        ) : (
          <CopyIcon aria-hidden="true" size={16} />
        )}
        <span>{status === "copied" ? t("copied") : t("copy")}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" ? t("copied") : status === "error" ? t("copyError") : ""}
      </span>
      {status === "error" ? <span className="text-sm text-fg-muted">{t("copyError")}</span> : null}
    </>
  );
}
