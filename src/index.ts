/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SpinnerProps, SystemStyleObject } from "@chakra-ui/react";
import type { GroupBase, StylesConfig, ThemeConfig } from "react-select";
import type {
  ChakraStylesConfig,
  ColorPaletteProp,
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
     * component with the exception of `xs`. A [responsive style array/object](https://www.chakra-ui.com/docs/styling/responsive-design) can
     * also be passed.
     *
     * Options: `sm` | `md` | `lg`
     *
     * @defaultValue `md`
     * @see {@link https://github.com/csandman/chakra-react-select#size--options-responsivevaluesm--md--lg--default-md}
     * @see {@link https://www.chakra-ui.com/docs/components/select#sizes}
     */
    size?: SizeProp;

    /**
     * Determines whether or not to style the input with the invalid border
     * color.
     *
     * If the `aria-invalid` prop is not passed, this prop will also set that
     *
     * @see {@link https://github.com/csandman/chakra-react-select#isinvalid--default-false--isreadonly---default-false}
     * @see {@link https://www.chakra-ui.com/docs/components/select#invalid}
     * @see {@link https://www.chakra-ui.com/docs/components/field#error-text}
     */
    invalid?: boolean;

    /**
     * Whether the select is disabled. Overrides the `isDisabled` prop built-in to `react-select`.
     *
     * @see {@link https://github.com/csandman/chakra-react-select#isinvalid--default-false--isreadonly---default-false}
     * @see {@link https://www.chakra-ui.com/docs/components/select#disabled}
     * @see {@link https://www.chakra-ui.com/docs/components/field#disabled}
     */
    disabled?: boolean;

    /**
     * If `true`, the form control will be `readonly`.
     *
     * @see {@link https://github.com/csandman/chakra-react-select#isinvalid--default-false--isreadonly---default-false}
     * @see {@link https://www.chakra-ui.com/docs/components/select#props}
     * @see {@link https://www.chakra-ui.com/docs/components/field#props}
     */
    readOnly?: boolean;

    /**
     * A color name that matches a key from your chakra theme and will
     * determine the color scheme of your `MultiValue` component.
     *
     * The variable is passed to the theme key for the Chakra `Tag` component.
     *
     * @see {@link https://github.com/csandman/chakra-react-select#colorscheme}
     * @see {@link https://www.chakra-ui.com/docs/components/tag#colors}
     * @see {@link https://www.chakra-ui.com/docs/styling/virtual-color}
     * @see {@link https://github.com/chakra-ui/chakra-ui/blob/9ecae5c/packages/react/src/styled-system/generated/system.gen.ts#L688}
     */
    tagColorPalette?: ColorPaletteProp;

    /**
     * The `variant` prop that will be forwarded to your `MultiValue` component
     * which is represented by a chakra `Tag`. You can also use any custom
     * variants you have added to your theme.
     *
     * Built-in options: `"outline" | "subtle" | "solid" | "surface"`
     *
     * @defaultValue Your theme default (default is `"surface"`)
     * @see {@link https://github.com/csandman/chakra-react-select#tagvariant--options-subtle--solid--outline--default-subtle}
     * @see {@link https://www.chakra-ui.com/docs/components/tag#variants}
     */
    tagVariant?: TagVariant;

    /**
     * Whether to style a selected option by highlighting it in a solid color
     * or adding a check mark on the right hand side like the Chakra `Select` component.
     *
     * Options: `color` | `check`
     *
     * @defaultValue `check`
     * @see {@link https://github.com/csandman/chakra-react-select#selectedoptionstyle--options-color--check--default-color}
     * @see {@link https://www.chakra-ui.com/docs/components/select}
     */
    selectedOptionStyle?: SelectedOptionStyle;

    /**
     * The color palette to style an option with when using the
     * `selectedOptionStyle="color"` prop.  Uses the `color.500` value in light mode
     * and the `color.300` value in dark mode.
     *
     * @defaultValue `blue`
     * @see {@link https://github.com/csandman/chakra-react-select#selectedoptioncolorpalette--default-blue}
     * @see {@link https://www.chakra-ui.com/docs/theming/customization/colors}
     * @see {@link https://github.com/chakra-ui/chakra-ui/blob/9ecae5c/packages/react/src/styled-system/generated/system.gen.ts#L688}
     */
    selectedOptionColorPalette?: ColorPaletteProp;

    /**
     * The color value to style the border of the `Control` with when the
     * select is focused.
     *
     * @see {@link https://github.com/csandman/chakra-react-select#focusringcolor}
     * @see {@link https://www.chakra-ui.com/docs/styling/focus-ring}
     */
    focusRingColor?: string;

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
     * from Chakra's `Select` component and any custom variants you have added to
     * your theme may be used.
     *
     * Options: `outline` | `subtle`
     *
     * @see {@link https://www.chakra-ui.com/docs/components/select#variants}
     * @see {@link https://github.com/csandman/chakra-react-select#variant--options-outline--filled--flushed--unstyled--default-outline}
     */
    variant?: Variant;

    /**
     * This prop is not used in `chakra-react-select`, use {@link chakraStyles} instead.
     *
     * The only exception is setting styles on the `menuPortal` component.
     * @see {@link https://github.com/csandman/chakra-react-select#caveats}
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
    css: SystemStyleObject;
  }

  export interface MultiValueGenericProps<
    Option = unknown,
    IsMulti extends boolean = boolean,
    Group extends GroupBase<Option> = GroupBase<Option>,
  > {
    css: SystemStyleObject;
  }

  export interface MultiValueRemoveProps<
    Option = unknown,
    IsMulti extends boolean = boolean,
    Group extends GroupBase<Option> = GroupBase<Option>,
  > {
    isFocused: boolean;
    endElementCss: SystemStyleObject;
    css: SystemStyleObject;
  }

  export interface LoadingIndicatorProps<
    Option = unknown,
    IsMulti extends boolean = boolean,
    Group extends GroupBase<Option> = GroupBase<Option>,
  > {
    /**
     * The color palette of the filled in area of the spinner.
     *
     * @see {@link https://www.chakra-ui.com/docs/components/spinner#colors}
     * @see {@link https://github.com/chakra-ui/chakra-ui/blob/9ecae5c/packages/react/src/styled-system/generated/system.gen.ts#L688}
     */
    colorPalette?: ColorPaletteProp;

    /**
     * The color of the filled in area of the spinner.
     *
     * Defaults to your Chakra theme's text color.
     * @example
     * ```jsx
     * <Spinner color="blue.600"/>
     * ```
     * @see {@link https://www.chakra-ui.com/docs/components/spinner#custom-color}
     */
    color?: string;

    /**
     * The color of the empty area in the spinner.
     *
     * This prop populates the CSS variable `--spinner-track-color`
     *
     * @example
     * ```jsx
     * <Spinner trackColor="colors.blue.100"/>
     * ```
     * @see {@link https://www.chakra-ui.com/docs/components/spinner#track-color}
     */
    trackColor?: string;

    /**
     * The size prop for the Chakra `<Spinner />` component.
     *
     * Defaults to one size smaller than the overall Select's size.
     *
     * @see {@link https://www.chakra-ui.com/docs/components/spinner#sizes}
     */
    spinnerSize?: SpinnerProps["size"];

    /**
     * The speed of the spinner represented by the time it takes to make one full rotation.
     *
     * This speed is represented by a
     * [CSS `<time>`](https://developer.mozilla.org/en-US/docs/Web/CSS/time)
     * variable which uses either seconds or milliseconds.
     *
     * @example
     * ```jsx
     * <Spinner animationDuration="0.2s"/>
     * ```
     * @see {@link https://www.chakra-ui.com/docs/components/spinner#custom-speed}
     */
    animationDuration?: string;

    /**
     * The thickness of the spinner.
     *
     * @defaultValue `2px`
     * @example
     * ```jsx
     * <Spinner borderWidth="4px"/>
     * ```
     * @see {@link https://www.chakra-ui.com/docs/components/spinner#thickness}
     */
    borderWidth?: string;
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
