import {
  pgTable,
  text,
  integer,
  decimal,
  timestamp,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "user"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  email: text("email").notNull().unique(),
  role: userRoleEnum("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

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
export type UserRole = (typeof userRoleEnum.enumValues)[number];
export type AppUser = typeof users.$inferSelect;
export type NewAppUser = typeof users.$inferInsert;
