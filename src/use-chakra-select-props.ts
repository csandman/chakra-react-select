import { useFormControl, useTheme } from "@chakra-ui/react";
import type { GroupBase, Props } from "react-select";
import chakraComponents from "./chakra-components";
import type { SelectedOptionStyle } from "./types";

const useChakraSelectProps = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  components = {},
  // eslint-disable-next-line deprecation/deprecation
  theme,
  size,
  isDisabled,
  isInvalid,
  isReadOnly,
  required,
  isRequired,
  inputId,
  selectedOptionStyle = "color",
  selectedOptionColorScheme = "blue",
  variant,
  tagColorScheme,
  tagVariant,
  focusBorderColor,
  errorBorderColor,
  chakraStyles = {},
  onFocus,
  onBlur,
  menuIsOpen,
  ...props
}: Props<Option, IsMulti, Group>): Props<Option, IsMulti, Group> => {
  const chakraTheme = useTheme();
  const { variant: defaultVariant = "outline" } =
    chakraTheme?.components?.Input?.defaultProps ?? {};
  const {
    colorScheme: defaultTagColorScheme = "gray",
    variant: defaultTagVariant = "subtle",
  } = chakraTheme?.components?.Tag?.defaultProps ?? {};

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
  let realSelectedOptionColorScheme: string = selectedOptionColorScheme;
  if (typeof realSelectedOptionColorScheme !== "string") {
    realSelectedOptionColorScheme = "blue";
  }

  const selectProps: Props<Option, IsMulti, Group> = {
    // Allow overriding of custom components
    components: {
      ...chakraComponents,
      ...components,
    },
    // Custom select props
    size,
    selectedOptionStyle: realSelectedOptionStyle,
    selectedOptionColorScheme: realSelectedOptionColorScheme,
    variant: variant ?? defaultVariant,
    tagColorScheme: tagColorScheme ?? defaultTagColorScheme,
    tagVariant: tagVariant ?? defaultTagVariant,
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
    required: required ?? inputProps.required,
    menuIsOpen: realMenuIsOpen,
    ...props,
    // aria-invalid can be passed to react-select, so we allow that to
    // override the `isInvalid` prop
    "aria-invalid": props["aria-invalid"] ?? inputProps["aria-invalid"],
  };

  return selectProps;
};

export default useChakraSelectProps;
