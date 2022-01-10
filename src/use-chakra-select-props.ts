import { useColorModeValue, useFormControl } from "@chakra-ui/react";
import { GroupBase, Props } from "react-select";
import chakraComponents from "./chakra-components";
import { SelectedOptionStyle, Size, TagVariant } from "./types";

const useChakraSelectProps = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  styles,
  components = {},
  theme,
  size = "md",
  colorScheme = "gray",
  isDisabled,
  isInvalid,
  inputId,
  tagVariant,
  hasStickyGroupHeaders = false,
  selectedOptionStyle = "color",
  selectedOptionColor = "blue",
  focusBorderColor,
  errorBorderColor,
  chakraStyles = {},
  ...props
}: Props<Option, IsMulti, Group>): Props<Option, IsMulti, Group> => {
  // Combine the props passed into the component with the props that can be set
  // on a surrounding form control to get the values of `isDisabled` and
  // `isInvalid`
  const inputProps = useFormControl({ isDisabled, isInvalid });

  // The chakra UI global placeholder color
  // https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/styles.ts#L13
  const placeholderColor = useColorModeValue("gray.400", "whiteAlpha.400");

  // Ensure that the size used is one of the options, either `sm`, `md`, or `lg`
  let realSize: Size = size;
  const sizeOptions: Size[] = ["sm", "md", "lg"];
  if (!sizeOptions.includes(size)) {
    realSize = "md";
  }

  // Ensure that the tag variant used is one of the options, either `subtle`,
  // `solid`, or `outline` (or undefined)
  let realTagVariant: TagVariant = tagVariant;
  const tagVariantOptions: TagVariant[] = ["subtle", "solid", "outline"];
  if (tagVariant !== undefined) {
    if (!tagVariantOptions.includes(tagVariant)) {
      realTagVariant = "subtle";
    }
  }

  // Ensure that the tag variant used is one of the options, either `subtle`,
  // `solid`, or `outline` (or undefined)
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

  const select: Props<Option, IsMulti, Group> = {
    components: {
      ...chakraComponents,
      ...components,
    },
    colorScheme,
    size: realSize,
    tagVariant: realTagVariant,
    selectedOptionStyle: realSelectedOptionStyle,
    selectedOptionColor: realSelectedOptionColor,
    // isDisabled and isInvalid can be set on the component
    // or on a surrounding form control
    isDisabled: inputProps.disabled,
    isInvalid: !!inputProps["aria-invalid"],
    inputId: inputId || inputProps.id,
    hasStickyGroupHeaders,
    placeholderColor,
    chakraStyles,
    focusBorderColor,
    errorBorderColor,
    ...props,
    // aria-invalid can be passed to react-select, so we allow that to
    // override the `isInvalid` prop
    "aria-invalid":
      props["aria-invalid"] ?? inputProps["aria-invalid"] ? true : undefined,
  };

  return select;
};

export default useChakraSelectProps;