"use client";

import { useMemo, useState } from "react";
import type { Item } from "@/lib/db/schema";
import { useItems } from "@/features/items/hooks/useItems";
import { useItemSearch } from "@/features/items/hooks/useItemSearch";
import ItemCard from "@/features/items/components/ItemCard";
import ItemFilters from "@/features/items/components/ItemFilters";
import SkeletonCard from "@/components/shared/SkeletonCard";

export default function ItemsPage() {
  const { items, loading, error } = useItems();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const searched = useItemSearch(items, query);

  const filtered = useMemo(() => {
    let result = searched;

    if (category !== "All") {
      result = result.filter((item) => item.category === category);
    }

    switch (sort) {
      case "price_asc":
        result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price_desc":
        result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "rating":
        result = [...result].sort(
          (a, b) => Number(b.rating) - Number(a.rating),
        );
        break;
      default:
        result = [...result].sort(
          (a, b) =>
            new Date(String(b.createdAt)).getTime() -
            new Date(String(a.createdAt)).getTime(),
        );
        break;
    }

    return result;
  }, [searched, category, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="mb-1 text-3xl font-bold text-foreground">All Drops</h1>
        <p className="text-sm text-muted">{filtered.length} pairs found</p>
      </div>

      <div className="mb-6">
        <ItemFilters
          query={query}
          category={category}
          sort={sort}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
          onSortChange={setSort}
        />
      </div>

      {error && <div className="py-12 text-center text-red-400">{error}</div>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : filtered.map((item: Item, index: number) => (
              <ItemCard key={item.id} item={item} index={index} />
            ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="py-20 text-center">
          <div className="mb-4 text-5xl">🫥</div>
          <p className="text-muted">
            No drops matching your vibe. Try different filters.
          </p>
        </div>
      )}
    </div>
  );
}
