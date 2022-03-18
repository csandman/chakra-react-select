import "./module-augmentation";

export { default as Select } from "./select";
export { default as CreatableSelect } from "./creatable-select";
export { default as AsyncSelect } from "./async-select";
export { default as AsyncCreatableSelect } from "./async-creatable-select";

export { default as chakraComponents } from "./chakra-components";

export type { SelectComponent } from "./select";
export type { CreatableSelectComponent } from "./creatable-select";
export type { AsyncSelectComponent } from "./async-select";
export type { AsyncCreatableSelectComponent } from "./async-creatable-select";

export type {
  SxProps,
  SizeProps,
  Size,
  TagVariant,
  SelectedOptionStyle,
  StylesFunction,
  ChakraStylesConfig,
  OptionBase,
} from "./types";

// Forward all available exports from the original `react-select` package
export * from "react-select";
export * from "react-select/async";
export * from "react-select/async-creatable";
export * from "react-select/creatable";
