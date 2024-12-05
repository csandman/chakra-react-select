import {
  GroupBase,
  Select,
  SelectComponentsConfig,
  chakraComponents,
} from "chakra-react-select";
import { LuArrowDown, LuCircleX } from "react-icons/lu";
import { groupedOptions } from "../../data/options";

interface Option {
  label: string;
  value: string;
}

const components: SelectComponentsConfig<Option, true, GroupBase<Option>> = {
  ClearIndicator: (props) => (
    <chakraComponents.ClearIndicator {...props}>
      <LuCircleX />
    </chakraComponents.ClearIndicator>
  ),
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      <LuArrowDown />
    </chakraComponents.DropdownIndicator>
  ),
};

const CustomIndicatorIconsExample = () => (
  <Select
    isMulti
    name="colors"
    options={groupedOptions}
    placeholder="Select some colors..."
    closeMenuOnSelect={false}
    components={components}
  />
);

export default CustomIndicatorIconsExample;
