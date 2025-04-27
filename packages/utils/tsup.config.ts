import { defineConfig, type Options } from "tsup";
import pkg from "./package.json"

export default defineConfig((options: Options) => ({
  entryPoints: [
    "src/superjson.ts",
    "src/index.ts"
  ],
  clean: true,
  dts: true,
  format: ["esm"],
  // noExternal: [
  //   ...Object.keys(pkg.dependencies),
  // ],
  external: [
    ...Object.keys(pkg['peerDependencies'] || {})
  ],
  ...options,
}));
