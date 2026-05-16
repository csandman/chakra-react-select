import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";

export const Example = () => (
  <>
    <Select useBasicStyles colorScheme="blue" />
    <AsyncSelect hasStickyGroupHeaders selectedOptionColor="green" />
    <CreatableSelect useBasicStyles selectedOptionColor="red" />
    <AsyncCreatableSelect colorScheme="purple" hasStickyGroupHeaders />
  </>
);
