import type {
  SystemStyleObject,
  TagRootProps,
  useFieldContext,
} from "@chakra-ui/react";
import type {
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

export interface SizeProps<PropType extends string | number = string | number> {
  sm: PropType;
  md: PropType;
  lg: PropType;
}

export type Size = "sm" | "md" | "lg";

export type SizeProp = Size | Record<string, Size> | Array<Size>;

/**
 * By default includes `"outline" | "subtle" | "solid" | "surface"`
 */
export type TagVariant = TagRootProps["variant"];

export type SelectedOptionStyle = "color" | "check";

export type Variant = "outline" | "subtle";

export type StylesFunction<ComponentProps> = (
  provided: SystemStyleObject,
  state: ComponentProps
) => SystemStyleObject;

export interface ChakraStylesConfig<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
> {
  clearIndicator?: StylesFunction<ClearIndicatorProps<Option, IsMulti, Group>>;
  container?: StylesFunction<ContainerProps<Option, IsMulti, Group>>;
  control?: StylesFunction<ControlProps<Option, IsMulti, Group>>;
  dropdownIndicator?: StylesFunction<
    DropdownIndicatorProps<Option, IsMulti, Group>
  >;
  downChevron?: StylesFunction<DropdownIndicatorProps<Option, IsMulti, Group>>;
  crossIcon?: StylesFunction<ClearIndicatorProps<Option, IsMulti, Group>>;
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
}

export interface OptionBase {
  variant?: string;
  colorPalette?: string;
  isDisabled?: boolean;
}

/**
 * If the `useFieldContext` hook is called outside of a `Field.Root` wrapper,
 * the value will be `undefined`. This type is used to ensure that we don't
 * attempt to access properties on `undefined`.
 */
export type UseFieldReturn = ReturnType<typeof useFieldContext> | undefined;
