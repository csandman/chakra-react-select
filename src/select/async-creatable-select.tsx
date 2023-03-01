import React, { forwardRef } from "react";
import type { MutableRefObject, ReactElement, RefAttributes } from "react";
import type { GroupBase, SelectInstance } from "react-select";
import AsyncCreatableReactSelect from "react-select/async-creatable";
import type { AsyncCreatableProps } from "react-select/async-creatable";
import useChakraSelectProps from "../use-chakra-select-props";

export type AsyncCreatableSelectComponent = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: AsyncCreatableProps<Option, IsMulti, Group> &
    RefAttributes<SelectInstance<Option, IsMulti, Group>>
) => ReactElement;

const AsyncCreatableSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: AsyncCreatableProps<Option, IsMulti, Group>,
    ref:
      | ((instance: SelectInstance<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<SelectInstance<Option, IsMulti, Group> | null>
      | null
  ) => {
    const chakraSelectProps = useChakraSelectProps(props);

    return <AsyncCreatableReactSelect ref={ref} {...chakraSelectProps} />;
  }
) as AsyncCreatableSelectComponent;

export default AsyncCreatableSelect;
