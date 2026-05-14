import jscodeshift, { type API } from "jscodeshift";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import transformer from "../transforms/v5.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, "fixtures", "v5");

const api = {
  jscodeshift,
  j: jscodeshift,
  stats: () => {},
  report: () => {},
} as unknown as API;

const fixtures = readdirSync(fixturesDir)
  .filter((file) => file.endsWith(".input.tsx"))
  .map((file) => file.replace(/\.input\.tsx$/, ""));

describe("v5 transform", () => {
  it.each(fixtures)("%s", async (name) => {
    const inputPath = path.join(fixturesDir, `${name}.input.tsx`);
    const outputPath = path.join(fixturesDir, `${name}.output.tsx`);

    const input = readFileSync(inputPath, "utf8");
    const output = transformer({ path: inputPath, source: input }, api);

    await expect(output).toMatchFileSnapshot(outputPath);
  });
});
