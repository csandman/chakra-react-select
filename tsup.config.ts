import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  entry: ["src"],
  format: ["cjs", "esm"],
  sourcemap: true,
  dts: true,
  minify: true,
});
