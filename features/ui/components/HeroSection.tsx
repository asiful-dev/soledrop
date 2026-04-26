"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui-components/controls/button";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden px-4 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-10 bottom-20 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl leading-tight font-black text-white sm:text-6xl">
            Drop Season is{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Every Season
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Discover the freshest sneaker drops, curated for the culture.
            Browse, flex, and cop your next pair.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              className="bg-primary hover:bg-primary-hover"
              size="lg"
              asChild
            >
              <Link href="/items">Browse Drops</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/items/add">Sell Your Kicks</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
