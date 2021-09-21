import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";

const packageJson = require("./package.json");

export default {
  input: packageJson.source,
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    commonjs({ exclude: /src/ }),
    babel({
      exclude: /node_modules/,
      babelHelpers: "bundled",
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    resolve(),
    terser(),
    filesize(),
  ],
};
