"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Item } from "@/lib/db/schema";
import { Button } from "@/shared/ui-components/controls/button";
import { Badge } from "@/shared/ui-components/controls/badge";

interface ItemCardProps {
  item: Item;
  index?: number;
}

export default function ItemCard({ item, index = 0 }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative h-52 overflow-hidden bg-background">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            👟
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-primary/90 text-white text-xs">
          {item.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
            {item.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted">
            {item.shortDescription}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-accent">
            ${Number(item.price).toFixed(2)}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="border-border text-xs hover:border-primary hover:text-primary"
            asChild
          >
            <Link href={`/items/${item.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
