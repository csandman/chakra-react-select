import "./module-augmentation";

export { default as Select } from "./select/select";
export { default as CreatableSelect } from "./select/creatable-select";
export { default as AsyncSelect } from "./select/async-select";
export { default as AsyncCreatableSelect } from "./select/async-creatable-select";

export { default as chakraComponents } from "./chakra-components";
export { default as useChakraSelectProps } from "./use-chakra-select-props";
export { default as chakraReactSelectAnatomy } from "./anatomy";

export type { SelectComponent } from "./select/select";
export type { CreatableSelectComponent } from "./select/creatable-select";
export type { AsyncSelectComponent } from "./select/async-select";
export type { AsyncCreatableSelectComponent } from "./select/async-creatable-select";

export type {
  SizeProps,
  Size,
  TagVariant,
  SelectedOptionStyle,
  ColorScheme,
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
