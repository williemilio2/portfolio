import {
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";
import { getTranslations } from "next-intl/server";

import { CopyButton } from "@/components/ui/CopyButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

export async function Contact() {
  const [t, tA11y] = await Promise.all([getTranslations("contact"), getTranslations("a11y")]);
  const { contact } = siteConfig;

  const channels = [
    { key: "email", Icon: EnvelopeSimpleIcon, label: t("email"), value: contact.email, href: `mailto:${contact.email}`, external: false },
    { key: "phone", Icon: PhoneIcon, label: t("phone"), value: contact.phoneDisplay, href: `tel:${contact.phone}`, external: false },
    { key: "linkedin", Icon: LinkedinLogoIcon, label: t("linkedin"), value: "in/emilio-gonzalez", href: contact.linkedin, external: true },
    { key: "github", Icon: GithubLogoIcon, label: t("github"), value: `@${contact.githubHandle}`, href: contact.github, external: true },
    { key: "location", Icon: MapPinIcon, label: t("location"), value: contact.location, href: contact.mapsUrl, external: true },
  ] as const;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative pt-24 pb-20 md:pt-32 lg:pt-40">
      <div className="container-page">
        <div className="trace-content">
          <SectionHeading id="contact" title={t("title")}>
            <p>{t("text")}</p>
          </SectionHeading>

          {/* Llamada a la acción principal: el correo, en grande */}
          <Reveal delay={0.1} className="mt-12 flex flex-col items-start gap-5">
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex max-w-full items-center gap-3 rounded-sm text-[clamp(1rem,4.6vw,3.5rem)] leading-[1.15] font-semibold tracking-[-0.035em] [overflow-wrap:anywhere] text-fg"
            >
              <span className="relative -mx-1 px-1">
                {/* Subrayado que se convierte en relleno: solo se anima transform */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-[0.05] bg-accent-line transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-y-100 motion-reduce:transition-none"
                />
                <span className="relative transition-colors duration-300 group-hover:text-accent-ink">{contact.email}</span>
              </span>
              <ArrowUpRightIcon
                aria-hidden="true"
                weight="bold"
                className="size-[0.8em] shrink-0 text-accent-text transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
            <div className="flex flex-wrap items-center gap-3">
              <CopyButton value={contact.email} />
            </div>
          </Reveal>

          {/* Canales */}
          <Reveal delay={0.15} className="mt-20">
            <h3 className="sr-only">{t("channelsLabel")}</h3>
            <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
              {channels.map(({ key, Icon, label, value, href, external }) => (
                <li key={key} className={`bg-bg ${key === "email" ? "sm:col-span-2" : ""}`}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex h-full min-h-28 flex-col justify-between gap-6 p-5 transition-colors duration-200 hover:bg-bg-elevated"
                  >
                    <span className="flex items-center justify-between">
                      <Icon
                        aria-hidden="true"
                        size={24}
                        weight="regular"
                        className="text-fg-muted transition-colors duration-200 group-hover:text-accent-text"
                      />
                      <ArrowUpRightIcon
                        aria-hidden="true"
                        size={16}
                        className="text-fg-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                    <span>
                      <span className="label-mono block text-fg-subtle">{label}</span>
                      <span className="mt-1.5 block text-[0.9375rem] [overflow-wrap:anywhere] text-fg">{value}</span>
                      {external ? <span className="sr-only">{tA11y("newTab")}</span> : null}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
