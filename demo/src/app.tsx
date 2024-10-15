import {
  Code,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { AsyncSelect, CreatableSelect, Select } from "chakra-react-select";
import { colorOptions, groupedOptions } from "./data/options";

const mappedcolorOptions = colorOptions.map((option) => ({
  ...option,
  colorScheme: option.value,
}));

const App = () => (
  <Container mt={8} mb={24}>
    <Heading as="h1" size="md" p={4}>
      Chakra React Select Demo
    </Heading>
    <FormControl p={4}>
      <FormLabel>
        Single Select Colors and Flavours <Code>size="sm"</Code>
      </FormLabel>
      <Select
        id="color-select"
        name="colors"
        options={groupedOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
        size="sm"
      />
    </FormControl>

    <FormControl p={4}>
      <FormLabel>
        Select Colors and Flavours <Code>size="md" (default)</Code>
      </FormLabel>
      <Select
        isMulti
        name="colors"
        options={groupedOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
      />
    </FormControl>

    <FormControl p={4}>
      <FormLabel>
        Select Colors and Flavours <Code>size="lg"</Code>
      </FormLabel>
      <Select
        isMulti
        name="colors"
        options={groupedOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
        size="lg"
      />
    </FormControl>

    <FormControl p={4}>
      <FormLabel>Async Select</FormLabel>
      <AsyncSelect
        isMulti
        name="colors"
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
        loadOptions={(inputValue, callback) => {
          setTimeout(() => {
            const values = colorOptions.filter((i) =>
              i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            callback(values);
          }, 3000);
        }}
      />
    </FormControl>

    <FormControl p={4}>
      <FormLabel>
        Select Colors and Flavours (With global <Code>tagColorScheme</Code>)
      </FormLabel>
      <Select
        isMulti
        name="colors"
        tagColorScheme="purple"
        options={groupedOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
      />
    </FormControl>

    <FormControl p={4}>
      <FormLabel>
        Select Colors and Flavours (With <Code>colorScheme</Code> in each
        option)
      </FormLabel>
      <Select
        isMulti
        name="colors"
        options={mappedcolorOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
      />
    </FormControl>

    <FormControl p={4}>
      <FormLabel>Select with creatable options</FormLabel>
      <CreatableSelect
        isMulti
        name="colors"
        options={groupedOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
      />
    </FormControl>

    <FormControl p={4} isDisabled>
      <FormLabel>
        Disabled select from the <Code>FormControl</Code>
      </FormLabel>
      <Select
        isMulti
        name="colors"
        options={groupedOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
      />
    </FormControl>

    <FormControl p={4}>
      <FormLabel>
        Disabled select from the <Code>Select</Code> element itself
      </FormLabel>
      <Select
        isDisabled
        isMulti
        name="colors"
        options={groupedOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
      />
    </FormControl>

    <FormControl p={4} isInvalid>
      <FormLabel>
        Invalid select from the <Code>FormControl</Code>
      </FormLabel>
      <Select
        isMulti
        name="colors"
        options={groupedOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
      />
      <FormErrorMessage>
        This error message shows because of an invalid FormControl
      </FormErrorMessage>
    </FormControl>

    <FormControl p={4}>
      <FormLabel>
        Invalid select from the <Code>Select</Code> element itself
      </FormLabel>
      <Select
        isInvalid
        isMulti
        name="colors"
        options={groupedOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
      />
      <FormErrorMessage>
        You can't see this error message because the isInvalid prop is set on
        the select element instead of the form control
      </FormErrorMessage>
    </FormControl>

    <FormControl p={4}>
      <FormLabel>
        Single Select with <Code>selectedOptionStyle="check"</Code>
      </FormLabel>
      <Select
        options={groupedOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
        selectedOptionStyle="check"
      />
    </FormControl>

    <FormControl p={4}>
      <FormLabel>
        Single Select with <Code>selectedOptionColorScheme="green"</Code>
      </FormLabel>
      <Select
        options={groupedOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
        selectedOptionColorScheme="green"
      />
    </FormControl>

    <FormControl p={4}>
      <FormLabel>
        Multi Select with <Code>selectedOptionColorScheme="green"</Code>
      </FormLabel>
      <Select
        isMulti
        options={groupedOptions}
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
        selectedOptionColorScheme="green"
        hideSelectedOptions={false}
      />
    </FormControl>
  </Container>
);

export default App;
