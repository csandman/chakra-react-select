import { useFormControl } from "@chakra-ui/form-control";
import type { GroupBase, Props } from "react-select";
import chakraComponents from "./chakra-components";
import type { SelectedOptionStyle, Size, TagVariant, Variant } from "./types";

const useChakraSelectProps = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  components = {},
  theme,
  size = "md",
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
  variant = "outline",
  focusBorderColor,
  errorBorderColor,
  chakraStyles = {},
  onFocus,
  onBlur,
  ...props
}: Props<Option, IsMulti, Group>): Props<Option, IsMulti, Group> => {
  /**
   * Combine the props passed into the component with the props that can be set
   * on a surrounding form control to get the values of `isDisabled` and
   * `isInvalid`
   */
  const inputProps = useFormControl({
    id: inputId,
    isDisabled,
    isInvalid,
    isRequired,
    isReadOnly,
    onFocus,
    onBlur,
  });

  /** Ensure that the size used is one of the options, either `sm`, `md`, or `lg` */
  let realSize: Size = size;
  const sizeOptions: Size[] = ["sm", "md", "lg"];
  if (!sizeOptions.includes(size)) {
    realSize = "md";
  }

  /**
   * Ensure that the tag variant used is one of the options, either `subtle`,
   * `solid`, or `outline` (or undefined)
   */
  let realTagVariant: TagVariant | undefined = tagVariant;
  const tagVariantOptions: TagVariant[] = ["subtle", "solid", "outline"];
  if (tagVariant !== undefined) {
    if (!tagVariantOptions.includes(tagVariant)) {
      realTagVariant = "subtle";
    }
  }

  /** Ensure that the selected option style is either `color` or `check` */
  let realSelectedOptionStyle: SelectedOptionStyle = selectedOptionStyle;
  const selectedOptionStyleOptions: SelectedOptionStyle[] = ["color", "check"];
  if (!selectedOptionStyleOptions.includes(selectedOptionStyle)) {
    realSelectedOptionStyle = "color";
  }

  /** Ensure that the color used for the selected options is a string */
  let realSelectedOptionColor: string = selectedOptionColor;
  if (typeof selectedOptionColor !== "string") {
    realSelectedOptionColor = "blue";
  }

  let realVariant: Variant = variant;
  const variantOptions: Variant[] = [
    "outline",
    "filled",
    "flushed",
    "unstyled",
  ];
  if (!variantOptions.includes(variant)) {
    realVariant = "outline";
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
    ...props,
    // aria-invalid can be passed to react-select, so we allow that to
    // override the `isInvalid` prop
    "aria-invalid":
      props["aria-invalid"] ?? inputProps["aria-invalid"] ? true : undefined,
  };

  return select;
};

export default useChakraSelectProps;
