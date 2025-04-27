import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entryPoints: ["src/app.ts"],
  clean: true,
  dts: false,
  format: ["esm"],
  external: ["zod", "drizzle-orm", "drizzle-zod"],
  ...options,
}));
