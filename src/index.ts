/* eslint-disable @typescript-eslint/no-unused-vars */
import type { BoxProps, ColorPalette } from "@chakra-ui/react";
import type { GroupBase, StylesConfig, ThemeConfig } from "react-select";
import type {
  ChakraStylesConfig,
  SelectedOptionStyle,
  SizeProp,
  TagVariant,
  Variant,
} from "./types";

/**
 * This is necessary for the module `react-select/base` to be seen by TypeScript.
 * Without it the module augmentation will not work properly.
 *
 * @see {@link https://github.com/JedWatson/react-select/pull/5762#issuecomment-1765467219}
 * @see {@link https://github.com/JedWatson/react-select/pull/5762#issuecomment-1766814503}
 */
export type { Props as ReactSelectBaseProps } from "react-select/base";

/**
 * Module augmentation is used to add extra props to the existing interfaces
 * from `react-select` as per the docs
 *
 * @see {@link https://react-select.com/typescript#custom-select-props}
 */
declare module "react-select/base" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>,
  > {
    /**
     * The size of the base control; matches the sizes of the chakra Input
     * component with the exception of `xs`. A [responsive style array/object](https://v2.chakra-ui.com/docs/features/responsive-styles) can
     * also be passed.
     *
     * Options: `sm` | `md` | `lg`
     *
     * @defaultValue `md`
     * @see {@link https://github.com/csandman/chakra-react-select#size--options-responsivevaluesm--md--lg--default-md}
     * @see {@link https://v2.chakra-ui.com/docs/components/input#changing-the-size-of-the-input}
     */
    size?: SizeProp;

    /**
     * Determines whether or not to style the input with the invalid border
     * color.
     *
     * If the `aria-invalid` prop is not passed, this prop will also set that
     *
     * @defaultValue `false`
     * @see {@link https://github.com/csandman/chakra-react-select#isinvalid--default-false--isreadonly---default-false}
     * @see {@link https://v2.chakra-ui.com/docs/components/input/props}
     * @see {@link https://v2.chakra-ui.com/docs/components/form-control/props}
     */
    invalid?: boolean;

    /**
     * If `true`, the form control will be `readonly`.
     *
     * @defaultValue `false`
     * @see {@link https://github.com/csandman/chakra-react-select#isinvalid--default-false--isreadonly---default-false}
     * @see {@link https://v2.chakra-ui.com/docs/components/input/props}
     * @see {@link https://v2.chakra-ui.com/docs/components/form-control/props}
     */
    readOnly?: boolean;

    /**
     * A color name that matches a key from your chakra theme and will
     * determine the color scheme of your `MultiValue` component.
     *
     * The variable is passed to the theme key for the Chakra `Tag` component.
     *
     * @defaultValue `"gray"`
     * @see {@link https://github.com/csandman/chakra-react-select#colorscheme}
     * @see {@link https://v2.chakra-ui.com/docs/components/tag/props}
     */
    tagColorPalette?: ColorPalette;

    /**
     * The `variant` prop that will be forwarded to your `MultiValue` component
     * which is represented by a chakra `Tag`. You can also use any custom
     * variants you have added to your theme.
     *
     * Options: "subtle" | "solid" | "outline"
     *
     * @defaultValue `subtle`
     * @see {@link https://github.com/csandman/chakra-react-select#tagvariant--options-subtle--solid--outline--default-subtle}
     * @see {@link https://v2.chakra-ui.com/docs/data-display/tag#props}
     */
    tagVariant?: TagVariant;

    /**
     * Whether to style a selected option by highlighting it in a solid color
     * or adding a check mark next to it like the chakra `Menu` component.
     *
     * Options: `color` | `check`
     *
     * @defaultValue `color`
     * @see {@link https://github.com/csandman/chakra-react-select#selectedoptionstyle--options-color--check--default-color}
     * @see {@link https://v2.chakra-ui.com/docs/components/menu#menu-option-groups}
     */
    selectedOptionStyle?: SelectedOptionStyle;

    /**
     * The color scheme to style an option with when using the
     * `selectedOptionStyle="color"` prop.  Uses the `500` value in light mode
     * and the `300` value in dark mode.
     *
     * @defaultValue `blue`
     * @see {@link https://github.com/csandman/chakra-react-select#selectedoptioncolorscheme--default-blue}
     */
    selectedOptionColorPalette?: ColorPalette;

    /**
     * Style transformation methods for each of the rendered components using,
     * Chakra's `SystemStyleObject` and the props passed into each component.
     *
     * @see {@link https://github.com/csandman/chakra-react-select#chakrastyles}
     * @see {@link https://react-select.com/styles#style-object}
     */
    chakraStyles?: ChakraStylesConfig<Option, IsMulti, Group>;

    /**
     * The main style variant of the `Select` component. This will use styles
     * from Chakra's `Input` component and any custom variants you have added to
     * your theme may be used.
     *
     * Options: `outline` | `filled` | `flushed` | `unstyled`
     *
     * @defaultValue `outline`
     * @see {@link https://v2.chakra-ui.com/docs/components/select#changing-the-appearance}
     * @see {@link https://github.com/csandman/chakra-react-select#variant--options-outline--filled--flushed--unstyled--default-outline}
     */
    variant?: Variant;

    /**
     * @deprecated This prop is not used in `chakra-react-select`, use
     * {@link chakraStyles} instead.
     */
    styles: StylesConfig<Option, IsMulti, Group>;

    /**
     * @deprecated This prop is not used in `chakra-react-select`, all theme
     * values are pulled from your Chakra UI theme.
     */
    theme?: ThemeConfig;
  }
}

declare module "react-select" {
  export interface MultiValueProps<
    Option = unknown,
    IsMulti extends boolean = boolean,
    Group extends GroupBase<Option> = GroupBase<Option>,
  > {
    css: BoxProps["css"];
  }

  export interface MultiValueGenericProps<
    Option = unknown,
    IsMulti extends boolean = boolean,
    Group extends GroupBase<Option> = GroupBase<Option>,
  > {
    css: BoxProps["css"];
  }

  export interface MultiValueRemoveProps<
    Option = unknown,
    IsMulti extends boolean = boolean,
    Group extends GroupBase<Option> = GroupBase<Option>,
  > {
    isFocused: boolean;
    css: BoxProps["css"];
  }

  export interface LoadingIndicatorProps<
    Option = unknown,
    IsMulti extends boolean = boolean,
    Group extends GroupBase<Option> = GroupBase<Option>,
  > {
    /**
     * The color of the filled in area of the spinner.
     *
     * Defaults to your Chakra theme's text color.
     *
     * @defaultValue Light mode: `gray.700` | Dark mode: `whiteAlpha.900`
     */
    color?: string;

    /**
     * The size prop for the Chakra `<Spinner />` component.
     *
     * Defaults to one size smaller than the overall Select's size.
     *
     * @see {@link https://v2.chakra-ui.com/docs/components/spinner#spinner-with-different-size}
     */
    spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl";
  }
}

export { default as Select } from "./select/select";
export { default as CreatableSelect } from "./select/creatable-select";
export { default as AsyncSelect } from "./select/async-select";
export { default as AsyncCreatableSelect } from "./select/async-creatable-select";

export { default as chakraComponents } from "./chakra-components";
export { default as useChakraSelectProps } from "./use-chakra-select-props";

export type { SelectComponent } from "./select/select";
export type { CreatableSelectComponent } from "./select/creatable-select";
export type { AsyncSelectComponent } from "./select/async-select";
export type { AsyncCreatableSelectComponent } from "./select/async-creatable-select";

export type {
  Size,
  SizeProp,
  TagVariant,
  Variant,
  SelectedOptionStyle,
  StylesFunction,
  ChakraStylesConfig,
  OptionBase,
} from "./types";

// Forward all available exports from the original `react-select` package
export * from "react-select";
export { useAsync } from "react-select/async";
export { useCreatable } from "react-select/creatable";
export type { AsyncProps } from "react-select/async";
export type { CreatableProps } from "react-select/creatable";
export type { AsyncCreatableProps } from "react-select/async-creatable";
