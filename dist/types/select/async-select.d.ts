import type { ReactElement, RefAttributes } from "react";
import type { GroupBase, SelectInstance } from "react-select";
import type { AsyncProps } from "react-select/async";
export type AsyncSelectComponent = <Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: AsyncProps<Option, IsMulti, Group> & RefAttributes<SelectInstance<Option, IsMulti, Group>>) => ReactElement;
declare const AsyncSelect: AsyncSelectComponent;
export default AsyncSelect;
//# sourceMappingURL=async-select.d.ts.map