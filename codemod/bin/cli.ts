/**
 * Based on the package `next-codemod` from Vercel, this script is used to run codemods on the project.
 * crs-codemod optional-name-of-transform optional/path/to/src [...options]
 *
 * @see {@link https://github.com/vercel/next.js/blob/dc9f30c/packages/next-codemod/bin/cli.ts}
 */
import { execaSync } from "execa";
import { globbySync } from "globby";
import inquirer, { type DistinctQuestion } from "inquirer";
import isGitClean from "is-git-clean";
import meow, { type AnyFlags } from "meow";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pc from "picocolors";

const { yellow } = pc;

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const jscodeshiftExecutable =
  require.resolve("jscodeshift/bin/jscodeshift.js");
export const transformerDirectory = path.join(__dirname, "../", "transforms");

export function checkGitStatus(force: boolean) {
  let clean = false;
  let errorMessage = "Unable to determine if git directory is clean";
  try {
    clean = isGitClean.sync(process.cwd());
    errorMessage = "Git directory is not clean";
  } catch (err: unknown) {
    const stderr =
      err && typeof err === "object" && "stderr" in err
        ? String((err as { stderr: unknown }).stderr)
        : "";
    if (stderr.includes("Not a git repository")) {
      clean = true;
    }
  }

  if (!clean) {
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log("Thank you for using crs-codemod!");
      console.log(
        yellow(
          "\nBut before we continue, please stash or commit your git changes."
        )
      );
      console.log(
        "\nYou may use the --force flag to override this safety check."
      );
      process.exit(1);
    }
  }
}

interface RunTransformOptions {
  files: string[];
  transformer: string;
  dry?: boolean;
  print?: boolean;
  runInBand?: boolean;
  jscodeshift?: readonly string[];
}

export function runTransform({
  files,
  transformer,
  dry,
  print,
  runInBand,
  jscodeshift,
}: RunTransformOptions) {
  const transformerPath = path.join(transformerDirectory, `${transformer}.js`);

  const args: string[] = [];

  if (dry) {
    args.push("--dry");
  }
  if (print) {
    args.push("--print");
  }
  if (runInBand) {
    args.push("--run-in-band");
  }

  args.push("--verbose=2");

  args.push("--ignore-pattern=**/node_modules/**");
  args.push("--ignore-pattern=**/.next/**");

  args.push("--extensions=tsx,ts,jsx,js");

  args.push("--transform", transformerPath);

  if (jscodeshift) {
    args.push(...jscodeshift);
  }

  args.push(...files);

  console.log(`Executing command: jscodeshift ${args.join(" ")}`);

  const result = execaSync(jscodeshiftExecutable, args, {
    stdio: "inherit",
    stripFinalNewline: false,
  });

  if (result.failed) {
    throw new Error(`jscodeshift exited with code ${result.exitCode}`);
  }
}

const TRANSFORMER_INQUIRER_CHOICES = [
  {
    name: "v5: Remove or replace deprecated props",
    value: "v5",
  },
];

function expandFilePathsIfNeeded(filesBeforeExpansion: string[]) {
  const shouldExpandFiles = filesBeforeExpansion.some((file) =>
    file.includes("*")
  );
  return shouldExpandFiles
    ? globbySync(filesBeforeExpansion)
    : filesBeforeExpansion;
}

const flagsSchema = {
  force: { type: "boolean" },
  dry: { type: "boolean" },
  print: { type: "boolean" },
  runInBand: { type: "boolean" },
  jscodeshift: { type: "string", isMultiple: true },
  help: { type: "boolean", shortFlag: "h" },
} as const satisfies AnyFlags;

interface PromptAnswers {
  files?: string;
  transformer?: string;
}

export function run() {
  const cli = meow({
    importMeta: import.meta,
    description: "Codemods for updating chakra-react-select in applications.",
    help: `
    Usage
      $ npx crs-codemod <transform> <path> <...options>
        transform    One of the choices from https://github.com/vercel/next.js/tree/canary/packages/next-codemod
        path         Files or directory to transform. Can be a glob like pages/**.js
    Options
      --force            Bypass Git safety checks and forcibly run codemods
      --dry              Dry run (no changes are made to files)
      --print            Print transformed files to your terminal
      --jscodeshift  (Advanced) Pass options directly to jscodeshift
    `,
    flags: flagsSchema,
  });

  if (!cli.flags.dry) {
    checkGitStatus(!!cli.flags.force);
  }

  if (
    cli.input[0] &&
    !TRANSFORMER_INQUIRER_CHOICES.find((x) => x.value === cli.input[0])
  ) {
    console.error("Invalid transform choice, pick one of:");
    console.error(
      TRANSFORMER_INQUIRER_CHOICES.map((x) => `- ${x.value}`).join("\n")
    );
    process.exit(1);
  }

  const questions: DistinctQuestion<PromptAnswers>[] = [
    {
      type: "input",
      name: "files",
      message: "On which files or directory should the codemods be applied?",
      when: !cli.input[1],
      default: ".",
      filter: (files: string) => files.trim(),
    },
    {
      type: "select",
      name: "transformer",
      message: "Which transform would you like to apply?",
      when: !cli.input[0],
      pageSize: TRANSFORMER_INQUIRER_CHOICES.length,
      choices: TRANSFORMER_INQUIRER_CHOICES,
    },
  ];

  inquirer.prompt<PromptAnswers>(questions).then((answers) => {
    const { files, transformer } = answers;

    const filesBeforeExpansion = cli.input[1] || files;
    if (!filesBeforeExpansion) {
      console.log("No files or directory provided.");
      return null;
    }

    const filesExpanded = expandFilePathsIfNeeded([filesBeforeExpansion]);

    const selectedTransformer = cli.input[0] || transformer;
    if (!selectedTransformer) {
      console.log("No transformer selected.");
      return null;
    }

    if (!filesExpanded.length) {
      console.log(`No files found matching ${filesBeforeExpansion}`);
      return null;
    }

    return runTransform({
      files: filesExpanded,
      transformer: selectedTransformer,
      dry: cli.flags.dry,
      print: cli.flags.print,
      runInBand: cli.flags.runInBand,
      jscodeshift: cli.flags.jscodeshift,
    });
  });
}
