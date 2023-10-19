const { BABEL_ENV } = process.env;
const isCjs = BABEL_ENV !== undefined && BABEL_ENV === "cjs";

module.exports = {
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        bugfixes: true,
        modules: isCjs ? "commonjs" : false,
        loose: true,
      },
    ],
  ],
};
