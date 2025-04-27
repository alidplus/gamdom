import * as dz from "drizzle-zod";
import { z } from "zod";
import { usersTable } from "./schema";

export const table = usersTable;

export const zDataSchema = dz
  .createSelectSchema(table)
  .omit({ password: true });
export type TData = z.infer<typeof zDataSchema>;

export const zInsertSchema = dz.createInsertSchema(table);
export type TInsert = z.infer<typeof zInsertSchema>;

export const zUpdateSchema = dz.createUpdateSchema(table);
export type TUpdate = z.infer<typeof zUpdateSchema>;
