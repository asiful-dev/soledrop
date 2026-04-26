"use client";

import { useMemo } from "react";
import Fuse from "fuse.js";
import type { Item } from "@/lib/db/schema";

const fuseOptions = {
  keys: ["title", "shortDescription", "brand", "category"],
  threshold: 0.35,
  includeScore: true,
};

export function useItemSearch(items: Item[], query: string) {
  const fuse = useMemo(() => new Fuse(items, fuseOptions), [items]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return items;
    }

    return fuse.search(query).map((result) => result.item);
  }, [fuse, query, items]);

  return results;
}
