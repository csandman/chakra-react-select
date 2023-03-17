import type { ReactElement, RefAttributes } from "react";
import type { GroupBase, Props, SelectInstance } from "react-select";
export type SelectComponent = <Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: Props<Option, IsMulti, Group> & RefAttributes<SelectInstance<Option, IsMulti, Group>>) => ReactElement;
declare const Select: SelectComponent;
export default Select;
//# sourceMappingURL=select.d.ts.map