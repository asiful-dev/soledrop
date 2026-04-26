"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Input } from "@/shared/ui-components/controls/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui-components/controls/select";

const CATEGORIES = [
  "All",
  "Jordan",
  "Yeezy",
  "Nike",
  "Adidas",
  "New Balance",
  "Other",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

interface ItemFiltersProps {
  query: string;
  category: string;
  sort: string;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function ItemFilters({
  query,
  category,
  sort,
  onQueryChange,
  onCategoryChange,
  onSortChange,
}: ItemFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          placeholder="Search drops... (fuzzy search)"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="border-border bg-surface pl-9 text-white placeholder:text-muted"
        />
      </div>

      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full border-border bg-surface text-white sm:w-44">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="border-border bg-surface text-white">
          {CATEGORIES.map((categoryValue) => (
            <SelectItem key={categoryValue} value={categoryValue}>
              {categoryValue}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="w-full border-border bg-surface text-white sm:w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="border-border bg-surface text-white">
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
