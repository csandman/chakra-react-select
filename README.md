# chakra-react-select

[![MIT License](https://badgen.net/github/license/csandman/chakra-react-select "MIT License")](LICENSE)
[![npm - chakra-react-select](https://img.shields.io/npm/v/chakra-react-select "chakra-react-select npm")](https://www.npmjs.com/package/chakra-react-select)
[![bundle size - chakra-react-select](https://badgen.net/bundlephobia/min/chakra-react-select "chakra-react-select bundlephobia")](https://bundlephobia.com/result?p=chakra-react-select)
[![bundle size - chakra-react-select](https://badgen.net/bundlephobia/minzip/chakra-react-select "chakra-react-select bundlephobia")](https://bundlephobia.com/result?p=chakra-react-select)
[![Total Downloads - chakra-react-select](https://badgen.net/npm/dt/chakra-react-select?color=blue "chakra-react-select npm downloads")](https://www.npmjs.com/package/chakra-react-select)

This component is a wrapper for the popular react component [react-select](https://react-select.com/home) made using the UI library [Chakra UI](https://chakra-ui.com/).

![Chakra React Select Banner](./github/chakra-react-select.png)

Check out the demo here: https://codesandbox.io/s/chakra-react-select-demo-65ohb?file=/example.js

## Usage

In order to use this package, you'll need to have `@chakra-ui/react` set up [like in the guide in their docs](https://chakra-ui.com/docs/getting-started#installation). Then install this package:

```sh
npm i chakra-react-select
```

Then you can import the base select package, the async select, the creatable select or the async creatable select:

```js
import {
  Select,
  AsyncSelect,
  CreatableSelect,
  AsyncCreatableSelect,
} from "chakra-react-select";
```

In order to use this component, you can implement it and use it like you would normally use [react-select](https://react-select.com/home). It should accept all of the props that the original takes, however customizing the `theme` or the `components` could break this implementation so change them at your own risk. There are also a few extra things you can do with this wrapper that pull from the chakra library.

- You can pass the `size` prop with either `sm`, `md`, or `lg` (default is `md`). These will reflect the sizes available on the [Chakra `<Input />` component](https://chakra-ui.com/docs/form/input#changing-the-size-of-the-input) (with the exception of `xs` because it's too small to work).

```js
return (
  <>
    <Select size="sm" />
    <Select size="md" /> {/* Default */}
    <Select size="lg" />
  </>
);
```

- You can pass the `colorScheme` prop to the select component to change all of the selected options tags' colors. You can view the whole list of available color schemes in [the Chakra docs](https://chakra-ui.com/docs/data-display/tag#props), or if you have a custom color palette, any of the custom color names in that will be available instead.
  - Alternatively you can add the `colorScheme` key to any of your options objects and it will only style that option when selected.

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

- You can pass the `tagVariant` prop with either `subtle`, `solid`, or `outline` (default is `subtle`). These will reflect the `variant` prop available on the [Chakra `<Tag />` component](https://chakra-ui.com/docs/data-display/tag#props).
  - Alternatively you can add the `variant` key to any of your options objects and it will only style that option when selected. This will override the `tagVariant` prop on the select if both are set

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

- You can pass `isInvalid` to the select component to style it like the Chakra `<Input />` is styled when it receives the same prop.
  - You can pass `isInvalid` or `isDisabled` to a `<FormControl />` which surrounds this component and it will output their corresponding `<Input />` styles.

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

- One thing I added which isn't specific to Chakra or react-select is sticky group headers. It adds a border to the bottom of the header and keeps it in view while its corresponding group of options is visible. This can be very nice for when you have long lists of grouped options so you can always tell which group of options you're looking at. To add it, pass the `hasStickyGroupHeaders` prop to the select component.

```js
return <Select hasStickyGroupHeaders />;
```

![Sticky Group Headers](./github/sticky-group-headers.png)

- In your options objects, you can add the key `isFixed: true` to emulate the example in the [react-select docs](https://react-select.com/home#fixed-options). This will prevent the options which have this flag from having the remove button on its corresponding tag. This only applies when using `isMulti` is passed.

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

- In `v1.3.0` you can now pass the prop `selectedOptionStyle` with either `"color"` or `"check"` (defaults to `"color"`). Until this version I had forgotten to style the selected options in the menu for both the single select, or the multi-select with `hideSelectedOptions` set to `false`. The default option `"color"` will style a selected option similar to how react-select does it, by highlighting the selected option in the color blue. Alternatively if you pass `"check"` for the value, the selected option will be styled like the [Chakra UI Menu component](https://chakra-ui.com/docs/overlay/menu#menu-option-groups) and include a check icon next to the selected option(s). If `isMulti` and `selectedOptionStyle="check"` are passed, space will only be added for the check marks if `hideSelectedOptions={false}` is also passed.

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

- If you choose to stick with the default `selectedOptionStyle="color"`, you have one additional styling option. If you do not like the default of blue for the highlight color, you can pass the `selectedOptionColor` prop to change it. This prop will accept any named color from your color theme, and it will use the `500` value in light mode or the `300` value in dark mode.

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

If you have any other questions or requests, leave it as an issue. I'm sure there are some features of `react-select` that I missed and I definitely want to make this wrapper as good as it can be!

## CodeSandbox Templates

When submitting a bug report, please include a minimum reproduction of your issue using one of these templates:

- React Vanilla JS Starter: https://codesandbox.io/s/chakra-react-select-vsvr0?file=/example.js
- React Typescript Starter: https://codesandbox.io/s/chakra-react-select-typescript-4sce1?file=/app.tsx
- Next.js Vanilla JS Starter: https://codesandbox.io/s/chakra-react-select-next-js-dtnsm?file=/pages/index.js
- Next.js Typescript Starter: https://codesandbox.io/s/chakra-react-select-next-js-typescript-kscuf?file=/pages/index.tsx

## Roadmap

Since releasing this project, there have been a few things brought to my attention from users that I would like to update in the near future.

#### [react-select v5](https://github.com/JedWatson/react-select/releases/tag/react-select%405.0.0)

It was brought to my attention in [this issue](https://github.com/csandman/chakra-react-select/issues/5) that react-select had a version 5 release almost immediately after I released this package (great timing right 😏). This version is rebuilt in TypeScript so you no longer need to install `@types/react-select` to access the types. I made a first pass at upgrading to the new version, and the errors I faced along with [some](https://github.com/csandman/chakra-react-select/issues/8) [comments](https://github.com/chakra-ui/chakra-ui/issues/1293#issuecomment-928934615) I have been receiving from people have made me realize that I probably set up the types incorrectly when I first made this project. I still plan to make the switch soon, however I will need to take a deep dive into the inner workings of react-select's TypeScript support along with how TypeScript works itself, as i am very new to it. If anyone would like to help me make the upgrade/fix the way my types are implemented, I'd greatly appreciate it!

#### [Better Customization](https://github.com/csandman/chakra-react-select/issues/2)

It has been requested multiple times for me to include some way to customize the components to the same degree that they can be customized in the original react-select package. This will involve a great deal of improvement to the flexibility of this wrapper which was originally intended to be a basic wrapper in order to match Chakra UI's styles. I plan to do this, however I am still working out the implementation details.

As of right now, my plan is to nix the `theme` prop and rely on passing custom `components` which extend the components I have made for this wrapper. If I had both, I believe there would be too much room for error and I wouldn't be confident that everything would look right. Besides, Chakra has a built in prop system for styling ([style props](https://chakra-ui.com/docs/features/style-props), [`sx`](https://chakra-ui.com/docs/features/the-sx-prop), and [`__css`](https://chakra-ui.com/docs/theming/component-style)) so implementing the theme prop on top of that would most likely be overkill.
