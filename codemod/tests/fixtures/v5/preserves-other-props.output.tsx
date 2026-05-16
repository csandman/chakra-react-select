import { Select } from "chakra-react-select";

export const Example = () => (
  <Select
    isMulti
    placeholder="Select an option"
    options={[{ label: "A", value: "a" }]}
    selectedOptionColorScheme="blue"
    onChange={(value) => console.log(value)} />
);
