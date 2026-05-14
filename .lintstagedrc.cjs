// lint-staged config — moved here from package.json so we can run oxlint
// only on files it actually lints. The default glob picks up files under
// src/tests/, but oxlint excludes that directory via ignorePatterns in
// .oxlintrc.json; passing it nothing-but-ignored files makes oxlint exit
// non-zero with "No files found to lint", which breaks the pre-commit hook
// whenever a commit touches only test files. The filter callback drops
// src/tests/ paths before invoking oxlint; oxfmt still formats them.

const path = require("node:path");

const IGNORED = ["src/tests/"];

const filterLintable = (files) => {
  return files.filter((file) => {
    const rel = path.relative(__dirname, file);
    return !IGNORED.some((prefix) => rel.startsWith(prefix));
  });
};

module.exports = {
  "demo/**/*.{js,jsx,ts,tsx}":
    "oxlint -c demo/.oxlintrc.json --disable-nested-config --fix",
  "!(demo|codemod)/**/*.{js,jsx,ts,tsx}": (files) => {
    const lintable = filterLintable(files);
    if (lintable.length === 0) return [];
    return `oxlint -c .oxlintrc.json --disable-nested-config --fix ${lintable
      .map((f) => JSON.stringify(f))
      .join(" ")}`;
  },
  "*": "oxfmt",
};
