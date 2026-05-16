const config = {
  "demo/**/*.{js,jsx,ts,tsx}":
    "oxlint -c demo/.oxlintrc.json --disable-nested-config --fix",
  "!(demo|codemod)/**/*.{js,jsx,ts,tsx}":
    "oxlint -c .oxlintrc.json --disable-nested-config --fix",
  "*": "oxfmt",
};

export default config;
