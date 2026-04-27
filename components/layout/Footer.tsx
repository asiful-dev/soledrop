"use client";

import Image from "next/image";
import Link from "next/link";
import {
  GlobeIcon,
  PaperPlaneIcon,
  CameraIcon,
} from "@phosphor-icons/react/ssr";
import { useTheme } from "next-themes";

const FOOTER_LINKS = {
  Shop: [
    { label: "All Drops", href: "/items" },
    { label: "New Arrivals", href: "/items?sort=new" },
    { label: "Brands", href: "#" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "#" },
    { label: "Shipping", href: "#" },
  ],
  Social: [
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Discord", href: "#" },
  ],
};

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;
  const logoSrc = isDark ? "/dark.png" : "/light.png";

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center">
              <Image
                src={logoSrc}
                alt="SoleDrop"
                width={120}
                height={42}
                className="h-auto w-auto"
                priority
              />
            </Link>

            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              SoleDrop is the trusted marketplace for verified sneaker drops.
              Clean curation, premium listings, and a better way to shop kicks.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {[GlobeIcon, PaperPlaneIcon, CameraIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                {heading}
              </h4>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              © {new Date().getFullYear()} SoleDrop. All rights reserved.
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Verified kicks only
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
