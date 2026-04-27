"use client";

import {
  ShieldIcon,
  TruckIcon,
  LockIcon,
  BellIcon,
} from "@phosphor-icons/react";

const FEATURES = [
  {
    title: "Verified Kicks",
    description:
      "Every listing is reviewed by our team of experts so you can shop with absolute confidence. No fakes allowed.",
    icon: ShieldIcon,
  },
  {
    title: "Lightning Fast Delivery",
    description:
      "We work with top-tier logistics partners to ensure your new pair lands on your doorstep without delay.",
    icon: TruckIcon,
  },
  {
    title: "Secure Checkout",
    description:
      "Your data and payments are protected with industry-leading encryption and trusted checkout flows.",
    icon: LockIcon,
  },
  {
    title: "Drop Alerts",
    description:
      "Never miss a hype release again. Get real-time notifications before the most anticipated drops go live.",
    icon: BellIcon,
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-4 py-24 sm:px-6 bg-background">
      <div className="mx-auto max-w-7xl">
        <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-16 px-4 border-l-4 border-primary">
          Why SoleDrop
        </h2>

        <div className="flex flex-col">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            const number = (index + 1).toString().padStart(2, "0");

            return (
              <div
                key={feature.title}
                className="group flex flex-col md:flex-row items-start md:items-center py-10 md:py-14 border-t border-border last:border-b transition-colors hover:bg-surface/50 px-4"
              >
                {/* Left Column: Number & Title */}
                <div className="w-full md:w-[40%] flex items-center gap-8 mb-6 md:mb-0">
                  <div className="relative shrink-0">
                    <span className="heading-display text-8xl md:text-[120px] text-border/40 group-hover:text-primary/20 transition-colors select-none">
                      {number}
                    </span>
                    <Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                </div>

                {/* Right Column: Description */}
                <div className="w-full md:w-[60%] md:pl-12">
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
