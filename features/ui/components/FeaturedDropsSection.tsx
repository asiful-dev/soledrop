"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import type { Item } from "@/lib/db/schema";
import { Button } from "@/shared/ui-components/controls/button";
import { Badge } from "@/shared/ui-components/controls/badge";
import SkeletonCard from "@/components/shared/SkeletonCard";

export default function FeaturedDropsSection() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadItems() {
      try {
        const response = await fetch("/api/items?limit=6");
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
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Featured Drops
          </h2>
          <Link
            href="/items"
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover"
          >
            View All Drops <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : items.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-primary/50"
                >
                  <div className="relative h-52 bg-background">
                    {item.imageUrl ? (
                      <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl">
                        👟
                      </div>
                    )}
                    <Badge className="absolute top-3 left-3 bg-primary/90 text-white">
                      {item.category}
                    </Badge>
                  </div>

                  <div className="space-y-3 p-4">
                    <h3 className="line-clamp-1 font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted">
                      {item.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-accent">
                        ${Number(item.price).toFixed(2)}
                      </span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/items">View</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
