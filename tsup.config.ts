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
  external: [
    "react",
    "react-dom",
    "react-select",
    "@chakra-ui/form-control",
    "@chakra-ui/icon",
    "@chakra-ui/layout",
    "@chakra-ui/media-query",
    "@chakra-ui/menu",
    "@chakra-ui/react",
    "@chakra-ui/spinner",
    "@chakra-ui/system",
  ],
});
