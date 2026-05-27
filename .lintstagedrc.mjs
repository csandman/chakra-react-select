const config = {
  "demo/**/*.{js,jsx,ts,tsx}":
    "oxlint -c demo/.oxlintrc.json --disable-nested-config --fix",
  "!(demo|codemod)/**/*.{js,jsx,ts,tsx}":
    "oxlint -c .oxlintrc.json --disable-nested-config --fix",
  // Exclude codemod test fixtures from oxfmt — they must exactly match the
  // transform output, which jscodeshift formats independently of oxfmt.
  "!(codemod/tests/fixtures/**)": "oxfmt",
};

export default config;
