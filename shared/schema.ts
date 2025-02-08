import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  picture: text("picture"),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Form validation schemas
export const verifyEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const findEmailSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  domain: z.string().min(3, "Domain must be at least 3 characters"),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type FindEmailInput = z.infer<typeof findEmailSchema>;
