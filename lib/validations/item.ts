import { z } from "zod";

export const itemSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title too long"),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(200, "Max 200 characters"),
  fullDescription: z
    .string()
    .min(20, "Full description must be at least 20 characters"),
  price: z.coerce
    .number()
    .positive("Price must be positive")
    .max(9999, "Price too high"),
  category: z.enum([
    "Retro",
    "Classy",
    "Performance",
    "Lifestyle",
    "Luxury",
    "Other",
  ]),
  brand: z.string().min(2, "Brand required"),
  size: z.preprocess(
    (val) =>
      val === "" || val === null || val === undefined ? undefined : val,
    z.coerce.number().min(4).max(18).optional(),
  ),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type ItemFormData = z.infer<typeof itemSchema>;
