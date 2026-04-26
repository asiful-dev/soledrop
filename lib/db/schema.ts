import {
  pgTable,
  text,
  integer,
  decimal,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(), // e.g. "Jordan", "Yeezy", "Nike"
  brand: text("brand").notNull(),
  size: integer("size"),
  imageUrl: text("image_url"),
  cloudinaryPublicId: text("cloudinary_public_id"),
  rating: decimal("rating", { precision: 3, scale: 1 }).default("0"),
  authorId: text("author_id").notNull(), // Firebase UID
  authorEmail: text("author_email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
