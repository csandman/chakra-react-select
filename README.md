# chakra-react-select

[![MIT License](https://badgen.net/github/license/csandman/chakra-react-select "MIT License")](LICENSE.md)
[![npm - chakra-react-select](https://img.shields.io/npm/v/chakra-react-select "chakra-react-select npm")](https://www.npmjs.com/package/chakra-react-select)
[![bundle size - chakra-react-select](https://badgen.net/bundlephobia/min/chakra-react-select "chakra-react-select bundlephobia")](https://bundlephobia.com/result?p=chakra-react-select)
[![bundle size - chakra-react-select](https://badgen.net/bundlephobia/minzip/chakra-react-select "chakra-react-select bundlephobia")](https://bundlephobia.com/result?p=chakra-react-select)
[![Total Downloads - chakra-react-select](https://badgen.net/npm/dt/chakra-react-select?color=blue "chakra-react-select npm downloads")](https://www.npmjs.com/package/chakra-react-select)

This component is a wrapper for the popular react component [react-select](https://react-select.com/home) made using the UI library [Chakra UI](https://chakra-ui.com/).

![Chakra React Select Banner](./github/chakra-react-select.png)

Check out the demos here:

- Vanilla JS: https://codesandbox.io/s/chakra-react-select-demo-65ohb?file=/example.js
- TypeScript: https://codesandbox.io/s/chakra-react-select-ts-demo-vz9ut?file=/app.tsx

**NOTE:** Before leaving an issue on this project, remember that this is just a _wrapper_ for `react-select`, not a standalone package. A large percent of the questions people have end up being about how `react-select` itself works, so please read through their documentation to familiarize yourself with it! https://react-select.com/home

## Contents

- [Usage](#usage)
- [Extra Props](#extra-props)
  - [`size`](#size--options-sm-md-lg--default-md)
  - [`colorScheme`](#colorscheme)
  - [`tagVariant`](#tagvariant--options-subtle-solid-outline--default-subtle)
  - [`isInvalid`](#isinvalid--default-false)
  - [`focusBorderColor` / `errorBorderColor`](#focusbordercolor--default-blue500--errorbordercolor--default-red500)
  - [`hasStickyGroupHeaders`](#hasstickygroupheaders--default-false)
  - [`selectedOptionStyle`](#selectedoptionstyle--options-color-check--default-color)
  - [`selectedOptionColor`](#selectedoptioncolor--default-blue)
  - [`isFixed`](#isfixed)
- [Styling](#styling)
  - [`chakraStyles`](#chakrastyles)
    - [Caveats](#caveats)
    - [Examples](#examples)
  - [Theme Styles](#theme-styles)
  - [`className`](#classname)
- [TypeScript Support](#typescript-support)
- [Customizing Components](#customizing-components)
  - [Custom `LoadingIndicator` (Chakra `Spinner`)](#custom-loadingindicator-chakra-spinner)
- [CodeSandbox Templates](#codesandbox-templates)

## Usage

In order to use this package, you'll need to have `@chakra-ui/react` set up [like in the guide in their docs](https://chakra-ui.com/docs/getting-started#installation). Then install this package:

```sh
npm i chakra-react-select
```

Then you can import the base select package, the async select, the creatable select or the async creatable select:

```js
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";
```

In order to use this component, you can implement it and use it like you would normally use [react-select](https://react-select.com/home). It should accept almost all of the props that the original takes, with a few additions and exceptions.

## Extra Props

#### `size` — Options: `sm`, `md`, `lg` — Default: `md`

You can pass the `size` prop with either `sm`, `md`, or `lg` (default is `md`). These will reflect the sizes available on the [Chakra `<Input />` component](https://chakra-ui.com/docs/form/input#changing-the-size-of-the-input) (with the exception of `xs` because it's too small to work).

```js
return (
  <>
    <Select size="sm" />
    <Select size="md" /> {/* Default */}
    <Select size="lg" />
  </>
);
```

#### `colorScheme`

You can pass the `colorScheme` prop to the select component to change all of the selected options tags' colors. You can view the whole list of available color schemes in [the Chakra docs](https://chakra-ui.com/docs/data-display/tag#props), or if you have a custom color palette, any of the custom color names in that will be available instead.

Alternatively you can add the `colorScheme` key to any of your options objects and it will only style that option when selected.

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

#### `tagVariant` — Options: `subtle`, `solid`, `outline` — Default: `subtle`

You can pass the `tagVariant` prop with either `subtle`, `solid`, or `outline` (default is `subtle`). These will reflect the `variant` prop available on the [Chakra `<Tag />` component](https://chakra-ui.com/docs/data-display/tag#props).

Alternatively you can add the `variant` key to any of your options objects and it will only style that option when selected. This will override the `tagVariant` prop on the select if both are set

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

#### `isInvalid` — Default: `false`

You can pass `isInvalid` to the select component to style it like the Chakra `<Input />` is styled when it receives the same prop.

You can pass also pass `isInvalid` or `isDisabled` to a wrapping `<FormControl />` and it will output their corresponding `<Input />` on the select.

```js
return (
  <>
    {/* This will show up with a red border */}
    <Select isInvalid />

    {/* This will show up with a red border, and grayed out */}
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

#### `focusBorderColor` — Default: `blue.500` | `errorBorderColor` — Default: `red.500`

The props `focusBorderColor` and `errorBorderColor` can be passed with Chakra color strings which will emulate the respective props being passed to [Chakra's `<Input />` component](https://chakra-ui.com/docs/form/input#changing-the-focus-and-error-border-colors).

```js
return (
  <>
    <Select focusBorderColor="green.500" />
    <Select errorBorderColor="orange.500" />
  </>
);
```

![Orange errorBorderColor](./github/custom-error-border.png)

#### `hasStickyGroupHeaders` — Default: `false`

One additional feature which isn’t specific to Chakra or react-select is sticky group headers. It adds a border to the bottom of the header and keeps it in view while its corresponding group of options is visible. This can be very nice for when you have long lists of grouped options so you can always tell which group of options you're looking at. To add it, pass the `hasStickyGroupHeaders` prop to the select component.

- Example: https://codesandbox.io/s/chakra-react-select-hasstickygroupheaders-wg39g?file=/example.js

```js
return <Select hasStickyGroupHeaders />;
```

**NOTE:** It has recently been discovered that when using this prop, navigating up through the available options with the arrow key will keep the focused option underneath the header, as it will not scroll enough to account for it being there. So if this is an issue for you, avoid this prop. A fix for this is being investigated.

![Sticky Group Headers](./github/sticky-group-headers.png)

#### `selectedOptionStyle` — Options: `color`, `check` — Default: `color`

In `v1.3.0` you can now pass the prop `selectedOptionStyle` with either `"color"` or `"check"` (defaults to `"color"`). The default option `"color"` will style a selected option similar to how react-select does it, by highlighting the selected option in the color blue. Alternatively if you pass `"check"` for the value, the selected option will be styled like the [Chakra UI Menu component](https://chakra-ui.com/docs/overlay/menu#menu-option-groups) and include a check icon next to the selected option(s). If `isMulti` and `selectedOptionStyle="check"` are passed, space will only be added for the check marks if `hideSelectedOptions={false}` is also passed.

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

#### `selectedOptionColor` — Default: `blue`

If you choose to stick with the default `selectedOptionStyle="color"`, you have one additional styling option. If you do not like the default of blue for the highlight color, you can pass the `selectedOptionColor` prop to change it. This prop will accept any named color from your color theme, and it will use the `500` value in light mode or the `300` value in dark mode.

```js
return (
  <>
    <Select selectedOptionColor="blue" /> {/* Default */}
    <Select selectedOptionColor="purple" />
  </>
);
```

![Purple Selected Option Color (light mode)](./github/purple-selected-option-light.png)

![Purple Selected Option Color (dark mode)](./github/purple-selected-option-dark.png)

#### `isFixed`

In your options objects, you can add the key `isFixed: true` to emulate the example in the [react-select docs](https://react-select.com/home#fixed-options). This will prevent the options which have this flag from having the remove button on its corresponding tag, and it changes the default `tagVariant` for that tag to be solid. This only applies when using `isMulti`.

```js
return (
  <Select
    isMulti
    options={[
      {
        label: "I can't be removed",
        value: "fixed",
        isFixed: true,
      },
      {
        label: "I can be removed",
        value: "not-fixed",
      },
    ]}
  />
);
```

If you have any other requests for Chakra-like features that could be added, or problems with the current features, [please submit an issue](https://github.com/csandman/chakra-react-select/issues/new/choose)!

## Styling

There are a few ways to style the components that make up `chakra-react-select`. It's important to note that this package does not use the `theme` or `styles` props that are implemented in `react-select`. The `theme` prop isn't used as most of the components' base styles are pulling from your Chakra theme, and customizing your base theme (such as colors or component styles) should in turn change the styles in this package.

This package does however offer an alternative to the `styles` prop, `chakraStyles`. It mostly emulates the behavior of the original `styles` prop, however, because it’s not identical it is named differently to prevent confusion.

### `chakraStyles`

In order to use the `chakraStyles` prop, first check the documentation for [the original `styles` prop from the react-select docs](https://react-select.com/styles#style-object). This package offers an identical API for the `chakraStyles` prop, however the `provided` and output style objects use [Chakra's `sx` prop](https://chakra-ui.com/docs/features/the-sx-prop) instead of the default emotion styles the original package offers. This allows you to both use the shorthand styling props you'd normally use to style Chakra components, as well as tokens from your theme such as named colors.

The API for an individual style function looks like this:

```js
/**
 * @param {SystemStyleObject} provided -- The component's default Chakra styles
 * @param {Object} state -- The component's current state e.g. `isFocused` (this gives all of the same props that are passed into the component)
 * @returns {SystemStyleObject} An output style object which is forwarded to the component's `sx` prop
 */
function option(provided, state) {
  return {
    ...provided,
    color: state.isFocused ? "blue.500" : "red.400",
  };
}
```

All of the style keys offered in the original package can be used here, except for `input` as that does not allow me to use the `chakraStyles` from the select props. The `input` styles are also much more dynamic and should be left alone for the most part.

Most of the components rendered by this package use the basic [Chakra `<Box />` component](https://chakra-ui.com/docs/layout/box) with a few exceptions. Here are the style keys offered and the corresponding Chakra component that is rendered:

- `clearIndicator` - `Box` (uses theme styles for Chakra's `CloseButton`)
- `container` - `Box`
- `control` - `Box` (uses theme styles for Chakra's `Input`)
- `dropdownIndicator` - `Box` (uses theme styles for Chrakra's `InputRightAddon`)
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

If you're using TypeScript, the `chakraStyles` prop is defined by the exported `ChakraStylesConfig` interface.

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

One change between the keys in the `chakraStyles` prop and the original `styles` prop, is that in the original the `input` styles apply to a container surrounding the html `<input />` element, and there is no key for styling the input itself. With the `chakraStyles` object, the `input` key now styles the actual `<chakra.input />` element and there is a new key, `inputContainer`, that styles the surrounding `Box`. Both functions use the `state` argument for the original `input` key.

There are also two extra style keys for the icons contained within the indicators that are not offered in the original package. These are `downChevron` which is contained inside the `DropdownIndicator`, and the `crossIcon` which is contained inside the `ClearIndicator`. Both styles receive the same `state` values as their containing indicators. These style keys were added as a convenience, however you could also apply the same styles using the parent `chakraStyles` by doing something like this:

```js
// Demo: https://codesandbox.io/s/chakra-react-select-dropdown-indicator-flip-lhc4ep?file=/example.js

const chakraStyles = {
  dropdownIndicator: (prev, { selectProps }) => ({
    ...prev,
    "> svg": {
      transform: `rotate(${selectProps.menuIsOpen ? -180 : 0}deg)`,
    },
  }),
};
```

Additionally, there is one key that is available in the `styles` prop that does not exist in the `chakraStyles` object; `menuPortal`. This key applies to the `MenuPortal` element which is only used when the [`menuPortalTarget`](https://react-select.com/advanced#portaling) prop is passed in. This component is replaceable, however it is very tightly integrated with the menu placement logic (and a context provider) so it appears to be impossible to fully replace it with a chakra component. And in turn, it can't pull a key from the `chakraStyles` prop. Therefor, if you are passing the `menuPortalTarget` prop and would like to change the styles of the `MenuPortal` component, you have two options:

1. Pass the original `styles` prop with the `menuPortal` key. This is the only key in the `styles` object that will be applied to your components.

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

2. Pass the `classNamePrefix` prop [as described below]() and style the `MenuPortal` with CSS using the className `prefix__menu-portal`.

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

If anyone has any suggestions for how to fully replace the `MenuPortal` component, please leave a comment on [this issue](https://github.com/csandman/chakra-react-select/issues/55) or submit a pull request.

#### Examples

- Dropdown menu attached to control example:
  - TypeScript: https://codesandbox.io/s/chakra-react-select-chakrastyles-5yh6q?file=/app.tsx
  - Vanilla JS: https://codesandbox.io/s/chakra-react-select-chakrastyles-vanilla-kgdnf?file=/example.js
- Default [Chakra `<Select />`](https://chakra-ui.com/docs/form/select) styles example:
  - TypeScript: https://codesandbox.io/s/chakra-react-select-styled-like-a-default-chakra-select-qwq3o?file=/app.tsx
  - Vanilla JS: https://codesandbox.io/s/chakra-react-select-styled-like-a-default-chakra-select-vanilla-iydfe?file=/example.js

### Theme Styles

As mentioned above, a few of the custom components this package implements either use styles from the global [Chakra component theme](https://chakra-ui.com/docs/theming/customize-theme#customizing-component-styles) or are themselves those components. As this package pulls directly from your Chakra theme, any changes you make to those components' themes will propagate to the components in this package. Here is a list of all components that will be affected by changes to your global styles:

| `react-select` component | `chakra-ui` component styles                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `ClearIndicator`         | [`CloseButton`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/close-button.ts) |
| `Control`                | [`Input`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/input.ts)              |
| `DropdownIndicator`      | [`InputRightAddon`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/input.ts)    |
| `GroupHeading`           | [`Menu` group title](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/menu.ts)    |
| `IndicatorSeparator`     | [`Divider`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/divider.ts)          |
| `LoadingIndicator`       | [`Spinner`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/spinner.ts)          |
| `MenuList`               | [`MenuList`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/menu.ts)            |
| `MultiValueContainer`    | [`Tag`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/tag.ts)                  |
| `MultiValueLabel`        | [`TagLabel`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/tag.ts)             |
| `MultiValueRemove`       | [`TagCloseButton`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/tag.ts)       |
| `Option`                 | [`MenuItem`](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/menu.ts)            |

In addition to specific component styles, any changes you make to your global color scheme will also be reflected in these custom components.

**NOTE:** Only make changes to your global component themes if you want them to appear in all instances of that component. Otherwise, just change the individual components' styles using the `chakraStyles` prop.

### `className`

This package implements the same classNames on the sub components as the original package so you can use these to style sub-components with CSS. Here is an excerpt from [the react-select docs](https://react-select.com/styles#using-classnames) describing how it works:

> If you provide the `className` prop to react-select, the SelectContainer will be given a className based on the provided value.
>
> If you provide the `classNamePrefix` prop to react-select, all inner elements will be given a className
> with the provided prefix.
>
> For example, given `className='react-select-container'` and `classNamePrefix="react-select"`,
> the DOM structure is similar to this:
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
> While we encourage you to use the new Styles API, you still have the option of styling via CSS classes. This ensures compatibility with [styled components](https://www.styled-components.com/), [CSS modules](https://github.com/css-modules/css-modules) and other libraries.

Here is an example of using classNames to style the components: https://codesandbox.io/s/chakra-react-select-classnameprefix-demo-4r2pe?file=/example.js

## TypeScript Support

This package has always supported typescript, however until `3.0.0` none of the type inference was working on the props passed into this component. Now that they are, you may need to pass in some generics in order for your component to work properly.

This package exports all of the named module members of the original `react-select` in case you need their built in types in any of your variable declarations. The root select `Props` type that is exported by `react-select` has been [extended using module augmentation](https://github.com/JedWatson/react-select/issues/4804#issuecomment-927223471) so if you import that type, it will include all of the extra props offered. This package also exports a few custom types that are specific to the custom props offered by this package:

- `ChakraStylesConfig` — The type for the prop `chakraStyles` that can be passed to customize the component styles. This is almost identical to the built in `StylesConfig` type, however it uses Chakra's `SystemStyleObject` type instead of react-select's emotion styles.
- `OptionBase` — A type for your individual select options that includes the custom props for styling each of your selected options. This type is made to give you a base to extend off of and pass in as a generic to the root `Select` component.
- Each of the four Select components has a type exported with it:
  - `SelectComponent`
  - `AsyncSelectComponent`
  - `CreatableSelectComponent`
  - `AsyncCreatableSelectComponent`

Here is an example of how to pass in the proper generics to `chakra-react-select`:

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
 *   isFixed?: boolean;
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
    <Select<ColorOption, true, GroupBase<ColorOption>>
      isMulti
      name="colors"
      options={colorOptions}
      placeholder="Select some colors..."
    />
  }
}
````

## Customizing Components

Like the original `react-select`, this package exports all of the custom components that make up the overall select. However, instead of being exported as `components` they are exported as `chakraComponents` in order to leave the original `components` export from react-select alone (you can export that as well if you'd like). When implementing this component, you have the option to wrap these components and alter their state and the children they return [in the same way the original does](https://react-select.com/components#defining-components).

It's important to note however, that there are 3 components offered in the original `react-select` that are missing from `chakraComponents`. These are the `CrossIcon`, `DownChevron`, and `MenuPortal`. The `MenuPortal` could not be replaced at all [as mentioned earlier](#caveats), so if you'd like to customize it, use the original from the `components` import. The icons posed issues with prop compatibility when passing them into the core `Select` so the easiest way to replace them would be to use a custom `DropdownIndicator` or `ClearIndicator` and pass custom icons in as children:

CodeSandbox: https://codesandbox.io/s/chakra-react-select-custom-icons-xf7scd?file=/example.js

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

Here's a complete example of how you might use custom components to create a select with a custom `Option`:

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

CodeSandbox Examples:

- Vanilla JS: https://codesandbox.io/s/chakra-react-select-custom-option-d99s7?file=/example.js
- TypeScript: https://codesandbox.io/s/chakra-react-select-custom-icon-components-typescript-odi90k?file=/app.tsx

### Custom `LoadingIndicator` (Chakra `Spinner`)

For most sub components, the styling can be easily accomplished using the [`chakraStyles`](#chakrastyles) prop. However, in the case of the `LoadingIndicator` there are a few props which do not directly correlate very well with styling props. To solve that problem, the `chakraComponents.LoadingIndicator` component can be passed a few extra props which are normally available on the Chakra UI [`Spinner`](https://chakra-ui.com/docs/components/feedback/spinner). Here is an example demonstrating which extra props are offered:

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

CodeSandbox examples:

- Vanilla JS: https://codesandbox.io/s/chakra-react-select-custom-loadingindicator-1n9q6d?file=/example.js
- TypeScript: https://codesandbox.io/s/chakra-react-select-custom-loadingindicator-typescript-5gx6kz?file=/app.tsx

## CodeSandbox Templates

When submitting a bug report, please include a minimum reproduction of your issue using one of these templates:

- React Vanilla JS Starter: https://codesandbox.io/s/chakra-react-select-vsvr0?file=/example.js
- React Typescript Starter: https://codesandbox.io/s/chakra-react-select-typescript-4sce1?file=/app.tsx
- Next.js Vanilla JS Starter: https://codesandbox.io/s/chakra-react-select-next-js-dtnsm?file=/pages/index.js
- Next.js Typescript Starter: https://codesandbox.io/s/chakra-react-select-next-js-typescript-kscuf?file=/pages/index.tsx
