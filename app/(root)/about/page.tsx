"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ShieldIcon,
  TruckIcon,
  UsersIcon,
  LightningIcon,
} from "@phosphor-icons/react";

// ─── Static metadata export won't work in a client component.
// Move metadata to a separate layout.ts or keep a wrapper server component.
// export const metadata: Metadata = { title: "About — SoleDrop" };

const STATS = [
  { value: "10K+", label: "Sneakerheads" },
  { value: "5K+", label: "Drops Listed" },
  { value: "50+", label: "Brands" },
  { value: "99%", label: "No Cap Guarantee" },
];

const TEAM = [
  {
    name: "Kai Reeves",
    role: "Founder & Sole-Keeper",
    image: "/kai-reevs.jpeg",
  },
  {
    name: "Zara Moon",
    role: "Head of Drops",
    image: "/zara-moon.jpeg",
  },
  {
    name: "Dev Niles",
    role: "Tech Wizard",
    image: "/dev-niles.jpeg",
  },
];

const VALUES = [
  {
    title: "Culture First",
    description:
      "We're not a corporation cosplaying as a sneaker brand. We're sneakerheads who built a tool we needed.",
    icon: UsersIcon,
    color: "from-violet-500/20 to-violet-500/5",
    accent: "text-violet-400",
    border: "group-hover:border-violet-500/40",
  },
  {
    title: "Verified Drops",
    description:
      "Every listing is reviewed. Every seller is accountable. No fakes, no flakes, no excuses.",
    icon: ShieldIcon,
    color: "from-lime-400/20 to-lime-400/5",
    accent: "text-lime-400",
    border: "group-hover:border-lime-500/40",
  },
  {
    title: "Fast Experience",
    description:
      "Smooth browsing, instant filtering, zero friction from discovery to checkout.",
    icon: TruckIcon,
    color: "from-sky-500/20 to-sky-500/5",
    accent: "text-sky-400",
    border: "group-hover:border-sky-500/40",
  },
  {
    title: "Always Fresh",
    description:
      "New heat lands daily. Set your alerts and be first when your size drops.",
    icon: LightningIcon,
    color: "from-amber-400/20 to-amber-400/5",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/40",
  },
];

// ─── Reusable fade-up animation wrapper ───────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-7 text-center"
    >
      {/* Glowing background blob */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        className="heading-display text-4xl text-accent"
      >
        {value}
      </motion.div>
      <div className="label-caps mt-2 text-[10px] text-muted-foreground">
        {label}
      </div>
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[92vh] items-center overflow-hidden"
      >
        {/* Parallax background image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="/about-hero.jpg"
            alt="Sneaker hero"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark gradient overlay — heavy on left, fades right */}
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-6xl px-4 py-28 sm:px-6"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="label-caps mb-5 flex items-center gap-2 text-[10px] text-accent"
          >
            <span className="inline-block h-px w-8 bg-accent" />
            About SoleDrop
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="heading-display max-w-2xl text-[clamp(3rem,8vw,6rem)] leading-[0.92] text-foreground"
          >
            BUILT FOR
            <br />
            <span className="text-primary">THE</span>{" "}
            <span className="text-accent">CULTURE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            No bots, no fake hype, no unfair head starts. Just verified kicks
            and a community that actually cares about the culture.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
              className="flex h-10 w-6 items-center justify-center rounded-full border border-border"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            </motion.div>
            <span className="label-caps text-[10px] text-muted-foreground">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FadeUp className="mb-10">
          <p className="label-caps mb-2 text-[10px] text-primary">
            By the numbers
          </p>
          <h2 className="heading-display text-3xl text-foreground sm:text-4xl">
            THE SCOREBOARD
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map(({ value, label }, i) => (
            <StatCard key={label} value={value} label={label} index={i} />
          ))}
        </div>
      </section>

      {/* ─── MISSION — Asymmetric split layout ─────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        {/* Faint vertical rule */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px bg-linear-to-b from-transparent via-border to-transparent lg:block" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text */}
            <FadeUp>
              <p className="label-caps mb-3 text-[10px] text-primary">
                Our Mission
              </p>
              <h2 className="heading-display text-3xl text-foreground sm:text-4xl lg:text-5xl">
                FAIR DROPS.
                <br />
                VERIFIED KICKS.
                <br />
                <span className="text-primary">EVERY TIME.</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                SoleDrop started with one goal: give real sneakerheads a fair
                shot. We&apos;re done watching bots clear drops in milliseconds.
                Every listing is reviewed, every seller is accountable, and
                every buyer gets a real opportunity.
              </p>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                We believe sneaker culture belongs to the people who actually
                wear the shoes — not to resellers running scripts from a
                datacenter.
              </p>
            </FadeUp>

            {/* Image collage */}
            <FadeUp delay={0.15} className="relative h-120">
              {/* Main image */}
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.4 }}
                className="absolute left-0 top-0 h-80 w-[75%] overflow-hidden rounded-2xl border border-border"
              >
                <Image
                  src="/image-collage-1.jpg"
                  alt="Jordan sneakers"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent" />
              </motion.div>

              {/* Secondary image — overlapping bottom right */}
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 right-0 h-65 w-[60%] overflow-hidden rounded-2xl border border-border"
                style={{ boxShadow: "0 0 0 4px hsl(var(--background))" }}
              >
                <Image
                  src="/image-collage-2.jpg"
                  alt="Sneaker collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent" />
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── VALUES ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FadeUp className="mb-10">
          <p className="label-caps mb-2 text-[10px] text-primary">
            Core Values
          </p>
          <h2 className="heading-display text-3xl text-foreground sm:text-4xl">
            WHAT WE STAND FOR
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-end">
          {VALUES.map(
            ({ title, description, icon: Icon, color, accent, border }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 transition-colors duration-300 ${border}`}
                >
                  {/* Gradient bg on hover */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${color} opacity-0 transition-opacity duration-400 group-hover:opacity-100`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 ${accent} transition-colors duration-300`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </motion.div>
              </FadeUp>
            ),
          )}
        </div>
      </section>

      {/* ─── TEAM ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FadeUp className="mb-10">
          <p className="label-caps mb-2 text-[10px] text-primary">People</p>
          <h2 className="heading-display text-3xl text-foreground sm:text-4xl">
            THE TEAM
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TEAM.map(({ name, role, image }, i) => (
            <FadeUp key={name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface/60"
              >
                {/* Photo */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Bottom fade */}
                  <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/20 to-transparent" />
                </div>

                {/* Info */}
                <div className="px-5 pb-6 pt-1">
                  <div className="font-semibold text-foreground">{name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {role}
                  </div>

                  {/* Animated underline accent */}
                  <motion.div
                    className="mt-4 h-0.5 w-0 rounded-full bg-primary"
                    whileInView={{ width: "2.5rem" }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ─── CLOSING CTA STRIP ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        {/* Background sneaker image, blurred */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/closing-cta-strip-image.jpeg"
            alt="Sneakers"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-background" />
        </div>

        <FadeUp className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="label-caps mb-4 text-[10px] text-accent">
            Ready to drop?
          </p>
          <h2 className="heading-display text-4xl text-foreground sm:text-5xl lg:text-6xl">
            JOIN THE CULTURE
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Create an account, browse the drops, and cop your next pair today.
          </p>
          <motion.a
            href="/items"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary/90"
          >
            Browse Drops
            <span className="text-base leading-none">→</span>
          </motion.a>
        </FadeUp>
      </section>
    </div>
  );
}
