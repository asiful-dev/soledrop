"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import {
  Image as ImageIcon,
  X as XIcon,
  Plus as PlusIcon,
  Info,
} from "@phosphor-icons/react";
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
  "Retro",
  "Classy",
  "Performance",
  "Lifestyle",
  "Luxury",
  "Other",
] as const;

type ItemFormInput = z.input<typeof itemSchema>;
type CategoryValue = (typeof CATEGORIES)[number];

interface CloudinaryUploadInfo {
  secure_url?: string;
  url?: string;
}

interface CloudinaryUploadResult {
  info?: CloudinaryUploadInfo | string;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong";
}

export default function AddItemPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ItemFormInput, unknown, ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      category: "Retro",
      imageUrl: "",
    },
  });

  const selectedCategory = useWatch({ control, name: "category" }) ?? "Retro";
  const imageUrl = useWatch({ control, name: "imageUrl" }) ?? "";

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return null;
  }

  const handleUploadSuccess = (result: CloudinaryUploadResult) => {
    const info = result.info;
    const secureUrl =
      info && typeof info !== "string"
        ? typeof info.secure_url === "string"
          ? info.secure_url
          : typeof info.url === "string"
            ? info.url
            : ""
        : "";

    if (!secureUrl) {
      toast.error("Upload finished but no image URL was returned.");
      return;
    }

    setValue("imageUrl", secureUrl, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    toast.success("Image uploaded successfully.");
  };

  const onSubmit = async (data: ItemFormData) => {
    if (!user.email) {
      toast.error("Account email missing. Please re-login.");
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

      toast.success("Drop published! 🚀");
      router.push("/items/manage");
    } catch (error: unknown) {
      console.error("ADD_ITEM_ERROR:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PlusIcon size={24} weight="bold" />
        </div>
        <h1 className="heading-display text-4xl text-foreground">
          PUBLISH A DROP
        </h1>
        <p className="mt-2 text-muted-foreground">
          List your premium kicks for the global culture.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl border border-border bg-surface/40 backdrop-blur-xl shadow-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Left Column: Visuals */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="label-caps text-xs text-muted-foreground">
                  PRODUCT VISUAL
                </Label>

                <AnimatePresence mode="wait">
                  {imageUrl ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-background"
                    >
                      <Image
                        src={imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() =>
                            setValue("imageUrl", "", {
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true,
                            })
                          }
                          className="h-10 w-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          <XIcon size={20} weight="bold" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <CldUploadWidget
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
                        "default_preset"
                      }
                      onSuccess={handleUploadSuccess}
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={() => open()}
                          className="flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border bg-background/50 hover:bg-background hover:border-primary/50 transition-all group"
                        >
                          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-surface group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <ImageIcon size={28} />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-foreground">
                              Upload Item Photo
                            </p>
                            <p className="text-[11px] text-muted-foreground mt-1">
                              High-res PNG, JPG or WEBP
                            </p>
                          </div>
                        </button>
                      )}
                    </CldUploadWidget>
                  )}
                </AnimatePresence>
                {imageUrl && !errors.imageUrl && (
                  <p className="mt-2 text-xs font-semibold text-primary">
                    Image uploaded and preview ready.
                  </p>
                )}
                {errors.imageUrl && (
                  <p className="text-xs font-semibold text-red-400 mt-2 flex items-center gap-1">
                    <Info size={14} /> {errors.imageUrl.message}
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                  <span className="text-primary font-bold">PRO TIP:</span> Use a
                  clean background and good lighting to make your drop sell
                  faster. Neutral gray or white backgrounds work best for
                  high-end kicks.
                </p>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="label-caps text-xs text-muted-foreground">
                  TITLE
                </Label>
                <Input
                  placeholder="e.g. Jordan 1 Retro High OG"
                  className="h-12 bg-background border-border focus:ring-primary text-sm font-medium"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-xs text-red-400">{errors.title.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="label-caps text-xs text-muted-foreground">
                    CATEGORY
                  </Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(val) =>
                      setValue("category", val as CategoryValue, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger className="h-12 bg-background border-border">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-border">
                      {CATEGORIES.map((c) => (
                        <SelectItem
                          key={c}
                          value={c}
                          className="focus:bg-primary/10"
                        >
                          {c}
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

                <div className="space-y-2">
                  <Label className="label-caps text-xs text-muted-foreground">
                    BRAND
                  </Label>
                  <Input
                    placeholder="e.g. Nike"
                    className="h-12 bg-background border-border focus:ring-primary text-sm font-medium"
                    {...register("brand")}
                  />
                  {errors.brand && (
                    <p className="text-xs text-red-400">
                      {errors.brand.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="label-caps text-xs text-muted-foreground">
                    PRICE ($)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="199.99"
                    className="h-12 bg-background border-border focus:ring-primary text-sm font-bold text-accent"
                    {...register("price")}
                  />
                  {errors.price && (
                    <p className="text-xs text-red-400">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="label-caps text-xs text-muted-foreground">
                    SIZE (OPTIONAL)
                  </Label>
                  <Input
                    type="number"
                    placeholder="e.g. 10"
                    className="h-12 bg-background border-border focus:ring-primary text-sm font-medium"
                    {...register("size")}
                  />
                  {errors.size && (
                    <p className="text-xs text-red-400">
                      {errors.size.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="label-caps text-xs text-muted-foreground">
                  SHORT DESCRIPTION
                </Label>
                <Input
                  placeholder="One line about this pair..."
                  className="h-12 bg-background border-border focus:ring-primary text-sm"
                  {...register("shortDescription")}
                />
                {errors.shortDescription && (
                  <p className="text-xs text-red-400">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="label-caps text-xs text-muted-foreground">
                  FULL STORY
                </Label>
                <Textarea
                  placeholder="Describe the condition, history, or why this drop is special..."
                  className="min-h-30 bg-background border-border focus:ring-primary text-sm resize-none"
                  {...register("fullDescription")}
                />
                {errors.fullDescription && (
                  <p className="text-xs text-red-400">
                    {errors.fullDescription.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-primary hover:bg-primary-hover text-white text-sm font-bold uppercase tracking-widest transition-all shadow-xl shadow-primary/20"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  PUBLISHING...
                </div>
              ) : (
                "PUBLISH DROP"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
