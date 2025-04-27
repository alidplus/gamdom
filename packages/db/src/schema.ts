import { integer, pgTable, varchar, real } from "drizzle-orm/pg-core";

// Events Table
export const eventsTable = pgTable("events", {
  id: integer("event_id").primaryKey().generatedAlwaysAsIdentity(),
  eventName: varchar("event_name", { length: 255 }).notNull(),
  odds: real().notNull(),
});

// User Table
export const usersTable = pgTable("users", {
  id: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
});
