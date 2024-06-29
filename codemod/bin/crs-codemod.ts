#!/usr/bin/env node

/**
 * Copyright 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on https://github.com/reactjs/react-codemod/blob/dd8671c9a470a2c342b221ec903c574cf31e9f57/bin/react-codemod.js
 * next-codemod optional-name-of-transform optional/path/to/src [...options]
 *
 * @see {@link https://github.com/vercel/next.js/blob/dc9f30c1064ea72aef2fd046da2f1d2722b89735/packages/next-codemod/bin/next-codemod.ts}
 */
require("./cli").run();
