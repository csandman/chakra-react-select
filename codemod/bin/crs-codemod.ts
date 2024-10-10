#!/usr/bin/env node

/**
 * Based on the package `next-codemod` from Vercel, this script is used to run codemods on the project.
 * crs-codemod optional-name-of-transform optional/path/to/src [...options]
 *
 * @see {@link https://github.com/vercel/next.js/blob/dc9f30c1064ea72aef2fd046da2f1d2722b89735/packages/next-codemod/bin/next-codemod.ts}
 */
require("./cli").run();
