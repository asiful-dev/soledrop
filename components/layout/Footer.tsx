import Link from "next/link";
import {
  LightningIcon,
  GlobeIcon,
  PaperPlaneIcon,
  CameraIcon,
} from "@phosphor-icons/react/ssr";

const FOOTER_LINKS = {
  Shop: [
    { label: "All Drops", href: "/items" },
    { label: "New Arrivals", href: "/items?sort=new" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="mb-3 flex items-center gap-2 text-xl font-bold"
            >
              <LightningIcon className="h-5 w-5 text-accent" />
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                SoleDrop
              </span>
            </Link>
            <p className="max-w-xs text-sm text-muted">
              Fresh kicks, no cap. Your go-to spot for the dopest sneaker drops.
            </p>
            <div className="mt-4 flex gap-4">
              {[GlobeIcon, PaperPlaneIcon, CameraIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-muted transition-colors duration-200 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="mb-3 text-sm font-semibold text-white">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} SoleDrop. All rights reserved. Built with
          🔥
        </div>
      </div>
    </footer>
  );
}
