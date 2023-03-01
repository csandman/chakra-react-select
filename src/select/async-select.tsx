import React, { forwardRef } from "react";
import type { MutableRefObject, ReactElement, RefAttributes } from "react";
import type { GroupBase, SelectInstance } from "react-select";
import AsyncReactSelect from "react-select/async";
import type { AsyncProps } from "react-select/async";
import useChakraSelectProps from "../use-chakra-select-props";

export type AsyncSelectComponent = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: AsyncProps<Option, IsMulti, Group> &
    RefAttributes<SelectInstance<Option, IsMulti, Group>>
) => ReactElement;

const AsyncSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: AsyncProps<Option, IsMulti, Group>,
    ref:
      | ((instance: SelectInstance<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<SelectInstance<Option, IsMulti, Group> | null>
      | null
  ) => {
    const chakraSelectProps = useChakraSelectProps(props);

    return <AsyncReactSelect ref={ref} {...chakraSelectProps} />;
  }
) as AsyncSelectComponent;

export default AsyncSelect;
