# Chakra React Select Codemods

A collection (only one for now) of Codemod transformations to help you upgrade
your codebase when a Chakra React Select feature is deprecated.

Codemods are transformations that run on your codebase programmatically. This
allows for a large amount of changes to be applied without having to manually go
through every file.

These codemods are based on
[the codemods offered by Next.js](https://github.com/vercel/next.js/tree/canary/packages/next-codemod),
and are written using [`jscodeshift`](https://github.com/facebook/jscodeshift).

## Usage

In your terminal, navigate (`cd`) into your project's folder, then run:

```sh
npx crs-codemod@latest <transform> <path>
```

Replacing `<transform>` and `<path>` with appropriate values.

- `transform` - name of transform
- `path` - files or directory to transform
- `--dry` Do a dry-run, no code will be edited
- `--print` Prints the changed output for comparison

## Codemod Options

### Version 5 (`v5`)

```sh
npx crs-codemod@latest v5 .
# or
npx crs-codemod@latest v5 ./src
```

This codemod runs on all versions of the `Select` component (`Select`,
`AsyncSelect`, `AsyncCreatableSelect`, `CreatableSelect`), and performs the
following modifications to your every instance of them:

- Removes the `useBasicStyles` prop.
  - These styles are now the defaults, so this prop was removed in `v5.0.0`.
- Renames the prop `selectedOptionColor` to `selectedOptionColorScheme`.
  - This prop was renamed in
    [`v4.6.0`](https://github.com/csandman/chakra-react-select/releases/tag/v4.6.0)
    to reduce confusion about what values can be passed to it. It has been fully
    removed in `v5.0.0`.
- Renames the prop `colorScheme` to `tagColorScheme`.
  - This prop's name was changed as it didn't represent specifically what it was
    for originally.
- Removes the `hasStickyGroupHeaders` prop
  - This prop was deprecated in
    [`v4.6.0`](https://github.com/csandman/chakra-react-select/releases/tag/v4.6.0)
    as well due to it not working properly with keyboard navigation, and being
    outside the scope of the intentions for this project. It has also been fully
    removed in `v5.0.0`.

This codemod will only work for props that are added directly to a `Select`
instance. If you have a shared props object, you will have to make these changes
manually.
