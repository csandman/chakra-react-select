import type { ReactElement, RefAttributes } from "react";
import type { GroupBase, SelectInstance } from "react-select";
import type { CreatableProps } from "react-select/creatable";
export type CreatableSelectComponent = <Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: CreatableProps<Option, IsMulti, Group> & RefAttributes<SelectInstance<Option, IsMulti, Group>>) => ReactElement;
declare const CreatableSelect: CreatableSelectComponent;
export default CreatableSelect;
//# sourceMappingURL=creatable-select.d.ts.map