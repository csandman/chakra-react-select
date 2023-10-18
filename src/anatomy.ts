import { anatomy } from "@chakra-ui/anatomy";

/**
 * **ChakraReactSelect anatomy**
 * - ClearIndicator: the button for clearing the selected options
 * - Container: the wrapper for the entire component
 * - Control: the wrapper that contains the input and value container and is styled like a Chakra input
 * - DropdownIndicator: the wrapper for the dropdown indicator (down chevron)
 * - DownChevron: the down chevron icon for indicating that the component is a dropdown
 * - CrossIcon: the icon for the clear indicator
 * - Group: the wrapper for a group of options
 * - GroupHeading: the heading for a group of options
 * - IndicatorsContainer: the wrapper for the dropdown and clear indicators
 * - IndicatorSeparator: the separator between the dropdown and clear indicators (hidden with display="none" by default)
 * - Input: the input element for searching the options
 * - InputContainer: the wrapper for the input element
 * - LoadingIndicator: the loading indicator for when the options are loading (a Chakra spinner)
 * - LoadingMessage: the message for when the options are loading in an async select
 * - Menu: the floaing wrapper for the menu list
 * - MenuList: the wrapper for the menu options
 * - MultiValue: the wrapper for a selected option when multiple options can be selected
 * - MultiValueLabel: the label for a selected option when multiple options can be selected
 * - MultiValueRemove: the remove button for a selected option when multiple options can be selected
 * - NoOptionsMessage: the message for when there are no options to display matching the search term
 * - Option: the wrapper for an option
 * - Placeholder: the pseudo-placeholder text for the input
 * - SingleValue: the selected option text element when only one option can be selected
 * - ValueContainer: the wrapper for the selected options
 */
const chakraReactSelectAnatomy = anatomy("chakraReactSelect").parts(
  "clearIndicator",
  "container",
  "control",
  "dropdownIndicator",
  "downChevron",
  "crossIcon",
  "group",
  "groupHeading",
  "indicatorsContainer",
  "indicatorSeparator",
  "input",
  "inputContainer",
  "loadingIndicator",
  "loadingMessage",
  "menu",
  "menuList",
  "multiValue",
  "multiValueLabel",
  "multiValueRemove",
  "noOptionsMessage",
  "option",
  "placeholder",
  "singleValue",
  "valueContainer"
);

export default chakraReactSelectAnatomy;
