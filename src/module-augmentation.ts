/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SystemStyleObject } from "@chakra-ui/system";
import type { GroupBase } from "react-select";
import type {
  ChakraStylesConfig,
  SelectedOptionStyle,
  Size,
  TagVariant,
} from "./types";

declare module "react-select/dist/declarations/src/Select" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    /**
     * The size of the base control; matches the sizes of the chakra Input
     * component with the exception of `xs`
     *
     * Options: `sm` | `md` | `lg`
     *
     * @defaultValue `md`
     * @link https://github.com/csandman/chakra-react-select#size--options-sm-md-lg--default-md
     * @link https://chakra-ui.com/docs/form/input#changing-the-size-of-the-input
     */
    size?: Size;

    /**
     * Determines whether or not to style the input with the invalid border
     * color
     *
     * If the `aria-invalid` prop is not passed, this prop will also set that
     *
     * @defaultValue `false`
     * @link https://github.com/csandman/chakra-react-select#isinvalid--default-false
     * @link https://chakra-ui.com/docs/form/input#props
     */
    isInvalid?: boolean;

    /**
     * A color name that matches a key from your chakra theme and will
     * determine the color scheme of your `MultiValue` component
     *
     * The styling matches the chakra `Tag` component
     *
     * @defaultValue `"gray"`
     * @link https://github.com/csandman/chakra-react-select#colorscheme
     * @link https://chakra-ui.com/docs/data-display/tag#props
     */
    colorScheme?: string;

    /**
     * The `variant` prop that will be forwarded to your `MultiValue` component
     * which is represented by a chakra `Tag`
     *
     * Options: "subtle" | "solid" | "outline"
     *
     * @defaultValue `subtle`
     * @link https://github.com/csandman/chakra-react-select#tagvariant--options-subtle-solid-outline--default-subtle
     * @link https://chakra-ui.com/docs/data-display/tag#props
     */
    tagVariant?: TagVariant;

    /**
     * Passing `true` for this prop will make the group headers
     * `position: sticky` and keep them stuck to the top while their
     * corresponding group is in view
     *
     * @defaultValue `false`
     * @link https://github.com/csandman/chakra-react-select#hasstickygroupheaders--default-false
     */
    hasStickyGroupHeaders?: boolean;

    /**
     * Whether to style a selected option by highlighting it in a solid color
     * or adding a check mark next to it like the chakra `Menu` component
     *
     * Options: `color` | `check`
     *
     * @defaultValue `color`
     * @link https://github.com/csandman/chakra-react-select#selectedoptionstyle--options-color-check--default-color
     * @link https://chakra-ui.com/docs/overlay/menu#menu-option-groups
     */
    selectedOptionStyle?: SelectedOptionStyle;

    /**
     * The color scheme to style an option with when using the
     * `selectedOptionStyle="color"` prop.  Uses the `500` value in light mode
     * and the `300` value in dark mode.
     *
     * @defaultValue `blue`
     * @link https://github.com/csandman/chakra-react-select#selectedoptioncolor--default-blue
     */
    selectedOptionColor?: string;

    /**
     * The color value to style the border of the `Control` with when the
     * select is focused
     *
     * @defaultValue `blue.500`
     * @link https://github.com/csandman/chakra-react-select#focusbordercolor--default-blue500--errorbordercolor--default-red500
     * @link https://chakra-ui.com/docs/form/input#changing-the-focus-and-error-border-colors
     */
    focusBorderColor?: string;

    /**
     * The color value to style the border of the `Control` with when
     * `isInvalid` is passed to the select
     *
     * @defaultValue `red.500`
     * @link https://github.com/csandman/chakra-react-select#focusbordercolor--default-blue500--errorbordercolor--default-red500
     * @link https://chakra-ui.com/docs/form/input#changing-the-focus-and-error-border-colors
     */
    errorBorderColor?: string;

    /**
     * The color used to style the text in the `Placeholder`, `LoadingMessage`,
     * and `NoOptionsMessage`.
     *
     * @defaultValue `gray.400` in light mode | `whiteAlpha.400` in dark mode
     * @link https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/styles.ts#L13
     */
    placeholderColor?: string;

    /**
     * Style transformation methods for each of the rendered components using,
     * Chakra's `SystemStyleObject` and the props passed into each component
     *
     * @link https://github.com/csandman/chakra-react-select#chakrastyles
     * @link https://react-select.com/styles#style-object
     */
    chakraStyles?: ChakraStylesConfig<Option, IsMulti, Group>;
  }
}

declare module "react-select/dist/declarations/src/components/MultiValue" {
  export interface MultiValueProps<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    sx: SystemStyleObject;
  }

  export interface MultiValueGenericProps<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    sx: SystemStyleObject;
  }

  export interface MultiValueRemoveProps<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    isFocused: boolean;
    sx: SystemStyleObject;
  }
}

declare module "react-select/dist/declarations/src/components/indicators" {
  export interface LoadingIndicatorProps<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    /**
     * The color of the filled in area of the spinner
     *
     * @defaultValue `gray.700`
     */
    color?: string;

    /**
     * The color of the empty area in the spinner
     *
     * @defaultValue `transparent`
     * @see {@link https://chakra-ui.com/docs/components/feedback/spinner#spinner-with-empty-area-color}
     */
    emptyColor?: string;

    /**
     * The size prop for the Chakra `<Spinner />` component.
     *
     * Defaults to one size smaller than the overall Select's size
     *
     * @see {@link https://chakra-ui.com/docs/components/feedback/spinner#spinner-with-different-size}
     */
    spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl";

    /**
     * The speed of the spinner represented by the time it takes to make one full rotation.
     *
     * This speed is represented by a CSS `<time>` variable which uses either seconds or milliseconds
     *
     * @defaultValue `0.45s`
     * @example
     * ```jsx
     * <Spinner speed="0.2s"/>
     * ```
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/time}
     * @see {@link https://chakra-ui.com/docs/components/feedback/spinner#props}
     */
    speed?: string;

    /**
     * The thickness of the spinner
     *
     * @defaultValue `2px`
     * @example
     * ```jsx
     * <Spinner thickness="4px"/>
     * ```
     * @see {@link https://chakra-ui.com/docs/components/feedback/spinner#props}
     */
    thickness?: string;
  }
}
