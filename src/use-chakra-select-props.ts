import { useFormControl } from "@chakra-ui/form-control";
import { useTheme } from "@chakra-ui/system";
import type { GroupBase, Props } from "react-select";
import chakraComponents from "./chakra-components";
import type { SelectedOptionStyle } from "./types";

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
  const { variant: defaultVariant } = chakraTheme.components.Input.defaultProps;

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

  const select: Props<Option, IsMulti, Group> = {
    // Allow overriding of custom components
    components: {
      ...chakraComponents,
      ...components,
    },
    // Custom select props
    colorScheme,
    size,
    tagVariant,
    selectedOptionStyle: realSelectedOptionStyle,
    selectedOptionColor: realSelectedOptionColor,
    variant: variant ?? defaultVariant,
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
      props["aria-invalid"] ?? (inputProps["aria-invalid"] ? true : undefined),
  };

  return select;
};

export default useChakraSelectProps;
