import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";

export const Example = () => (
  <>
    <Select tagColorScheme="blue" />
    <AsyncSelect selectedOptionColorScheme="green" />
    <CreatableSelect selectedOptionColorScheme="red" />
    <AsyncCreatableSelect tagColorScheme="purple" />
  </>
);
