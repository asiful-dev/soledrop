"use client";

import { useEffect, useState } from "react";
import type { Item } from "@/lib/db/schema";

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/items");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data: Item[] = await res.json();
        setItems(data);
      } catch {
        setError("Failed to load items");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  const deleteItem = async (id: string) => {
    const res = await fetch(`/api/items/${id}`, { method: "DELETE" });

    if (res.ok) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return { items, loading, error, deleteItem };
}
