import { Select } from "chakra-react-select";

export const Example = () => (
  <Select
    isMulti
    placeholder="Select an option"
    useBasicStyles
    options={[{ label: "A", value: "a" }]}
    selectedOptionColor="blue"
    onChange={(value) => console.log(value)}
  />
);
