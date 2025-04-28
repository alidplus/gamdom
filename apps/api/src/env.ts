// src/lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  ORIGIN: z.string().url(),
  PORT: z.coerce.number().min(3000),
  NODE_ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),

  COOKIES_SECRET: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
