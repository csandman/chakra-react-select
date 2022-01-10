/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSSWithMultiValues, SystemStyleObject } from "@chakra-ui/react";
import {
  ClearIndicatorProps,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  GroupHeadingProps,
  GroupProps,
  IndicatorSeparatorProps,
  IndicatorsContainerProps,
  InputProps,
  LoadingIndicatorProps,
  MenuListProps,
  MenuProps,
  MultiValueProps,
  NoticeProps,
  OptionProps,
  PlaceholderProps,
  SingleValueProps,
  ValueContainerProps,
} from "react-select";

export interface SxProps extends CSSWithMultiValues {
  _disabled: CSSWithMultiValues;
  _focus: CSSWithMultiValues;
}

export type SizeProps = {
  sm: string | number;
  md: string | number;
  lg: string | number;
};

export type Size = "sm" | "md" | "lg";

export type TagVariant = "subtle" | "solid" | "outline" | undefined;

export type SelectedOptionStyle = "color" | "check";

export type StylesFunction<ComponentProps> = (
  provided: SystemStyleObject,
  state: ComponentProps
) => SystemStyleObject;

export type ChakraStylesConfig<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = {
  clearIndicator?: StylesFunction<ClearIndicatorProps<Option, IsMulti, Group>>;
  container?: StylesFunction<ContainerProps<Option, IsMulti, Group>>;
  control?: StylesFunction<ControlProps<Option, IsMulti, Group>>;
  dropdownIndicator?: StylesFunction<
    DropdownIndicatorProps<Option, IsMulti, Group>
  >;
  group?: StylesFunction<GroupProps<Option, IsMulti, Group>>;
  groupHeading?: StylesFunction<GroupHeadingProps<Option, IsMulti, Group>>;
  indicatorsContainer?: StylesFunction<
    IndicatorsContainerProps<Option, IsMulti, Group>
  >;
  indicatorSeparator?: StylesFunction<
    IndicatorSeparatorProps<Option, IsMulti, Group>
  >;
  input?: StylesFunction<InputProps<Option, IsMulti, Group>>;
  inputContainer?: StylesFunction<InputProps<Option, IsMulti, Group>>;
  loadingIndicator?: StylesFunction<
    LoadingIndicatorProps<Option, IsMulti, Group>
  >;
  loadingMessage?: StylesFunction<NoticeProps<Option, IsMulti, Group>>;
  menu?: StylesFunction<MenuProps<Option, IsMulti, Group>>;
  menuList?: StylesFunction<MenuListProps<Option, IsMulti, Group>>;
  multiValue?: StylesFunction<MultiValueProps<Option, IsMulti, Group>>;
  multiValueLabel?: StylesFunction<MultiValueProps<Option, IsMulti, Group>>;
  multiValueRemove?: StylesFunction<MultiValueProps<Option, IsMulti, Group>>;
  noOptionsMessage?: StylesFunction<NoticeProps<Option, IsMulti, Group>>;
  option?: StylesFunction<OptionProps<Option, IsMulti, Group>>;
  placeholder?: StylesFunction<PlaceholderProps<Option, IsMulti, Group>>;
  singleValue?: StylesFunction<SingleValueProps<Option, IsMulti, Group>>;
  valueContainer?: StylesFunction<ValueContainerProps<Option, IsMulti, Group>>;
};

export type OptionBase = {
  value: unknown;
  label: string;
  variant?: string;
  colorScheme?: string;
  isFixed?: boolean;
  isDisabled?: boolean;
};

declare module "react-select/dist/declarations/src/Select" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    size?: Size;
    colorScheme?: string;
    isInvalid?: boolean;
    tagVariant?: TagVariant;
    hasStickyGroupHeaders?: boolean;
    selectedOptionStyle?: SelectedOptionStyle;
    selectedOptionColor?: string;
    focusBorderColor?: string;
    errorBorderColor?: string;
    placeholderColor?: string;
    chakraStyles?: ChakraStylesConfig<Option, IsMulti, Group>;
  }
}

declare module "react-select/dist/declarations/src/components/MultiValue" {
  export interface MultiValueProps<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    sx: SystemStyleObject;
  }

  export interface MultiValueGenericProps<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    sx: SystemStyleObject;
  }

  export interface MultiValueRemoveProps<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    isFocused: boolean;
    sx: SystemStyleObject;
  }
}
