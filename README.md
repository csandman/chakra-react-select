[cs-ts-demo]:
  https://img.shields.io/badge/CodeSandbox-TypeScript-047bd4?logo=codesandbox&style=for-the-badge&labelColor=040404&logoColor=DBDBDB
  "CodeSandbox TypeScript Demo"
[cs-js-demo]:
  https://img.shields.io/badge/CodeSandbox-JavaScript-f4dc1b?logo=codesandbox&style=for-the-badge&labelColor=040404&logoColor=DBDBDB
  "CodeSandbox JavaScript Demo"
[cs-ts]:
  https://img.shields.io/badge/CodeSandbox-TypeScript-047bd4?logo=codesandbox&style=flat&labelColor=040404&logoColor=DBDBDB
  "CodeSandbox TypeScript Demo"
[cs-js]:
  https://img.shields.io/badge/CodeSandbox-JavaScript-f4dc1b?logo=codesandbox&style=flat&labelColor=040404&logoColor=DBDBDB
  "CodeSandbox JavaScript Demo"

# chakra-react-select v4

> This version of `chakra-react-select` is updated for
> [Chakra UI v2](https://chakra-ui.com/getting-started/migration) which works
> exclusively with React v18. `chakra-react-select` v3 will be maintained until
> the majority of users have migrated. If you're still using Chakra UI v1 check
> [the docs for chakra-react-select v3 here](https://github.com/csandman/chakra-react-select/tree/v3).

[![](https://github.com/csandman/chakra-react-select/actions/workflows/build.yml/badge.svg?branch=main "Build Status")](https://github.com/csandman/chakra-react-select/actions/workflows/build.yml?query=branch%3Amain)
[![](https://github.com/csandman/chakra-react-select/actions/workflows/lint.yml/badge.svg?branch=main "Lint Status")](https://github.com/csandman/chakra-react-select/actions/workflows/lint.yml?query=branch%3Amain)
[![](https://img.shields.io/npm/v/chakra-react-select "chakra-react-select npm")](https://www.npmjs.com/package/chakra-react-select)
[![](https://badgen.net/bundlephobia/min/chakra-react-select "Minified Bundle Size")](https://bundlephobia.com/result?p=chakra-react-select)
[![](https://badgen.net/bundlephobia/minzip/chakra-react-select "Minzipped Bundle Size")](https://bundlephobia.com/result?p=chakra-react-select)
[![](https://badgen.net/npm/dt/chakra-react-select?color=blue&icon=npm "Total NPM Downloads")](https://npm-stat.com/charts.html?package=chakra-react-select&from=2021-09-13)
[![](https://badgen.net/npm/dw/chakra-react-select?color=blue&icon=npm "Weekly NPM Downloads")](https://npm-stat.com/charts.html?package=chakra-react-select&from=2021-09-13)
[![](https://snyk.io/test/github/csandman/chakra-react-select/badge.svg "Known Vulnerabilities")](https://snyk.io/test/github/csandman/chakra-react-select)
[![](https://img.shields.io/badge/Code_Style-prettier-c596c7.svg?logo=prettier "Code Style: Prettier")](https://github.com/prettier/prettier)
[![](https://badgen.net/github/license/csandman/chakra-react-select "MIT License")](LICENSE.md)

This component is a wrapper for the popular react component
[react-select](https://react-select.com/home) made using the UI library
[Chakra UI](https://chakra-ui.com/).

![Chakra React Select Banner](./github/chakra-react-select.png)

Check out these demos:

[![CS-JS-demo]](https://codesandbox.io/s/chakra-react-select-demo-65ohb?file=/example.js)
[![CS-TS-demo]](https://codesandbox.io/s/chakra-react-select-ts-demo-vz9ut?file=/app.tsx)

**NOTE:** Before leaving an issue on this project, remember that this is just a
_wrapper_ for `react-select`, not a standalone package. A large percentage of
the questions people have end up being about how `react-select` itself works, so
please read through their documentation to familiarize yourself with it!
https://react-select.com/home

## Contents

- [Usage](#usage)
- [Extra Props](#extra-props)
  - [`size`](#size--options-responsivevaluesm--md--lg--default-md)
  - [`colorScheme`](#colorscheme)
  - [`tagVariant`](#tagvariant--options-subtle--solid--outline--default-subtle)
  - [`isInvalid` / `isReadOnly`](#isinvalid--default-false--isreadonly---default-false)
  - [`focusBorderColor` / `errorBorderColor`](#focusbordercolor--default-blue500--errorbordercolor--default-red500)
  - [`useBasicStyles`](#usebasicstyles--default-false)
  - [`selectedOptionStyle`](#selectedoptionstyle--options-color--check--default-color)
  - [`selectedOptionColorScheme`](#selectedoptioncolorscheme--default-blue)
  - [`variant`](#variant--options-outline--filled--flushed--unstyled--default-outline)
- [Styling](#styling)
  - [`chakraStyles`](#chakrastyles)
    - [Caveats](#caveats)
    - [Examples](#examples)
  - [Theme Styles](#theme-styles)
  - [`className`](#classname)
- [TypeScript Support](#typescript-support)
- [Customizing Components](#customizing-components)
  - [Custom `LoadingIndicator` (Chakra `Spinner`)](#custom-loadingindicator-chakra-spinner)
- [`useChakraSelectProps`](#usechakraselectprops)
- [Usage with React Form Libraries](#usage-with-react-form-libraries)
  - [`react-hook-form`](#react-hook-form)
  - [`formik`](#formik)
- [CodeSandbox Templates](#codesandbox-templates)

## Usage

To use this package, you'll need to have `@chakra-ui/react@2` set up
[like in the guide in their docs](https://chakra-ui.com/getting-started). If you
already have `@chakra-ui/react@1` set up you can follow the steps in
[the official migration guide](https://chakra-ui.com/getting-started/migration)
to update to v2. If you don't have Chakra UI installed already, you can install
it like this:

```sh
npm i @chakra-ui/react @emotion/react@^11.8.1 @emotion/styled@^11 framer-motion@^6
# ...or...
yarn add @chakra-ui/react @emotion/react@^11.8.1 @emotion/styled@^11 framer-motion@^6
```

**NOTE:** As of
[`v3.3.3`](https://github.com/csandman/chakra-react-select/releases/tag/v3.3.3),
your project will need to have a minimum of `@emotion/react@11.8.1` installed to
avoid having multiple copies of `@emotion/react` installed. For more info, see
[PR #115](https://github.com/csandman/chakra-react-select/pull/115).

After Chakra UI is set up,
[install this package from NPM](https://www.npmjs.com/package/chakra-react-select):

```sh
npm i chakra-react-select
# ...or...
yarn add chakra-react-select
```

Once installed, you can import the base select package, the async select, the
creatable select or the async creatable select like so:

```js
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";
// ...or...
const {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} = require("chakra-react-select");
```

All exports, including types, from the original `react-select` package are also
exported from this package, so you can import any of them if you need them. The
only exception is the root `Select` components.

Implementing this component in your application should be almost identical to
how you'd normally use [react-select](https://react-select.com/home). It will
accept all of the props that the original package does, with a few additions and
exceptions listed below. So if you have a question on basic usage, your best bet
is to check the original docs or google "How to (some functionality) with
react-select" and just swap out `react-select` for `chakra-react-select`.

## Extra Props

#### `size` — Options: `ResponsiveValue<"sm" | "md" | "lg">` — Default: `md`

You can pass the `size` prop with either `sm`, `md`, or `lg` (default is `md`).
These will reflect the sizes available on the
[Chakra `<Input />` component](https://chakra-ui.com/docs/components/input#changing-the-size-of-the-input)
(except for `xs` because it's too small to work). Alternatively, you can pass a
[responsive style array or object](https://chakra-ui.com/docs/styled-system/responsive-styles)
of `size` values to allow it to change depending on your theme's breakpoints.

If no `size` is passed, it will default to `defaultProps.size` from the theme
for Chakra's `Input` component. If your component theme for `Input` is not
modified, it will be `md`.

```js
return (
  <>
    <Select size="sm" />
    <Select size="md" /> {/* Default */}
    <Select size="lg" />
  </>
);
```

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-sizes-w9sf8e?file=/example.js)

---

#### `colorScheme`

You can pass the `colorScheme` prop to the select component to change all of the
selected options tags' colors. You can view the whole list of available color
schemes in [the Chakra docs](https://chakra-ui.com/docs/components/tag/props),
or if you have a custom color palette, any of the custom color names in that
will be available instead.

Alternatively, you can add the `colorScheme` key to any of your options objects
and it will only style that option when selected.

```js
return (
  <Select
    {/* The global color scheme */}
    colorScheme="purple"
    options={[
      {
        label: "I am red",
        value: "i-am-red",
        colorScheme: "red", // The option color scheme overrides the global
      },
      {
        label: "I fallback to purple",
        value: "i-am-purple",
      },
    ]}
  />
);
```

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-color-schemes-c38jlo?file=/example.js)

---

#### `tagVariant` — Options: `subtle` | `solid` | `outline` — Default: `subtle`

You can pass the `tagVariant` prop with either `subtle`, `solid`, or `outline`
(default is `subtle`). These will reflect the `variant` prop available on the
[Chakra `<Tag />` component](https://chakra-ui.com/docs/components/tag/props).
Alternatively, if you have added any custom variants to your theme, you can use
those instead.

Alternatively, you can add the `variant` key to any of your options objects and
it will only style that option when selected. This will override the
`tagVariant` prop on the select if both are set

```js
return (
  <Select
    {/* The global variant */}
    tagVariant="solid"
    options={[
      {
        label: "I have the outline style",
        value: "i-am-outlined",
        variant: "outline", // The option variant overrides the global
      },
      {
        label: "I fallback to the global `solid`",
        value: "i-am-solid",
      },
    ]}
  />
);
```

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-tag-variants-w31gnt?file=/example.js)

---

#### `isInvalid` — Default: `false` | `isReadOnly` - Default: `false`

You can pass `isInvalid` to the select component to style it like the Chakra
`Input` is styled when it receives the same prop. Alternatively, you can pass
`isReadOnly` to make the component non-interactive in the same way Chakra's
`Input` does.

You can pass also pass `isInvalid`, `isDisabled`, or `isReadOnly` into a
wrapping `<FormControl />` to achieve the same result as passing these props
into the `Select` component.

```js
return (
  <>
    {/* This will show up with a red border */}
    <Select isInvalid />

    {/* This will show up normally but will not be interactive */}
    <Select isReadOnly />

    {/* This will show up grayed out and will not be interactive */}
    {/* Additionally, it will have a red border and the error message will be shown */}
    <FormControl isInvalid isDisabled>
      <FormLabel>Invalid & Disabled Select</FormLabel>
      <Select />
      <FormErrorMessage>
        This error message shows because of an invalid FormControl
      </FormErrorMessage>
    </FormControl>
  </>
);
```

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-invalid-disabled-0hyl8l?file=/example.js)

---

#### `focusBorderColor` — Default: `blue.500` | `errorBorderColor` — Default: `red.500`

The props `focusBorderColor` and `errorBorderColor` can be passed with Chakra
color strings which will emulate the respective props being passed to
[Chakra's `<Input />` component](https://chakra-ui.com/docs/components/input#changing-the-focus-and-error-border-colors).

```js
return (
  <>
    <Select errorBorderColor="orange.500" isInvalid />
    <Select focusBorderColor="green.500" />
  </>
);
```

![Orange errorBorderColor](./github/custom-error-border.png)

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-border-colors-gjo4zd?file=/example.js)

---

#### `useBasicStyles` — Default: `false`

If this prop is passed, the dropdown indicator at the right of the component
will be styled in the same way
[the original Chakra `Select` component](https://chakra-ui.com/docs/components/select)
is styled, instead of being styled as an
[`InputRightAddon`](https://chakra-ui.com/docs/components/input#left-and-right-addons).
The original purpose of styling it as an addon was to create a visual separation
between the dropdown indicator and the button for clearing the selected options.
However, as this button only appears when `isMulti` is passed, using this style
could make more sense for a single select.

```js
return (
  <Select useBasicStyles />
);
```

![useBasicStyles](./github/use-basic-styles.png)

![useBasicStyles dark mode](./github/use-basic-styles-dark.png)

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-usebasicstyles-jjnqsd?file=/example.js)

---

#### `selectedOptionStyle` — Options: `color` | `check` — Default: `color`

As of `v1.3.0` you can pass the prop `selectedOptionStyle` with either `"color"`
or `"check"`. The default option `"color"` will style a selected option similar
to how react-select does it, by highlighting the selected option in the color
blue. Alternatively, if you pass `"check"` for the value, the selected option
will be styled like the
[Chakra UI Menu component](https://chakra-ui.com/docs/components/menu#menu-option-groups)
and include a check icon next to the selected option(s). If `isMulti` and
`selectedOptionStyle="check"` are passed, space will only be added for the check
marks if `hideSelectedOptions={false}` is also passed.

```js
return (
  <>
    <Select selectedOptionStyle="color" /> {/* Default */}
    <Select selectedOptionStyle="check" /> {/* Chakra UI Menu Style */}
  </>
);
```

![Color Highlighted Selected Option](./github/color-selected-option.png)

![Check Highlighted Selected Option](./github/check-selected-option.png)

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-border-selectedoptionstyle-yxkcos?file=/example.js)

---

#### `selectedOptionColorScheme` — Default: `blue`

If you choose to stick with the default `selectedOptionStyle="color"`, you have
one additional styling option. If you do not like the default of blue for the
highlight color, you can pass the `selectedOptionColorScheme` prop to change it.
This prop will accept any named color from your theme's color palette, and it
will use the `500` value in light mode or the `300` value in dark mode.

> **NOTE:** This prop can only be used for named colors from your theme, not
> arbitrary hex/rgb colors. If you would like to use a specific color for the
> background that's not a part of your theme, use the
> [`chakraStyles`](#chakrastyles) prop to customize it (see
> [#99](https://github.com/csandman/chakra-react-select/discussions/99) for an
> example).
>
> Prior to `v4.6.0` this prop was named `selectedOptionColor`, and it was
> renamed to prevent confusion about its purpose. `selectedOptionColor` is still
> available but will be removed in the next major version.

```js
return (
  <>
    <Select selectedOptionColorScheme="blue" /> {/* Default */}
    <Select selectedOptionColorScheme="purple" />
  </>
);
```

![Purple Selected Option Color (light mode)](./github/purple-selected-option-light.png)

![Purple Selected Option Color (dark mode)](./github/purple-selected-option-dark.png)

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-border-selectedoptioncolor-yyd321?file=/example.js)

---

#### `variant` — Options: `outline` | `filled` | `flushed` | `unstyled` — Default: `outline`

You can pass the `variant` prop with any of `outline`, `filled`, `flushed`, or
`unstyled` to change the overall styling of the `Select`. These will reflect the
various appearances available for
[Chakra's `<Input />` component](https://chakra-ui.com/docs/components/input#changing-the-size-of-the-input).
Alternatively, if you've added any custom variants to your Chakra theme you can
use those instead. However, it is not guaranteed all styles will be applied how
you intend them to as there are some differences in the structure of the
Select's input component.

If no `variant` is passed, it will default to `defaultProps.variant` from the
theme for Chakra's `Input` component. If your component theme for `Input` is not
modified, it will be `outline`.

```js
return (
  <>
    <Select variant="outline" /> {/* Default */}
    <Select variant="filled" />
    <Select variant="flushed" />
    <Select variant="unstyled" />
  </>
);
```

![variant in light mode](./github/variant-light.png)

![variant in dark mode](./github/variant-dark.png)

By default, the `flushed` and `unstyled` variants look a bit strange in
combination with the `DropdownIndicator`. An easy way to make these styles look
more natural is to pass the [`useBasicStyles`](#usebasicstyles--default-false)
prop along with them to remove the background from the indicator. Alternatively,
you could hide the indicator completely using [`chakraStyles`](#chakrastyles).

![variant with useBasicStyles](./github/variant-use-basic-styles.png)

Another thing to note is that the default styling for `variant="filled"` and
`isMulti` results in the select and selected option tags having the same
background color when the select is not focused. The easiest solution for this
is to pass the
[`tagVariant`](#tagvariant--options-subtle--solid--outline--default-subtle) or
[`colorScheme`](#colorscheme) prop to add some contrast between the two
elements.

![variant with useBasicStyles](./github/filled-variant.png)

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-variant-5cf755?file=/example.js)

---

If you have any other requests for Chakra-like features that could be added, or
problems with the current features,
[please start a discussion](https://github.com/csandman/chakra-react-select/discussions/categories/ideas)!

## Styling

There are a few ways to style the components that make up `chakra-react-select`.
It's important to note that this package does not use the `theme` or `styles`
props that are implemented in `react-select`. The `theme` prop isn't used as
most of the components' base styles are pulling from your Chakra theme, and
customizing your base theme (such as colors or component styles) should in turn
change the styles in this package.

This package does however offer an alternative to the `styles` prop,
`chakraStyles`. It mostly emulates the behavior of the original `styles` prop,
however, because it’s not identical it is named differently to prevent
confusion.

### `chakraStyles`

To use the `chakraStyles` prop, first, check the documentation for
[the original `styles` prop from the react-select docs](https://react-select.com/styles#style-object).
This package offers an identical API for the `chakraStyles` prop, however, the
`provided` and output style objects use
[Chakra's `sx` prop](https://chakra-ui.com/docs/styled-system/the-sx-prop)
instead of the default emotion styles the original package offers. This allows
you to both use the shorthand styling props you'd normally use to style Chakra
components, as well as tokens from your theme such as named colors.

The API for an individual style function looks like this:

```js
/**
 * @param {CSSObject} provided -- The component's default Chakra styles
 * @param {Object} state -- The component's current state e.g. `isFocused` (this gives all of the same props that are passed into the component)
 * @returns {CSSObject} An output style object which is forwarded to the component's `sx` prop
 */
function option(provided, state) {
  return {
    ...provided,
    color: state.isFocused ? "blue.500" : "red.400",
  };
}
```

All of the style keys offered in the original package can be used in the
`chakraStyles` prop except for `menuPortal`. Along with
[some other caveats](#caveats), this is explained below.

Most of the components rendered by this package use the basic
[Chakra `<Box />` component](https://chakra-ui.com/docs/components/box) with a
few exceptions. Here are the style keys offered and the corresponding Chakra
component that is rendered:

- `clearIndicator` - `Box` (uses theme styles for Chakra's `CloseButton`)
- `container` - `Box`
- `control` - `Box` (uses theme styles for Chakra's `Input`)
- `dropdownIndicator` - `Box` (uses theme styles for Chrakra's
  `InputRightAddon`)
- `downChevron` - `Icon`
- `crossIcon` - `Icon`
- `group` - `Box`
- `groupHeading` - `Box` (uses theme styles for Chakra's `Menu` group title)
- `indicatorsContainer` - `Box`
- `indicatorSeparator` - `Divider`
- `input` - `chakra.input` (wrapped in a `Box`)
- `inputContainer` - `Box`
- `loadingIndicator` - `Spinner`
- `loadingMessage` - `Box`
- `menu` - `Box`
- `menuList` - `Box` (uses theme styles for Chakra's `Menu`)
- `multiValue` - `chakra.span` (uses theme styles for Chakra's `Tag`)
- `multiValueLabel` - `chakra.span` (uses theme styles for Chakra's `TagLabel`)
- `multiValueRemove` - `Box` (uses theme styles for Chakra's `TagCloseButton`)
- `noOptionsMessage` - `Box`
- `option` - `Box` (uses theme styles for Chakra's `MenuItem`)
- `placeholder` - `Box`
- `singleValue` - `Box`
- `valueContainer` - `Box`

If you're using TypeScript, the `chakraStyles` prop is defined by the exported
`ChakraStylesConfig` interface.

```ts
import { ChakraStylesConfig, Select } from "chakra-react-select";

const App: React.FC = () => {
  const chakraStyles: ChakraStylesConfig = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "blue.100" : provided.background,
      p: 0,
      w: "40px",
    }),
  };

  return <Select chakraStyles={chakraStyles} />;
};
```

#### Caveats

One change between the keys in the `chakraStyles` prop and the original `styles`
prop, is that in the original the `input` styles apply to a container
surrounding the HTML `<input />` element, and there is no key for styling the
input itself. With the `chakraStyles` object, the `input` key now styles the
actual `<chakra.input />` element and there is a new key, `inputContainer`, that
styles the surrounding `Box`. Both functions use the `state` argument for the
original `input` key.

There are also two extra style keys for the icons contained within the
indicators that are not offered in the original package. These are `downChevron`
which is contained inside the `DropdownIndicator`, and the `crossIcon` which is
contained inside the `ClearIndicator`. Both styles receive the same `state`
values as their containing indicators. These style keys were added as a
convenience, however you could also apply the same styles using the parent
`chakraStyles` by doing something like this:

```js
const chakraStyles = {
  dropdownIndicator: (prev, { selectProps }) => ({
    ...prev,
    "> svg": {
      transform: `rotate(${selectProps.menuIsOpen ? -180 : 0}deg)`,
    },
  }),
};
```

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-dropdown-indicator-flip-lhc4ep?file=/example.js)

Additionally, there is one key that is available in the `styles` prop that does
not exist in the `chakraStyles` object; `menuPortal`. This key applies to the
`MenuPortal` element which is only used when the
[`menuPortalTarget`](https://react-select.com/advanced#portaling) prop is passed
in. This component is replaceable, however, it is very tightly integrated with
the menu placement logic (and a context provider) so it appears to be impossible
to fully replace it with a chakra component. And in turn, it can't pull a key
from the `chakraStyles` prop. Therefore, if you are passing the
`menuPortalTarget` prop and would like to change the styles of the `MenuPortal`
component, you have two options:

1. Pass the original `styles` prop with the `menuPortal` key. This is the only
   key in the `styles` object that will be applied to your components.

```jsx
return (
  <Select
    menuPortalTarget={document.body}
    styles={{
      menuPortal: (provided) => ({ ...provided, zIndex: 100 })
    }}
    chakraStyles={{
      // All other component styles
    }}
  />
)
```

2. Pass the `classNamePrefix` prop [as described below]() and style the
   `MenuPortal` with CSS using the className `prefix__menu-portal`.

```jsx
// example.js
import "styles.css"

return (
  <Select
    menuPortalTarget={document.body}
    classNamePrefix="chakra-react-select"
  />
)
```

```css
/* styles.css */

.chakra-react-select__menu-portal {
  z-index: 100;
}
```

If anyone has any suggestions for how to fully replace the `MenuPortal`
component, please leave a comment on
[this issue](https://github.com/csandman/chakra-react-select/issues/55) or
submit a pull request.

#### Examples

Dropdown menu attached to control example:

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-chakrastyles-vanilla-kgdnf?file=/example.js)
[![CS-TS]](https://codesandbox.io/s/chakra-react-select-chakrastyles-5yh6q?file=/app.tsx)

Default [Chakra `<Select />`](https://chakra-ui.com/docs/form/select) styles
example:

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-styled-like-a-default-chakra-select-vanilla-iydfe?file=/example.js)
[![CS-TS]](https://codesandbox.io/s/chakra-react-select-styled-like-a-default-chakra-select-qwq3o?file=/app.tsx)

> _NOTE: This can now be accomplished with the
> [`useBasicStyles`](#usebasicstyles--default-false) prop_

### Theme Styles

As mentioned above, a few of the custom components this package implements
either use styles from the global
[Chakra component theme](https://chakra-ui.com/docs/styled-system/customize-theme#customizing-component-styles)
or are themselves those components. As this package pulls directly from your
Chakra theme, any changes you make to those components' themes will propagate to
the components in this package.

**NOTE:** Some of the theme styles are manually overridden when this package
implements them. This is necessary for implementing styles for
[`size`](#size--options-sm--md--lg--default-md) variants in components that do
not natively have them in Chakra's default theme. This mostly concerns
components that make up the `Menu`, but there are a few other cases where this
exception applies. There is no alternative to this currently, so if your custom
theme styles are not being applied correctly please use
[`chakraStyles`](#chakrastyles) to style your components instead. `chakraStyles`
always takes the highest priority in overriding the styles of a component. See
#194 for more info.

Here is a list of all components that will be affected by changes to your theme:

| `react-select` component | `chakra-ui` component styles                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `ClearIndicator`         | [`CloseButton`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/close-button.ts) |
| `Control`                | [`Input`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/input.ts)              |
| `DropdownIndicator`      | [`InputRightAddon`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/input.ts)    |
| `GroupHeading`           | [`Menu` group title](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/menu.ts)    |
| `LoadingIndicator`       | [`Spinner`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/spinner.ts)          |
| `MenuList`               | [`MenuList`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/menu.ts)            |
| `MultiValueContainer`    | [`Tag`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/tag.ts)                  |
| `MultiValueLabel`        | [`TagLabel`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/tag.ts)             |
| `MultiValueRemove`       | [`TagCloseButton`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/tag.ts)       |
| `Option`                 | [`MenuItem`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/menu.ts)            |

In addition to specific component styles, any changes you make to your global
color scheme will also be reflected in these custom components.

**NOTE:** Only make changes to your global component themes if you want them to
appear in all instances of that component. Otherwise, just change the individual
components' styles using the `chakraStyles` prop.

### `className`

This package implements the same classNames on the sub components as the
original package so you can use these to style sub-components with CSS. Here is
an excerpt from
[the react-select docs](https://react-select.com/styles#using-classnames)
describing how it works:

> If you provide the `className` prop to react-select, the SelectContainer will
> be given a className based on the provided value.
>
> If you provide the `classNamePrefix` prop to react-select, all inner elements
> will be given a className with the provided prefix.
>
> For example, given `className='react-select-container'` and
> `classNamePrefix="react-select"`, the DOM structure is similar to this:
>
> ```html
> <div class="react-select-container">
>   <div class="react-select__control">
>     <div class="react-select__value-container">...</div>
>     <div class="react-select__indicators">...</div>
>   </div>
>   <div class="react-select__menu">
>     <div class="react-select__menu-list">
>       <div class="react-select__option">...</div>
>     </div>
>   </div>
> </div>
> ```
>
> While we encourage you to use the new Styles API, you still have the option of
> styling via CSS classes. This ensures compatibility with
> [styled components](https://www.styled-components.com/),
> [CSS modules](https://github.com/css-modules/css-modules) and other libraries.

Here is an example of using classNames to style the components:

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-classnameprefix-demo-4r2pe?file=/example.js)

## TypeScript Support

This package has always supported typescript, however until `3.0.0` none of the
type inference was working on the props passed into this component. Now that
they are, you may need to pass in some generics for your component to work
properly, but **in most cases you shouldn't need to**. Here is a snippet from
the original documentation on the subject:

> ### Select generics
>
> There are three generics used by the Select component: `Option`, `IsMulti`,
> and `Group`. All of them are optional and TypeScript attempts to detect them
> automatically, but sometimes it might need some help. Many of the
> `react-select` types include the three generics like this:
>
> — https://react-select.com/typescript

Read their [full documentation](https://react-select.com/typescript) on the
topic for more info.

This package exports all of the named module members of the original
`react-select` in case you need their built-in types in any of your variable
declarations. The root select `Props` type that is exported by `react-select`
has been extended using module
augmentation,<sup>[[1]](https://react-select.com/typescript#custom-select-props)</sup><sup>[[2]](https://github.com/JedWatson/react-select/issues/4804#issuecomment-927223471)</sup>
so if you import that type it will include all of the extra props offered. This
package also exports a few custom types that are specific to the custom props
offered by this package:

- `ChakraStylesConfig` — The type for the prop `chakraStyles` that can be passed
  to customize the component styles. This is almost identical to the built-in
  `StylesConfig` type, however, it uses Chakra's
  [`CSSObject`](https://github.com/chakra-ui/chakra-ui/blob/790d2417a3f5d59e2d69229a027af671c2dc0cbc/packages/styled-system/src/system.types.ts#L81)
  type instead of react-select's emotion styles.
- `OptionBase` — A type for your individual select options that includes the
  custom props for styling each of your selected options. This type is made to
  give you a base to extend off of and pass in as a generic to the root `Select`
  component.
- Each of the four Select components has a type exported with it:
  - `SelectComponent`
  - `AsyncSelectComponent`
  - `CreatableSelectComponent`
  - `AsyncCreatableSelectComponent`

Here is an example of how to pass in the proper generics to
`chakra-react-select`:

````ts
import { GroupBase, OptionBase, Select } from "chakra-react-select";

/**
 * `OptionBase` is a custom type exported by this package meant to be extended
 * to make your custom option types. It includes all of the keys that can be
 * used by this package to customize the styles of your selected options
 *
 * ```
 * type OptionBase = {
 *   variant?: string;
 *   colorScheme?: string;
 *   isDisabled?: boolean;
 * };
 * ```
 */
interface ColorOption extends OptionBase {
  label: string;
  value: string;
}

const colorOptions = [
  {
    label: "Red",
    value: "red",
    colorScheme: "red", // This is allowed because of the key in the `OptionBase` type
  },
  {
    label: "Blue",
    value: "blue",
  }
]

function CustomMultiSelect() {
  return {
    <Select<ColorOption, true, GroupBase<ColorOption>> // <-- None of these generics should be required
      isMulti
      name="colors"
      options={colorOptions}
      placeholder="Select some colors..."
    />
  }
}
````

## Customizing Components

Like the original `react-select`, this package exports all of the custom
components that make up the overall select. However, instead of being exported
as `components` they are exported as `chakraComponents` to leave the original
`components` export from react-select alone (you can export that as well if
you'd like). When implementing this component, you have the option to wrap these
components and alter their state and the children they return
[in the same way the original does](https://react-select.com/components#defining-components).

It's important to note, however, that there are 3 components offered in the
original `react-select` that are missing from `chakraComponents`. These are the
`CrossIcon`, `DownChevron`, and `MenuPortal`. The `MenuPortal` could not be
replaced at all [as mentioned earlier](#caveats), so if you'd like to customize
it, use the original from the `components` import. The icons posed issues with
prop compatibility when passing them into the core `Select` so the easiest way
to replace them would be to use a custom `DropdownIndicator` or `ClearIndicator`
and pass custom icons in as children:

```js
const components = {
  ClearIndicator: (props) => (
    <chakraComponents.ClearIndicator {...props}>
      <Icon as={IoMdCloseCircleOutline} w={4} h={4} />
    </chakraComponents.ClearIndicator>
  ),
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={AiFillCaretDown} />
    </chakraComponents.DropdownIndicator>
  ),
};
```

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-custom-icons-xf7scd?file=/example.js)

Here's a complete example of how you might use custom components to create a
select with a custom `Option`:

```ts
import { Icon } from "@chakra-ui/react";
import { Select, chakraComponents } from "chakra-react-select";
import {
  GiCherry,
  GiChocolateBar,
  GiCoffeeBeans,
  GiStrawberry,
} from "react-icons/gi";

const flavorOptions = [
  {
    value: "coffee",
    label: "Coffee",
    icon: <Icon as={GiCoffeeBeans} color="orange.700" mr={2} h={5} w={5} />,
  },
  {
    value: "chocolate",
    label: "Chocolate",
    icon: <Icon as={GiChocolateBar} color="yellow.800" mr={2} h={5} w={5} />,
  },
  {
    value: "strawberry",
    label: "Strawberry",
    icon: <Icon as={GiStrawberry} color="red.500" mr={2} h={5} w={5} />,
  },
  {
    value: "cherry",
    label: "Cherry",
    icon: <Icon as={GiCherry} color="red.600" mr={2} h={5} w={5} />,
  },
];

// Make sure this is defined outside of the component which returns your select
// or you'll run into rendering issues
const customComponents = {
  Option: ({ children, ...props }) => (
    <chakraComponents.Option {...props}>
      {props.data.icon} {children}
    </chakraComponents.Option>
  ),
};

const Example = () => (
  <Select
    name="flavors"
    options={flavorOptions}
    placeholder="Select some flavors..."
    components={customComponents}
  />
);
```

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-custom-option-d99s7?file=/example.js)
[![CS-TS]](https://codesandbox.io/s/chakra-react-select-custom-icon-components-typescript-odi90k?file=/app.tsx)

### Custom `LoadingIndicator` (Chakra `Spinner`)

For most sub components, the styling can be easily accomplished using the
[`chakraStyles`](#chakrastyles) prop. However, in the case of the
`LoadingIndicator` there are a few props which do not directly correlate very
well with styling props. To solve that problem, the
`chakraComponents.LoadingIndicator` component can be passed a few extra props
which are normally available on the Chakra UI
[`Spinner`](https://chakra-ui.com/docs/components/spinner). Here is an example
demonstrating which extra props are offered:

```jsx
import { AsyncSelect, chakraComponents } from "chakra-react-select";

// These are the defaults for each of the custom props
const asyncComponents = {
  LoadingIndicator: (props) => (
    <chakraComponents.LoadingIndicator
      // The color of the main line which makes up the spinner
      // This could be accomplished using `chakraStyles` but it is also available as a custom prop
      color="currentColor" // <-- This default's to your theme's text color (Light mode: gray.700 | Dark mode: whiteAlpha.900)
      // The color of the remaining space that makes up the spinner
      emptyColor="transparent"
      // The `size` prop on the Chakra spinner
      // Defaults to one size smaller than the Select's size
      spinnerSize="md"
      // A CSS <time> variable (s or ms) which determines the time it takes for the spinner to make one full rotation
      speed="0.45s"
      // A CSS size string representing the thickness of the spinner's line
      thickness="2px"
      // Don't forget to forward the props!
      {...props}
    />
  ),
};

const App = () => (
  <AsyncSelect
    isMulti
    name="colors"
    placeholder="Select some colors..."
    components={asyncComponents}
    loadOptions={(inputValue, callback) => {
      setTimeout(() => {
        const values = colourOptions.filter((i) =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        callback(values);
      }, 3000);
    }}
  />
);
```

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-custom-loadingindicator-1n9q6d?file=/example.js)
[![CS-TS]](https://codesandbox.io/s/chakra-react-select-custom-loadingindicator-typescript-5gx6kz?file=/app.tsx)

## `useChakraSelectProps`

Being a wrapper for `react-select`, all of the customizations done to
react-select are passed in as props. There is a hook,
[`useChakraSelectProps`](https://github.com/csandman/chakra-react-select/blob/main/src/use-chakra-select-props.ts)
that handles merging any extra customizations from the end user with the
customizations done by this package. In some cases you may simply want to use
this hook to get the custom props and pass them into a `react-select` instance
yourself.

To do so, simply import the hook from this package, and call it by passing in
any extra custom props you'd like into it and spread it onto a base
`react-select` component:

```jsx
import { useState } from "react";
import { useChakraSelectProps } from "chakra-react-select";
import Select from "react-select";
import { options } from "./data";

const CustomSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const selectProps = useChakraSelectProps({
    isMulti: true,
    value: selectedOptions,
    onChange: setSelectedOptions,
  });

  return <Select {...selectProps} />;
};
```

One example of how you might use this is to customize the component
`react-google-places-autocomplete`, which is an autocomplete dropdown for Google
Places that uses the `AsyncSelect` from `react-select` as it's core. Therefore,
it accepts all of the same select props as the core react-select does meaning
you can use the `useChakraSelectProps` hook to style it:

```jsx
import { useState } from "react";
import { useChakraSelectProps } from "chakra-react-select";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const GooglePlacesAutocomplete = () => {
  const [place, setPlace] = useState(null);

  const selectProps = useChakraSelectProps({
    value: place,
    onChange: setPlace,
  });

  return (
    <GooglePlacesAutocomplete
      apiKey="YOUR API KEY HERE"
      selectProps={selectProps}
    />
  );
};

export default GooglePlacesAutocomplete;
```

**NOTE:** An API key would be needed to create a CodeSandbox example for this so
you will have to implement it in your own project if you'd like to test it out.

## Usage with React Form Libraries

_This section is a work in progress, check back soon for more examples_

This package can be used with form controllers such as Formik or React Hook Form
in the same way you would with the original React Select, and the quickest way
to figure out how to do so would be to Google something along the lines of
"react-select with formik/react-hook-form/etc" and replace `react-select` in
those examples with `chakra-react-select`. However, here are a few examples to
help you get started. If you'd like to see examples using other form providers,
you can
[submit it as a Q&A discussion](https://github.com/csandman/chakra-react-select/discussions/categories/q-a).

### [`react-hook-form`](https://react-hook-form.com/)

See this issue for some discussion about using this package with
`react-hook-form`: https://github.com/csandman/chakra-react-select/issues/7

By default, `react-hook-form` uses
[uncontrolled components](https://reactjs.org/docs/uncontrolled-components.html)
to reduced input renders however this only works for native HTML inputs. Because
chakra-react-select is not a native HTML input, you'll need to use
react-hook-form's
[`Controller`](https://react-hook-form.com/api/usecontroller/controller)
component or [`useController`](https://react-hook-form.com/api/usecontroller)
hook in order to keep the value(s) tracked in `react-hook-form`'s state. Here
are some examples using each:

#### `Controller` multi select with built-in validation

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-react-hook-form-controller-v7llc?file=/example.js)
[![CS-TS]](https://codesandbox.io/s/chakra-react-select-react-hook-form-controller-typescript-v8ps5?file=/app.tsx)

#### `useController` multi select with built-in validation

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-react-hook-form-usecontroller-n8wuf?file=/example.js)
[![CS-TS]](https://codesandbox.io/s/chakra-react-select-react-hook-form-usecontroller-typescript-qcm23?file=/app.tsx)

#### `useController` single select

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-react-hook-form-usecontroller-single-select-vanilla-js-11x4zk?file=/example.js)
[![CS-TS]](https://codesandbox.io/s/chakra-react-select-react-hook-form-usecontroller-single-select-typescript-vylckh?file=/app.tsx)

#### Multi select with [`yup`](https://github.com/jquense/yup) validation (advanced example)

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-react-hook-form-with-yup-validation-tno8v?file=/src/app.js)
[![CS-TS]](https://codesandbox.io/s/chakra-react-select-react-hook-form-with-yup-validation-typescript-n7slhu?file=/app.tsx)

#### Single select with [`yup`](https://github.com/jquense/yup) validation (advanced example)

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-single-react-hook-form-with-yup-validation-y5kjc1?file=/src/app.js)
[![CS-TS]](https://codesandbox.io/s/chakra-react-select-single-react-hook-form-with-yup-validation-typescript-phmv0u?file=/app.tsx)

#### Multi select with [`zod`](https://github.com/colinhacks/zod) validation (advanced example)

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-react-hook-form-with-zod-validation-cu0rku?file=/src/app.js)
[![CS-TS]](https://codesandbox.io/s/chakra-react-select-react-hook-form-with-zod-validation-typescript-5fyhfh?file=/app.tsx)

#### Single select with [`zod`](https://github.com/colinhacks/zod) validation (advanced example)

[![CS-JS]](https://codesandbox.io/s/chakra-react-select-single-react-hook-form-with-zod-validation-jd588n?file=/src/app.js)
[![CS-TS]](https://codesandbox.io/s/chakra-react-select-single-react-hook-form-with-zod-validation-typescript-m1dqme?file=/app.tsx)

### [`formik`](https://formik.org/)

See this issue for some discussion about using this package with `formik`:
https://github.com/csandman/chakra-react-select/issues/23

#### Single select with built-in validation

- Vanilla JS: _coming soon_
- TypeScript: _coming soon_

#### Multi select with built-in validation

- Vanilla JS: _coming soon_
- TypeScript: _coming soon_

#### Multi select with `yup` validation

- Vanilla JS: _coming soon_
- TypeScript: _coming soon_

## CodeSandbox Templates

When submitting a bug report, please include a minimum reproduction of your
issue using one of these templates:

- React Vanilla JS Starter:
  https://codesandbox.io/s/chakra-react-select-vsvr0?file=/example.js
- React Typescript Starter:
  https://codesandbox.io/s/chakra-react-select-typescript-4sce1?file=/app.tsx
- Next.js Vanilla JS Starter:
  https://codesandbox.io/s/chakra-react-select-next-js-dtnsm?file=/pages/index.js
- Next.js Typescript Starter:
  https://codesandbox.io/s/chakra-react-select-next-js-typescript-kscuf?file=/pages/index.tsx
