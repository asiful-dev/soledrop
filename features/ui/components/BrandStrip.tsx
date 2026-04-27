"use client";

import {
  SiNike,
  SiAdidas,
  SiJordan,
  SiNewbalance,
  SiPuma,
} from "@icons-pack/react-simple-icons";

const BRANDS = [
  { name: "Nike", Icon: SiNike },
  { name: "Adidas", Icon: SiAdidas },
  { name: "Jordan", Icon: SiJordan },
  { name: "New Balance", Icon: SiNewbalance },
  { name: "Puma", Icon: SiPuma },
] as const;

export default function BrandStrip() {
  return (
    <section className="bg-surface border-y border-border py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase text-center mb-10">
          SHOP BY BRAND
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-20 gap-y-8 px-4 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {BRANDS.map(({ name, Icon }) => (
            <span
              key={name}
              className="flex items-center gap-3 heading-display text-2xl md:text-3xl text-muted-foreground hover:text-accent cursor-pointer transition-colors"
            >
              <Icon className="h-8 w-8 md:h-10 md:w-10" />
              <span>{name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
