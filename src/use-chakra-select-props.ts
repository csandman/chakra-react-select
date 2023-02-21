import { useFormControl } from "@chakra-ui/form-control";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useTheme } from "@chakra-ui/system";
import type { GroupBase, Props } from "react-select";
import chakraComponents from "./chakra-components";
import type {
  SelectedOptionStyle,
  Size,
  SizeProp,
  TagVariant,
  Variant,
} from "./types";

/** A typeguard to ensure the default size on the Input component is valid. */
const isSize = (size: unknown): size is Size => {
  const isString = typeof size === "string";
  return isString && ["sm", "md", "lg"].includes(size);
};

const getDefaultSize = (size: unknown): Size => {
  if (isSize(size)) {
    return size;
  }

  if (size === "xs") {
    return "sm";
  }

  // This shouldn't be necessary but it might help the size get closer to the
  // user's goal if they have `xl` as a custom size.
  if (size === "xl") {
    return "lg";
  }

  return "md";
};

const useChakraSelectProps = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  components = {},
  theme,
  size,
  colorScheme = "gray",
  isDisabled,
  isInvalid,
  isReadOnly,
  isRequired,
  inputId,
  tagVariant,
  hasStickyGroupHeaders = false,
  selectedOptionStyle = "color",
  selectedOptionColor = "blue",
  variant,
  focusBorderColor,
  errorBorderColor,
  chakraStyles = {},
  onFocus,
  onBlur,
  menuIsOpen,
  ...props
}: Props<Option, IsMulti, Group>): Props<Option, IsMulti, Group> => {
  const chakraTheme = useTheme();
  const { variant: defaultVariant, size: defaultSize } =
    chakraTheme.components.Input.defaultProps;
  const realDefaultSize = getDefaultSize(defaultSize);

  // Combine the props passed into the component with the props that can be set
  // on a surrounding form control to get the values of `isDisabled` and
  // `isInvalid`
  const inputProps = useFormControl({
    id: inputId,
    isDisabled,
    isInvalid,
    isRequired,
    isReadOnly,
    onFocus,
    onBlur,
  });

  // Unless `menuIsOpen` is controlled, disable it if the select is readonly
  const realMenuIsOpen =
    menuIsOpen ?? (inputProps.readOnly ? false : undefined);

  // Ensure that the size used is one of the options, either `sm`, `md`, or `lg`
  const definedSize: SizeProp = size ?? realDefaultSize;
  // Or, if a breakpoint is passed, get the size based on the current screen size
  const realSize: Size =
    useBreakpointValue<Size>(
      typeof definedSize === "string" ? [definedSize] : definedSize,
      {
        fallback: "md",
      }
    ) || defaultSize;

  // Ensure that the tag variant used is one of the options, either `subtle`,
  // `solid`, or `outline` (or undefined)
  let realTagVariant: TagVariant | undefined = tagVariant;
  const tagVariantOptions: TagVariant[] = ["subtle", "solid", "outline"];
  if (tagVariant !== undefined) {
    if (!tagVariantOptions.includes(tagVariant)) {
      realTagVariant = "subtle";
    }
  }

  // Ensure that the selected option style is either `color` or `check`
  let realSelectedOptionStyle: SelectedOptionStyle = selectedOptionStyle;
  const selectedOptionStyleOptions: SelectedOptionStyle[] = ["color", "check"];
  if (!selectedOptionStyleOptions.includes(selectedOptionStyle)) {
    realSelectedOptionStyle = "color";
  }

  // Ensure that the color used for the selected options is a string
  let realSelectedOptionColor: string = selectedOptionColor;
  if (typeof selectedOptionColor !== "string") {
    realSelectedOptionColor = "blue";
  }

  let realVariant: Variant = variant ?? defaultVariant;
  const variantOptions: Variant[] = [
    "outline",
    "filled",
    "flushed",
    "unstyled",
  ];
  if (!variantOptions.includes(realVariant)) {
    realVariant = defaultVariant;
  }

  const select: Props<Option, IsMulti, Group> = {
    // Allow overriding of custom components
    components: {
      ...chakraComponents,
      ...components,
    },
    // Custom select props
    colorScheme,
    size: realSize,
    tagVariant: realTagVariant,
    selectedOptionStyle: realSelectedOptionStyle,
    selectedOptionColor: realSelectedOptionColor,
    variant: realVariant,
    hasStickyGroupHeaders,
    chakraStyles,
    focusBorderColor,
    errorBorderColor,
    // Extract custom props from form control
    onFocus: inputProps.onFocus,
    onBlur: inputProps.onBlur,
    isDisabled: inputProps.disabled,
    isInvalid: !!inputProps["aria-invalid"],
    inputId: inputProps.id,
    isReadOnly: inputProps.readOnly,
    menuIsOpen: realMenuIsOpen,
    ...props,
    // aria-invalid can be passed to react-select, so we allow that to
    // override the `isInvalid` prop
    "aria-invalid":
      props["aria-invalid"] ?? inputProps["aria-invalid"] ? true : undefined,
  };

  return select;
};

export default useChakraSelectProps;
