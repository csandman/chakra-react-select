/// <reference types="react" />
import type { GroupBase, GroupHeadingProps, GroupProps, MenuListProps, MenuProps, NoticeProps, OptionProps } from "react-select";
declare const Menu: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: MenuProps<Option, IsMulti, Group>) => JSX.Element;
export default Menu;
export declare const MenuList: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: MenuListProps<Option, IsMulti, Group>) => JSX.Element;
export declare const LoadingMessage: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: NoticeProps<Option, IsMulti, Group>) => JSX.Element;
export declare const NoOptionsMessage: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: NoticeProps<Option, IsMulti, Group>) => JSX.Element;
export declare const Group: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: GroupProps<Option, IsMulti, Group>) => JSX.Element;
export declare const GroupHeading: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: GroupHeadingProps<Option, IsMulti, Group>) => JSX.Element;
export declare const Option: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: OptionProps<Option, IsMulti, Group>) => JSX.Element;
//# sourceMappingURL=menu.d.ts.map