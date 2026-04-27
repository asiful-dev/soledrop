"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui-components/controls/button";
import { ArrowRight } from "@phosphor-icons/react";

// ─── Slide data ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 0,
    image: "/hero-1.jpg",
    eyebrow: "Nike · Just Dropped",
    headline: ["LEVEL UP", "YOUR SOLE"],
    accentLine: 1,
    sub: "The freshest Nike silhouettes, curated for the culture.",
  },
  {
    id: 1,
    image: "/hero-3.jpg",
    eyebrow: "Jordan · Limited Drop",
    headline: ["DROP SEASON", "IS NOW"],
    accentLine: 0,
    sub: "Iconic Jordan colourways you can actually cop.",
  },
  {
    id: 2,
    image: "/hero-3.jpeg",
    eyebrow: "Adidas · New Arrival",
    headline: ["FRESH FROM", "THE FACTORY"],
    accentLine: 1,
    sub: "Adidas Samba OG — the silhouette that never left.",
  },
  {
    id: 3,
    image: "/hero-4.jpg",
    eyebrow: "New Balance · Made in USA",
    headline: ["MADE IN", "THE USA"],
    accentLine: 0,
    sub: "New Balance 990v6 — craftsmanship that outlasts hype.",
  },
];

const AUTOPLAY_MS = 4500;
const NAV_COOLDOWN_MS = 450;
const TRACKPAD_THRESHOLD = 24;
const EASE_STANDARD: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SMOOTH: [number, number, number, number] = [0.32, 0, 0.1, 1];
const EASE_IN: [number, number, number, number] = [0.42, 0, 1, 1];

// ─── Animation variants ────────────────────────────────────────────────────────
const imageVariants = {
  enter: { opacity: 0, scale: 1.04 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

const eyebrowVariants = {
  enter: { opacity: 0, x: -10 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_STANDARD, delay: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const headlineVariants = {
  enter: { opacity: 0, y: 20 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_STANDARD },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.35, ease: EASE_IN },
  },
};

const subVariants = {
  enter: { opacity: 0, y: 12 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_STANDARD, delay: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

// ─── Component ─────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastNavAtRef = useRef(0);

  const slide = SLIDES[current];

  const canNavigate = useCallback(() => {
    const now = Date.now();
    if (now - lastNavAtRef.current < NAV_COOLDOWN_MS) {
      return false;
    }

    lastNavAtRef.current = now;
    return true;
  }, []);

  const goPrev = useCallback(() => {
    if (!canNavigate()) {
      return;
    }

    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, [canNavigate]);

  const goNext = useCallback(() => {
    if (!canNavigate()) {
      return;
    }

    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, [canNavigate]);

  // Autoplay — pauses on hover, resumes on mouse leave
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(goNext, AUTOPLAY_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      const isTypingField =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable;

      if (isTypingField) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const handleWheelNavigation = (event: React.WheelEvent<HTMLElement>) => {
    const horizontalIntent =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : 0;

    if (Math.abs(horizontalIntent) < TRACKPAD_THRESHOLD) {
      return;
    }

    event.preventDefault();

    if (horizontalIntent > 0) {
      goNext();
      return;
    }

    goPrev();
  };

  return (
    <section
      className="relative flex min-h-[calc(100vh-64px)] overflow-hidden bg-background flex-col lg:flex-row"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onWheel={handleWheelNavigation}
    >
      {/* ── LEFT: Text content ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-16 lg:px-16 lg:py-0">
        <div className="max-w-lg">
          {/* Eyebrow */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`eyebrow-${current}`}
              variants={eyebrowVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
            >
              <span className="h-px w-6 shrink-0 bg-accent" />
              {slide.eyebrow}
            </motion.p>
          </AnimatePresence>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`headline-${current}`}
              variants={headlineVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="heading-display leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 6.5vw, 6rem)" }}
            >
              {slide.headline.map((line, i) => (
                <span
                  key={i}
                  className={`block ${
                    i === slide.accentLine ? "text-primary" : "text-foreground"
                  }`}
                >
                  {line}
                </span>
              ))}
            </motion.h1>
          </AnimatePresence>

          {/* Subtext */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${current}`}
              variants={subVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground"
            >
              {slide.sub}
            </motion.p>
          </AnimatePresence>

          {/* CTAs — static, always visible */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              className="group h-11 bg-primary px-7 text-[11px] font-bold uppercase tracking-wider hover:bg-primary/90"
              asChild
            >
              <Link href="/items" className="flex items-center gap-2">
                Shop Drops
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-11 border-border px-7 text-[11px] font-bold uppercase tracking-wider hover:border-foreground hover:text-foreground"
              asChild
            >
              <Link href="/items/add">Sell Your Kicks</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Image carousel ──────────────────────────────────────── */}
      <div className="relative h-[55vw] flex-1 overflow-hidden lg:h-auto">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`img-${current}`}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.headline.join(" ")}
              fill
              className="object-cover object-center"
              priority={current === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Left fade — bleeds into text column on desktop */}
            <div className="absolute inset-0 hidden bg-linear-to-r from-background via-background/10 to-transparent lg:block" />
            {/* Bottom fade — on mobile */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent lg:hidden" />
            {/* Top vignette */}
            <div className="absolute inset-0 bg-linear-to-b from-background/20 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
