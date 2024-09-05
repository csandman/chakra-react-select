import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  target: "es2019",
  sourcemap: true,
  dts: true,
  minify: true,
  treeshake: true,
});
