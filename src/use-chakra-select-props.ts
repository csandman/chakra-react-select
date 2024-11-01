import type { ColorPalette } from "@chakra-ui/react";
import { useFieldContext } from "@chakra-ui/react";
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
  disabled,
  isDisabled,
  invalid,
  readOnly,
  required,
  inputId,
  selectedOptionStyle = "color",
  selectedOptionColorPalette = "blue",
  menuIsOpen,
  menuPlacement = "auto",
  ...props
}: Props<Option, IsMulti, Group>): Props<Option, IsMulti, Group> => {
  // Combine the props passed into the component with the props that can be set
  // on a surrounding form control to get the values of `disabled`, `readOnly`,
  // `isInvalid`, `required`, and `inputId`
  const inputProps = useFieldContext();

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
  let realSelectedOptionColorPalette: ColorPalette =
    selectedOptionColorPalette || "blue";
  if (typeof realSelectedOptionColorPalette !== "string") {
    realSelectedOptionColorPalette = "blue";
  }

  const selectProps: Props<Option, IsMulti, Group> = {
    // Allow overriding of custom components
    components: {
      ...chakraComponents,
      ...components,
    },
    // Custom select props
    selectedOptionStyle: realSelectedOptionStyle,
    selectedOptionColorPalette: realSelectedOptionColorPalette,
    // Extract custom props from form control
    isDisabled: disabled ?? isDisabled ?? inputProps.disabled,
    invalid: invalid ?? inputProps.invalid,
    inputId: inputId ?? inputProps.ids.control,
    readOnly: readOnly ?? inputProps.readOnly,
    required: required ?? required ?? inputProps.required,
    menuIsOpen: realMenuIsOpen,
    menuPlacement,
    unstyled: true,
    ...props,
    // aria-invalid can be passed to react-select, so we allow that to
    // override the `isInvalid` prop
    "aria-invalid": props["aria-invalid"] ?? inputProps.invalid,
  };

  return selectProps;
};

export default useChakraSelectProps;
