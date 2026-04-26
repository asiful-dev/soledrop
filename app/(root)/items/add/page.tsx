"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { itemSchema, type ItemFormData } from "@/lib/validations/item";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/shared/ui-components/controls/button";
import { Input } from "@/shared/ui-components/controls/input";
import { Label } from "@/shared/ui-components/controls/label";
import { Textarea } from "@/shared/ui-components/controls/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui-components/controls/select";

const CATEGORIES = [
  "Jordan",
  "Yeezy",
  "Nike",
  "Adidas",
  "New Balance",
  "Other",
] as const;

type ItemFormInput = z.input<typeof itemSchema>;

export default function AddItemPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<ItemFormInput["category"]>("Jordan");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ItemFormInput, unknown, ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      category: "Jordan",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return null;
  }

  const onSubmit = async (data: ItemFormData) => {
    if (!user.email) {
      toast.error("Your account email is missing. Please use another account.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          authorId: user.uid,
          authorEmail: user.email,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error || "Failed to add item");
      }

      toast.success("Drop added! 🔥 Your item is live.");
      router.push("/items/manage");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-surface p-8"
      >
        <h1 className="mb-1 text-2xl font-bold text-white">Add a Drop 🔥</h1>
        <p className="mb-8 text-sm text-muted">
          List your kicks for the culture
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <Label className="text-sm text-muted">Title</Label>
            <Input placeholder="Nike Air Max 97" {...register("title")} />
            {errors.title && (
              <p className="text-xs text-red-400">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-muted">Short Description</Label>
            <Input
              placeholder="A clean daily pair with premium comfort"
              {...register("shortDescription")}
            />
            {errors.shortDescription && (
              <p className="text-xs text-red-400">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-muted">Full Description</Label>
            <Textarea
              placeholder="Share the story and details behind this drop"
              {...register("fullDescription")}
            />
            {errors.fullDescription && (
              <p className="text-xs text-red-400">
                {errors.fullDescription.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-sm text-muted">Price ($)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="199.99"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-xs text-red-400">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-sm text-muted">Category</Label>
              <Select
                value={category}
                onValueChange={(value) => {
                  const selectedCategory = value as ItemFormInput["category"];
                  setCategory(selectedCategory);
                  setValue("category", selectedCategory, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-red-400">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-sm text-muted">Brand</Label>
              <Input placeholder="Nike" {...register("brand")} />
              {errors.brand && (
                <p className="text-xs text-red-400">{errors.brand.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-sm text-muted">Size (optional)</Label>
              <Input type="number" placeholder="10" {...register("size")} />
              {errors.size && (
                <p className="text-xs text-red-400">{errors.size.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-muted">Image URL (optional)</Label>
            <Input
              placeholder="https://example.com/sneaker.jpg"
              {...register("imageUrl")}
            />
            {errors.imageUrl && (
              <p className="text-xs text-red-400">{errors.imageUrl.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary font-semibold hover:bg-primary-hover"
          >
            {loading ? "Publishing..." : "Publish Drop"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
