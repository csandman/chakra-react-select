import { Props } from "react-select";
import { CSSWithMultiValues, SystemStyleObject } from "@chakra-ui/react";

export type { RecursiveCSSObject } from "@chakra-ui/react";

export type Size = "sm" | "md" | "lg";

export type TagVariant = "subtle" | "solid" | "outline" | undefined;

export type SelectedOptionStyle = "color" | "check";

type StylesFunction = (
  provided: SystemStyleObject,
  state: Record<string, unknown>
) => SystemStyleObject;

export type ChakraStyles = {
  clearIndicator?: StylesFunction;
  container?: StylesFunction;
  control?: StylesFunction;
  dropdownIndicator?: StylesFunction;
  group?: StylesFunction;
  groupHeading?: StylesFunction;
  indicatorsContainer?: StylesFunction;
  indicatorSeparator?: StylesFunction;
  input?: StylesFunction;
  loadingIndicator?: StylesFunction;
  loadingMessage?: StylesFunction;
  menu?: StylesFunction;
  menuList?: StylesFunction;
  menuPortal?: StylesFunction;
  multiValue?: StylesFunction;
  multiValueLabel?: StylesFunction;
  multiValueRemove?: StylesFunction;
  noOptionsMessage?: StylesFunction;
  option?: StylesFunction;
  placeholder?: StylesFunction;
  singleValue?: StylesFunction;
  valueContainer?: StylesFunction;
};

export interface ChakraSelectProps extends Props {
  size?: Size;
  colorScheme?: string;
  isInvalid?: boolean;
  tagVariant?: TagVariant;
  hasStickyGroupHeaders?: boolean;
  selectedOptionStyle?: SelectedOptionStyle;
  selectedOptionColor?: string;
  focusBorderColor?: string;
  errorBorderColor?: string;
  chakraStyles?: ChakraStyles;
}

export interface SxProps extends CSSWithMultiValues {
  _disabled: CSSWithMultiValues;
  _focus: CSSWithMultiValues;
}

export type SizeProps = {
  sm: string | number;
  md: string | number;
  lg: string | number;
};
