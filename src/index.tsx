/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SystemStyleObject } from "@chakra-ui/react";
import type { GroupBase } from "react-select";

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

export { default as Select } from "./select";
export { default as CreatableSelect } from "./creatable-select";
export { default as AsyncSelect } from "./async-select";
export { default as AsyncCreatableSelect } from "./async-creatable-select";
export { default as chakraComponents } from "./chakra-components";
export * from "./types";

export * from "react-select";
export * from "react-select/async";
export * from "react-select/async-creatable";
export * from "react-select/creatable";
