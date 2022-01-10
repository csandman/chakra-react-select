import React, {
  MutableRefObject,
  ReactElement,
  RefAttributes,
  forwardRef,
} from "react";
import { GroupBase, SelectInstance } from "react-select";
import CreatableReactSelect, { CreatableProps } from "react-select/creatable";
import useChakraSelectProps from "./use-chakra-select-props";

type CreatableSelectType = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: CreatableProps<Option, IsMulti, Group> &
    RefAttributes<SelectInstance<Option, IsMulti, Group>>
) => ReactElement;

const CreatableSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: CreatableProps<Option, IsMulti, Group>,
    ref:
      | ((instance: SelectInstance<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<SelectInstance<Option, IsMulti, Group> | null>
      | null
  ) => {
    const chakraSelectProps = useChakraSelectProps(props);

    return <CreatableReactSelect ref={ref} {...chakraSelectProps} />;
  }
) as CreatableSelectType;

export default CreatableSelect;
