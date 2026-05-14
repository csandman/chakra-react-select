// lint-staged config — moved here from package.json so we can use a
// function to filter file lists before invoking oxlint. The default glob
// picks up files under src/tests/, but oxlint excludes that directory via
// ignorePatterns in .oxlintrc.json; passing it nothing-but-ignored files
// makes oxlint exit non-zero with "No files found to lint", which breaks
// the pre-commit hook for test-only changes. The filter drops src/tests/
// paths before invoking oxlint; oxfmt still formats them.

import path from "node:path";

const IGNORED = ["src/tests/"];

const filterLintable = (files) =>
  files.filter((file) => {
    const rel = path.relative(import.meta.dirname, file);
    return !IGNORED.some((prefix) => rel.startsWith(prefix));
  });

export default {
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
