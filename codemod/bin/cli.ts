/**
 * Based on the package `next-codemod` from Vercel, this script is used to run codemods on the project.
 * crs-codemod optional-name-of-transform optional/path/to/src [...options]
 *
 * @see {@link https://github.com/vercel/next.js/blob/dc9f30c/packages/next-codemod/bin/cli.ts}
 */
import { Command } from "commander";
import { globbySync } from "globby";
import { execFileSync, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pc from "picocolors";
import prompts from "prompts";

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
    const stdout = execFileSync("git", ["status", "--porcelain"], {
      cwd: process.cwd(),
      encoding: "utf8",
    });
    clean = stdout.trim().length === 0;
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
  jscodeshift?: string[];
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
  args.push("--parser=tsx");

  args.push("--ignore-pattern=**/node_modules/**");
  args.push("--ignore-pattern=**/.next/**");

  args.push("--extensions=tsx,ts,jsx,js");

  args.push("--transform", transformerPath);

  if (jscodeshift) {
    args.push(...jscodeshift);
  }

  args.push(...files);

  console.log(`Executing command: jscodeshift ${args.join(" ")}`);

  const result = spawnSync(jscodeshiftExecutable, args, { stdio: "inherit" });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`jscodeshift exited with code ${result.status}`);
  }
}

const TRANSFORMER_CHOICES = [
  {
    title: "v5: Remove or replace deprecated props",
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

interface ProgramOptions {
  force?: boolean;
  dry?: boolean;
  print?: boolean;
  runInBand?: boolean;
  jscodeshift?: string[];
}

export async function run() {
  const program = new Command()
    .description("Codemods for updating chakra-react-select in applications.")
    .argument("[transform]", "codemod transform to apply")
    .argument("[path]", "files or directory to transform (supports globs)")
    .option("--force", "bypass Git safety checks and forcibly run codemods")
    .option("--dry", "dry run (no changes are made to files)")
    .option("--print", "print transformed files to your terminal")
    .option(
      "--run-in-band",
      "run in a single process (slower but useful for debugging)"
    )
    .option(
      "--jscodeshift <options...>",
      "(advanced) pass options directly to jscodeshift"
    )
    .parse(process.argv);

  const opts = program.opts<ProgramOptions>();
  const [inputTransform, inputPath] = program.args;

  if (!opts.dry) {
    checkGitStatus(!!opts.force);
  }

  if (
    inputTransform &&
    !TRANSFORMER_CHOICES.find((x) => x.value === inputTransform)
  ) {
    console.error("Invalid transform choice, pick one of:");
    console.error(TRANSFORMER_CHOICES.map((x) => `- ${x.value}`).join("\n"));
    process.exit(1);
  }

  const answers = await prompts(
    [
      {
        type: inputPath ? null : "text",
        name: "files",
        message: "On which files or directory should the codemods be applied?",
        initial: ".",
        format: (val: string) => val.trim(),
      },
      {
        type: inputTransform ? null : "select",
        name: "transformer",
        message: "Which transform would you like to apply?",
        choices: TRANSFORMER_CHOICES,
      },
    ],
    { onCancel: () => process.exit(1) }
  );

  const filesBeforeExpansion = inputPath ?? answers.files;
  if (!filesBeforeExpansion) {
    console.log("No files or directory provided.");
    return;
  }

  const selectedTransformer = inputTransform ?? answers.transformer;
  if (!selectedTransformer) {
    console.log("No transformer selected.");
    return;
  }

  const filesExpanded = expandFilePathsIfNeeded([filesBeforeExpansion]);

  if (!filesExpanded.length) {
    console.log(`No files found matching ${filesBeforeExpansion}`);
    return;
  }

  runTransform({
    files: filesExpanded,
    transformer: selectedTransformer,
    dry: opts.dry,
    print: opts.print,
    runInBand: opts.runInBand,
    jscodeshift: opts.jscodeshift,
  });
}
