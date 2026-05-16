# Contributing

Thanks for your interest in `chakra-react-select`! All forms of contribution are
welcome, from issue reports to PRs and documentation / write-ups.

Before you open a PR:

- In development, run `pnpm install` to setup the dependencies for the core
  package and the demo. Dependency install scripts are gated by pnpm's
  [`allowBuilds`](./pnpm-workspace.yaml) whitelist for supply-chain safety;
  husky's `prepare` script runs automatically on install.
- Run `pnpm dev` to build (and watch) the package source, as well as run the
  demo project which can be viewed at http://localhost:5152.
- Please ensure all the examples work correctly after your change.
- Also run `pnpm lint` to ensure that the change meets the projects code style
  setup.
- Run `pnpm test` to verify the test suite still passes. The suite covers both
  behavior ported from `react-select` and chakra-specific extensions — see the
  [Tests](#tests) section below.
- Make sure there's an issue open for any work you take on and intend to submit
  as a pull request - it helps core members review your concept and direction
  early and is a good way to discuss what you're planning to do.
- If you open an issue and are interested in working on a fix, please let us
  know. We'll help you get started, rather than inadvertently doubling up on
  your hard work.
- All new features and changes need documentation. If you don't have time to
  write any, leave a note in your PR.

## Tests

The test suite lives in [`src/tests/`](./src/tests/) and runs with
[Vitest](https://vitest.dev) against a `jsdom` environment plus
`@testing-library/react`:

- `select.test.tsx`, `async-select.test.tsx`, `creatable-select.test.tsx`,
  `async-creatable-select.test.tsx`, `state-managed-select.test.tsx` — ported
  from `react-select`'s own `__tests__` directory. Each file's header
  comment carries a permalink to the upstream source at the pinned version.
- `chakra-specific.test.tsx` — exercises the props this package adds on
  top of `react-select` (`size`, `variant`, `invalid`, `chakraStyles`,
  `tagColorPalette`, `selectedOptionStyle`, etc.).
- `constants.ts` — option fixtures, copied verbatim from upstream.
- `render.tsx`, `setup.ts`, `cases.ts` — local helpers (Chakra-wrapped
  render, jsdom polyfills, `jest-in-case` shim).

Useful commands:

- `pnpm test` — run the suite once
- `pnpm test:watch` — re-run on file changes

### When bumping the `react-select` dependency

If a `react-select` bump introduces test changes, port them in as a manual
step rather than rewriting the ported files from scratch:

1. Diff the upstream
   [`__tests__/` folder](https://github.com/JedWatson/react-select/tree/master/packages/react-select/src/__tests__)
   between the old and new tag — the header comment in each ported file links
   to the source at the currently pinned tag.
2. For each upstream test that's new or whose body changed, port it
   following the same adaptations already in use:
   - imports from `../index` (not `../Select` etc.)
   - `render` from `./render` (provides Chakra context)
   - `userEvent.setup()` + `await user.click/type` (v14 async API)
   - `vi.fn` instead of `jest.fn`
   - skip snapshot tests
3. Update each ported file's header permalink to point at the new tag.
4. Leave chakra-specific tests in `chakra-specific.test.tsx` — don't fold
   chakra-only assertions into the ported files.
