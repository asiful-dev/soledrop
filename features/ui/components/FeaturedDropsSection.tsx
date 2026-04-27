"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import type { Item } from "@/lib/db/schema";
import ItemCard from "@/components/shared/ItemCard";
import SkeletonCard from "@/components/shared/SkeletonCard";

export default function FeaturedDropsSection() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadItems() {
      try {
        const response = await fetch("/api/items?limit=8");
        if (!response.ok) return;
        const data: Item[] = await response.json();
        if (mounted) {
          setItems(data);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground">
              Featured Drops
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              This week&apos;s freshest pairs
            </p>
          </div>
          <Link
            href="/items"
            className="group inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-wider text-primary hover:text-primary-hover transition-all"
          >
            VIEW ALL DROPS{" "}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : items.map((item) => <ItemCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}
