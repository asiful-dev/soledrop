"use client";

import { motion } from "framer-motion";
import {
  ShieldIcon,
  TruckIcon,
  LockIcon,
  BellIcon,
} from "@phosphor-icons/react";

const FEATURES = [
  {
    title: "Verified Kicks",
    description: "Every listing is reviewed so you can shop confidently.",
    icon: ShieldIcon,
  },
  {
    title: "Lightning Fast Delivery",
    description: "Quick shipping so your next pair lands without delay.",
    icon: TruckIcon,
  },
  {
    title: "Secure Checkout",
    description: "Protected payments with trusted checkout flow.",
    icon: LockIcon,
  },
  {
    title: "Drop Alerts",
    description: "Get notified before the next hyped release goes live.",
    icon: BellIcon,
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-bold text-white sm:text-3xl">
          Why SoleDrop
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:border-primary hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-primary)_20%,transparent)]"
              >
                <Icon className="h-5 w-5 text-accent" />
                <h3 className="mt-3 text-base font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
