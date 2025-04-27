import * as dz from "drizzle-zod";
import { z } from "zod";
import { eventsTable } from "./schema";

export const table = eventsTable;

export const zDataSchema = dz.createSelectSchema(table);
export type TData = z.infer<typeof zDataSchema>;

export const zInsertSchema = dz.createInsertSchema(table);
export type TInsert = z.infer<typeof zInsertSchema>;

export const zUpdateSchema = dz.createUpdateSchema(table);
export type TUpdate = z.infer<typeof zUpdateSchema>;
