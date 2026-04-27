"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/shared/ui-components/controls/badge";
import { Button } from "@/shared/ui-components/controls/button";
import type { Item } from "@/lib/db/schema";

interface ItemCardProps {
  item: Item;
}

const NEW_ITEM_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const NEW_ITEM_CUTOFF = Date.now() - NEW_ITEM_WINDOW_MS;

export default function ItemCard({ item }: ItemCardProps) {
  const isNew = React.useMemo(
    () => new Date(item.createdAt || 0).getTime() > NEW_ITEM_CUTOFF,
    [item.createdAt],
  );

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 card-border-hover cursor-pointer w-full">
      <Link href={`/items/${item.id}`} className="block">
        <div className="relative h-56 bg-background overflow-hidden">
          {item.imageUrl ? (
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl">
              👟
            </div>
          )}
          <Badge className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-border dark:text-accent text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
            {item.category}
          </Badge>
          {/* Subtle new indicator */}
          {isNew && (
            <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-accent" />
          )}
        </div>

        <div className="p-4">
          <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
            {item.brand}
          </span>
          <h3 className="line-clamp-1 font-bold text-foreground text-[15px] mt-0.5 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="line-clamp-2 text-xs text-muted-foreground mt-1 leading-relaxed">
            {item.shortDescription}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="price-tag text-lg text-accent">
              ${Number(item.price).toFixed(2)}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-border bg-transparent text-[10px] font-bold uppercase tracking-wider text-white hover:bg-primary hover:border-primary transition-all px-3"
            >
              VIEW →
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
