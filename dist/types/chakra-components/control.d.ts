/// <reference types="react" />
import type { IconProps } from "@chakra-ui/icon";
import type { ClearIndicatorProps, ControlProps, DropdownIndicatorProps, GroupBase, IndicatorSeparatorProps, LoadingIndicatorProps } from "react-select";
declare const Control: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: ControlProps<Option, IsMulti, Group>) => JSX.Element;
export declare const IndicatorSeparator: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: IndicatorSeparatorProps<Option, IsMulti, Group>) => JSX.Element;
/**
 * Borrowed from the `@chakra-ui/icons` package to prevent needing it as a dependency
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/main/packages/icons/src/ChevronDown.tsx}
 */
export declare const DownChevron: (props: IconProps) => JSX.Element;
export declare const DropdownIndicator: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: DropdownIndicatorProps<Option, IsMulti, Group>) => JSX.Element;
/**
 * Borrowed from Chakra UI source
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/close-button/src/close-button.tsx#L14}
 */
export declare const CrossIcon: (props: IconProps) => JSX.Element;
export declare const ClearIndicator: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: ClearIndicatorProps<Option, IsMulti, Group>) => JSX.Element;
export declare const LoadingIndicator: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: LoadingIndicatorProps<Option, IsMulti, Group>) => JSX.Element;
export default Control;
//# sourceMappingURL=control.d.ts.map