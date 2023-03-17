import type { SystemStyleObject } from "@chakra-ui/system";
import type { GroupBase, StylesConfig, ThemeConfig } from "react-select";
import type { ChakraStylesConfig, SelectedOptionStyle, SizeProp, TagVariant, Variant } from "./types";
/**
 * Module augmentation is used to add extra props to the existing interfaces
 * from `react-select` as per the docs
 *
 * @see {@link https://react-select.com/typescript#custom-select-props}
 */
declare module "react-select/dist/declarations/src/Select" {
    interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
        /**
         * The size of the base control; matches the sizes of the chakra Input
         * component with the exception of `xs`. A [responsive style array/object](https://chakra-ui.com/docs/features/responsive-styles) can
         * also be passed.
         *
         * Options: `sm` | `md` | `lg`
         *
         * @defaultValue `md`
         * @see {@link https://github.com/csandman/chakra-react-select#size--options-responsivevaluesm--md--lg--default-md}
         * @see {@link https://chakra-ui.com/docs/components/input#changing-the-size-of-the-input}
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
         * @see {@link https://chakra-ui.com/docs/components/input/props}
         * @see {@link https://chakra-ui.com/docs/components/form-control/props}
         */
        isInvalid?: boolean;
        /**
         * If `true`, the form control will be `readonly`.
         *
         * @defaultValue `false`
         * @see {@link https://github.com/csandman/chakra-react-select#isinvalid--default-false--isreadonly---default-false}
         * @see {@link https://chakra-ui.com/docs/components/input/props}
         * @see {@link https://chakra-ui.com/docs/components/form-control/props}
         */
        isReadOnly?: boolean;
        /**
         * If true, the form control will be required. This has 2 side effects:
         *
         * - The `FormLabel` will show a required indicator
         * - The form element (e.g, Input) will have `aria-required` set to true
         *
         * @see {@link https://chakra-ui.com/docs/components/input/props}
         * @see {@link https://chakra-ui.com/docs/components/form-control/props}
         */
        isRequired?: boolean;
        /**
         * A color name that matches a key from your chakra theme and will
         * determine the color scheme of your `MultiValue` component.
         *
         * The styling matches the chakra `Tag` component.
         *
         * @defaultValue `"gray"`
         * @see {@link https://github.com/csandman/chakra-react-select#colorscheme}
         * @see {@link https://chakra-ui.com/docs/components/tag/props}
         */
        colorScheme?: string;
        /**
         * The `variant` prop that will be forwarded to your `MultiValue` component
         * which is represented by a chakra `Tag`. You can also use any custom
         * variants you have added to your theme.
         *
         * Options: "subtle" | "solid" | "outline"
         *
         * @defaultValue `subtle`
         * @see {@link https://github.com/csandman/chakra-react-select#tagvariant--options-subtle--solid--outline--default-subtle}
         * @see {@link https://chakra-ui.com/docs/data-display/tag#props}
         */
        tagVariant?: TagVariant;
        /**
         * Passing `true` for this prop will make the group headers
         * `position: sticky` and keep them stuck to the top while their
         * corresponding group is in view.
         *
         * @defaultValue `false`
         * @deprecated This prop should probably not have existed and will be
         * removed soon.
         */
        hasStickyGroupHeaders?: boolean;
        /**
         * Whether to style a selected option by highlighting it in a solid color
         * or adding a check mark next to it like the chakra `Menu` component.
         *
         * Options: `color` | `check`
         *
         * @defaultValue `color`
         * @see {@link https://github.com/csandman/chakra-react-select#selectedoptionstyle--options-color--check--default-color}
         * @see {@link https://chakra-ui.com/docs/components/menu#menu-option-groups}
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
        selectedOptionColorScheme?: string;
        /**
         * @deprecated Replaced by {@link selectedOptionColorScheme}
         */
        selectedOptionColor?: string;
        /**
         * The color value to style the border of the `Control` with when the
         * select is focused.
         *
         * @defaultValue Light mode: `blue.500` | Dark mode: `blue.300`
         * @see {@link https://github.com/csandman/chakra-react-select#focusbordercolor--default-blue500--errorbordercolor--default-red500}
         * @see {@link https://chakra-ui.com/docs/components/input#changing-the-focus-and-error-border-colors}
         */
        focusBorderColor?: string;
        /**
         * The color value to style the border of the `Control` with when
         * `isInvalid` is passed to the select.
         *
         * @defaultValue Light mode: `red.500` | Dark mode: `red.300`
         * @see {@link https://github.com/csandman/chakra-react-select#focusbordercolor--default-blue500--errorbordercolor--default-red500}
         * @see {@link https://chakra-ui.com/docs/components/input#changing-the-focus-and-error-border-colors}
         */
        errorBorderColor?: string;
        /**
         * Style transformation methods for each of the rendered components using,
         * Chakra's `SystemStyleObject` and the props passed into each component.
         *
         * @see {@link https://github.com/csandman/chakra-react-select#chakrastyles}
         * @see {@link https://react-select.com/styles#style-object}
         */
        chakraStyles?: ChakraStylesConfig<Option, IsMulti, Group>;
        /**
         * If passed, the dropdown indicator will be styled the same as Chakra UI's
         * `Select` component.
         *
         * @defaultValue `false`
         * @see {@link https://github.com/csandman/chakra-react-select#usebasicstyles--default-false}
         * @see {@link https://chakra-ui.com/docs/components/select}
         */
        useBasicStyles?: boolean;
        /**
         * The main style variant of the `Select` component. This will use styles
         * from Chakra's `Input` component and any custom variants you have added to
         * your theme may be used.
         *
         * Options: `outline` | `filled` | `flushed` | `unstyled`
         *
         * @defaultValue `outline`
         * @see {@link https://chakra-ui.com/docs/components/select#changing-the-appearance}
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
declare module "react-select/dist/declarations/src/components/MultiValue" {
    interface MultiValueProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
        sx: SystemStyleObject;
    }
    interface MultiValueGenericProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
        sx: SystemStyleObject;
    }
    interface MultiValueRemoveProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
        isFocused: boolean;
        sx: SystemStyleObject;
    }
}
declare module "react-select/dist/declarations/src/components/indicators" {
    interface LoadingIndicatorProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
        /**
         * The color of the filled in area of the spinner.
         *
         * Defaults to your Chakra theme's text color.
         *
         * @defaultValue Light mode: `gray.700` | Dark mode: `whiteAlpha.900`
         */
        color?: string;
        /**
         * The color of the empty area in the spinner.
         *
         * @defaultValue `transparent`
         * @see {@link https://chakra-ui.com/docs/components/spinner#spinner-with-empty-area-color}
         */
        emptyColor?: string;
        /**
         * The size prop for the Chakra `<Spinner />` component.
         *
         * Defaults to one size smaller than the overall Select's size.
         *
         * @see {@link https://chakra-ui.com/docs/components/spinner#spinner-with-different-size}
         */
        spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl";
        /**
         * The speed of the spinner represented by the time it takes to make one full rotation.
         *
         * This speed is represented by a
         * [CSS `<time>`](https://developer.mozilla.org/en-US/docs/Web/CSS/time)
         * variable which uses either seconds or milliseconds.
         *
         * @defaultValue `0.45s`
         * @example
         * ```jsx
         * <Spinner speed="0.2s"/>
         * ```
         * @see {@link https://chakra-ui.com/docs/components/spinner/props}
         */
        speed?: string;
        /**
         * The thickness of the spinner.
         *
         * @defaultValue `2px`
         * @example
         * ```jsx
         * <Spinner thickness="4px"/>
         * ```
         * @see {@link https://chakra-ui.com/docs/components/spinner/props}
         */
        thickness?: string;
    }
}
//# sourceMappingURL=module-augmentation.d.ts.map