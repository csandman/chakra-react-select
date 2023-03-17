/// <reference types="react" />
import type { GroupBase, MultiValueGenericProps, MultiValueProps, MultiValueRemoveProps } from "react-select";
declare const MultiValue: <Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>>(props: MultiValueProps<Option, IsMulti, Group>) => JSX.Element;
declare const MultiValueContainer: <Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>>(props: MultiValueGenericProps<Option, IsMulti, Group>) => JSX.Element;
declare const MultiValueLabel: <Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>>(props: MultiValueGenericProps<Option, IsMulti, Group>) => JSX.Element;
declare const MultiValueRemove: <Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>>(props: MultiValueRemoveProps<Option, IsMulti, Group>) => JSX.Element | null;
export { MultiValueContainer, MultiValueLabel, MultiValueRemove };
export default MultiValue;
//# sourceMappingURL=multi-value.d.ts.map