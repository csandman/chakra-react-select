# chakra-react-select

This component is a wrapper for the popular react component [react-select](https://react-select.com/home) made using the UI library [Chakra UI](https://chakra-ui.com/).

## Usage

In order to use this package, you'll need to have `@chakra-ui/react` set up [like in the guide in their docs](https://chakra-ui.com/docs/getting-started#installation). Then install this package:

```sh
npm i chakra-react-select
```

Then you can import the base select package, the async select, or the creatable select:

```js
import { Select, AsyncSelect, CreatableSelect } from "chakra-react-select";
```

In order to use this component, you can implement it and use it like you would normally use [react-select](https://react-select.com/home). It should accept all of the props that the original takes, however customizing the `theme` or the `components` could break this implementation so change them at your own risk. There are also a few extra things you can do with this wrapper that pull from the chakra library.

- You can pass the `size` prop with either `sm`, `md`, or `lg` (default is `md`). These will reflect the sizes available on the [Chakra `<Input />` component](https://chakra-ui.com/docs/form/input#changing-the-size-of-the-input) (with the exception of `xs` because it's too small to work).
- You can pass the `colorScheme` prop to the select component to change all of the selected options tags' colors. You can view the whole list of available color schemes in [the Chakra docs](https://chakra-ui.com/docs/data-display/tag#props), or if you have a custom color palette, any of the custom color names in that will be available instead.
  - Alternatively you can add the `colorScheme` value to any of your options objects and it will only style that option when selected.
- You can pass `isInvalid` to the select component to style it like the Chakra `<Input />` is styled when it receives the same prop.
  - You can pass `isInvalid` or `isDisabled` to a `<FormControl />` which surrounds this component and it will output their corresponding `<Input />` styles.
- In your options objects, you can add the key `isFixed` to emulate the example in the [react-select docs](https://react-select.com/home#fixed-options).

Check out the demo here: https://codesandbox.io/s/chakra-react-select-demo-65ohb?file=/example.js

And if you have any other questions or requests, leave it as an issue. I'm sure there are some features of `react-select` that I missed and I definitely want to make this wrapper as good as it can be!

### Known Issues

The only issue I've run into so far is when using Next.js, if you're using the new `esmExternals` flag like so:

```js
// next.config.js

module.exports = {
  experimental: { esmExternals: true },
};
```

Then for some reason this component can't access the context of a parent form control. This prevents it from receiving the `isInvalid` and `isDisabled` props from the form control. You can get around this by importing the esm version of the component directly:

```js
import {
  Select,
  AsyncSelect,
  CreatableSelect,
} from "chakra-react-select/dist/chakra-react-select.esm.js";
```

If anyone knows what's going on with this, definitely let me know!
