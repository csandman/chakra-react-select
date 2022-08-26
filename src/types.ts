import type {
  CSSObject,
  CSSWithMultiValues,
  RecursiveCSSObject,
} from "@chakra-ui/system";
import type {
  ClearIndicatorProps,
  ContainerProps,
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
  Props,
  ControlProps as ReactSelectControlProps,
  ValueContainerProps as ReactSelectValueContainerProps,
  SingleValueProps,
} from "react-select";

export interface SxProps extends CSSWithMultiValues {
  _disabled?: CSSWithMultiValues;
  _focus?: CSSWithMultiValues;
}

export type ThemeObject = RecursiveCSSObject<SxProps>;

export interface SizeProps<PropType = string | number> {
  sm: PropType;
  md: PropType;
  lg: PropType;
}

export type Variant = "outline" | "unstyled" | "flushed" | "filled";

export type Size = "sm" | "md" | "lg";

export type TagVariant = "subtle" | "solid" | "outline";

export type SelectedOptionStyle = "color" | "check";

export type StylesFunction<ComponentProps> = (
  provided: CSSObject,
  state: ComponentProps
) => CSSObject;

export interface ChakraStylesConfig<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> {
  clearIndicator?: StylesFunction<ClearIndicatorProps<Option, IsMulti, Group>>;
  container?: StylesFunction<ContainerProps<Option, IsMulti, Group>>;
  control?: StylesFunction<ReactSelectControlProps<Option, IsMulti, Group>>;
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
  colorScheme?: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

export interface SelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
  variant?: Variant;
}

export interface ControlProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends ReactSelectControlProps<Option, IsMulti, Group> {
  selectProps: ReactSelectControlProps<Option, IsMulti, Group>["selectProps"] &
    SelectProps<Option, IsMulti, Group>;
}

export interface ValueContainerProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends ReactSelectValueContainerProps<Option, IsMulti, Group> {
  selectProps: ReactSelectValueContainerProps<
    Option,
    IsMulti,
    Group
  >["selectProps"] &
    SelectProps<Option, IsMulti, Group>;
}
