import type { ReactElement, RefAttributes } from "react";
import type { GroupBase, SelectInstance } from "react-select";
import type { AsyncCreatableProps } from "react-select/async-creatable";
export type AsyncCreatableSelectComponent = <Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: AsyncCreatableProps<Option, IsMulti, Group> & RefAttributes<SelectInstance<Option, IsMulti, Group>>) => ReactElement;
declare const AsyncCreatableSelect: AsyncCreatableSelectComponent;
export default AsyncCreatableSelect;
//# sourceMappingURL=async-creatable-select.d.ts.map