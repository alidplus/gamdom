import { integer, pgTable, varchar, real } from "drizzle-orm/pg-core";

// Events Table
export const eventsTable = pgTable("events", {
  event_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  event_name: varchar({ length: 255 }).notNull(),
  odds: real().notNull()
});

// User Table
export const usersTable = pgTable("users", {
  user_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull()
});