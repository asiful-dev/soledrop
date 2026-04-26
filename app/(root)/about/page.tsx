import type { Metadata } from "next";
import { Shield, Truck, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About — SoleDrop",
};

const STATS = [
  { value: "10K+", label: "Sneakerheads" },
  { value: "5K+", label: "Drops Listed" },
  { value: "50+", label: "Brands" },
  { value: "99%", label: "No Cap Guarantee" },
];

const TEAM = [
  { name: "Kai Reeves", role: "Founder & Sole-Keeper", emoji: "👟" },
  { name: "Zara Moon", role: "Head of Drops", emoji: "🔥" },
  { name: "Dev Niles", role: "Tech Wizard", emoji: "⚡" },
];

const VALUES = [
  {
    title: "Culture First",
    description: "Built by sneakerheads, for sneakerheads.",
    icon: Users,
  },
  {
    title: "Verified Drops",
    description: "Every listing is reviewed for quality and trust.",
    icon: Shield,
  },
  {
    title: "Fast Experience",
    description: "Smooth browsing, quick listing, faster checkout.",
    icon: Truck,
  },
  {
    title: "Always Fresh",
    description: "New heat lands daily across top brands.",
    icon: Zap,
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-16 text-center">
        <div className="mb-4 text-5xl">👟</div>
        <h1 className="mb-4 text-4xl font-black text-white">
          About{" "}
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            SoleDrop
          </span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-muted">
          We built SoleDrop for the culture. No bots, no resellers getting a
          head start — just real sneakerheads copping fire kicks at fair prices.
        </p>
      </div>

      <div className="mb-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-surface p-6 text-center transition-colors duration-300 hover:border-primary/50"
          >
            <div className="text-3xl font-black text-accent">{value}</div>
            <div className="mt-1 text-sm text-muted">{label}</div>
          </div>
        ))}
      </div>

      <div className="mb-12 rounded-2xl border border-border bg-surface p-8">
        <h2 className="mb-3 text-xl font-bold text-white">Our Mission</h2>
        <p className="leading-relaxed text-muted">
          SoleDrop started in a dorm room with one goal: make sneaker culture
          accessible. We&apos;re sick of bots clearing out drops in
          milliseconds. Here, every user gets a fair shot. We verify listings,
          keep the community tight, and make sure every drop is the real deal.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-xl font-bold text-white">What We Stand For</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {VALUES.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-primary/40"
            >
              <Icon className="h-5 w-5 text-accent" />
              <h3 className="mt-3 text-base font-semibold text-white">
                {title}
              </h3>
              <p className="mt-1 text-sm text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-xl font-bold text-white">The Team</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TEAM.map(({ name, role, emoji }) => (
            <div
              key={name}
              className="rounded-xl border border-border bg-surface p-6 text-center transition-colors duration-300 hover:border-primary/30"
            >
              <div className="mb-3 text-4xl">{emoji}</div>
              <div className="font-semibold text-white">{name}</div>
              <div className="mt-1 text-xs text-muted">{role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
