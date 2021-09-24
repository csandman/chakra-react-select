# chakra-react-select

[![MIT License](https://badgen.net/github/license/csandman/chakra-react-select "MIT License")](LICENSE)
[![npm - chakra-react-select](https://img.shields.io/npm/v/chakra-react-select "chakra-react-select npm")](https://www.npmjs.com/package/chakra-react-select)
[![bundle size - chakra-react-select](https://badgen.net/bundlephobia/min/chakra-react-select "chakra-react-select bundlephobia")](https://bundlephobia.com/result?p=chakra-react-select)
[![bundle size - chakra-react-select](https://badgen.net/bundlephobia/minzip/chakra-react-select "chakra-react-select bundlephobia")](https://bundlephobia.com/result?p=chakra-react-select)
[![Total Downloads - chakra-react-select](https://badgen.net/npm/dt/chakra-react-select?color=blue "chakra-react-select npm downloads")](https://bundlephobia.com/result?p=chakra-react-select)

This component is a wrapper for the popular react component [react-select](https://react-select.com/home) made using the UI library [Chakra UI](https://chakra-ui.com/).

![Chakra React Select Banner](https://raw.githubusercontent.com/csandman/chakra-react-select/main/github/chakra-react-select.png)

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
  <Select size="sm" />
  <Select size="md" /> // default
  <Select size="lg" />
)
```

- You can pass the `colorScheme` prop to the select component to change all of the selected options tags' colors. You can view the whole list of available color schemes in [the Chakra docs](https://chakra-ui.com/docs/data-display/tag#props), or if you have a custom color palette, any of the custom color names in that will be available instead.
  - Alternatively you can add the `colorScheme` key to any of your options objects and it will only style that option when selected.

```js
return (
  <Select
    colorScheme="purple" // The global color scheme
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
    tagVariant="solid" // The global variant
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

- In your options objects, you can add the key `isFixed: true` to emulate the example in the [react-select docs](https://react-select.com/home#fixed-options). This will prevent the options which have this flag from having the remove button on its corresponding tag. This only applies when using `isMulti`

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

If you have any other questions or requests, leave it as an issue. I'm sure there are some features of `react-select` that I missed and I definitely want to make this wrapper as good as it can be!
