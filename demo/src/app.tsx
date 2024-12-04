import {
  Code,
  Container,
  Flex,
  For,
  Heading,
  Input,
  Separator,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AsyncSelect, CreatableSelect, Select } from "chakra-react-select";
import { Field } from "./components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./components/ui/select";
import animeMovies from "./data/anime-movies";
import { colorOptions, groupedOptions } from "./data/options";

const mappedColorOptions = colorOptions.map((option) => ({
  ...option,
  colorPalette: option.value,
}));

const tagVariantOptions = [
  { value: "surface", label: "Surface (default)", variant: "surface" },
  { value: "solid", label: "Solid", variant: "solid" },
  { value: "outline", label: "Outline", variant: "outline" },
  { value: "subtle", label: "Subtle", variant: "subtle" },
];

const App = () => {
  return (
    <Container as="main" maxWidth="lg" mt={8} mb={16}>
      <Heading as="h1" p={4}>
        Chakra React Select Demo
      </Heading>

      <Stack px={4} gap={5}>
        <Field
          label="Standard Input"
          helperText="This is some helper text"
          errorText="This is an error"
        >
          <Input placeholder="This is my placeholder" />
        </Field>

        <Separator my={2} />

        <For each={["sm", "md", "lg"]}>
          {(size) => (
            <SelectRoot key={size} size={size} collection={animeMovies}>
              <SelectLabel>
                Built-in Chakra UI Select <Code>{`size="${size}"`}</Code>
              </SelectLabel>
              <SelectTrigger clearable>
                <SelectValueText placeholder="Select movie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItemGroup label="Anime Movies">
                  {animeMovies.items.map((movie) => (
                    <SelectItem item={movie} key={movie.value}>
                      {movie.label}
                    </SelectItem>
                  ))}
                </SelectItemGroup>
              </SelectContent>
            </SelectRoot>
          )}
        </For>

        <Separator my={2} />

        <Field
          label={
            <Span>
              Select with <Code>{'size="sm"'}</Code>
            </Span>
          }
        >
          <Select
            isMulti
            options={groupedOptions}
            placeholder="Select some colors and flavors..."
            size="sm"
          />
        </Field>

        <Field
          label={
            <Span>
              Select with <Code>{'size="md" (default)'}</Code>
            </Span>
          }
        >
          <Select
            isMulti
            options={groupedOptions}
            placeholder="Select some colors and flavors..."
            size="md"
          />
        </Field>

        <Field
          label={
            <Span>
              Select with <Code>{'size="lg"'}</Code>
            </Span>
          }
        >
          <Select
            isMulti
            options={groupedOptions}
            placeholder="Select some colors and flavors..."
            size="lg"
          />
        </Field>

        <Separator my={2} />

        <Field label="Async Select">
          <AsyncSelect
            placeholder="Select some colors..."
            loadOptions={(_inputValue, callback) => {
              setTimeout(() => callback(colorOptions), 1500);
            }}
          />
        </Field>

        <Field label="Select with Creatable Options">
          <CreatableSelect
            isMulti
            options={colorOptions}
            placeholder="Select some colors..."
          />
        </Field>

        <Separator my={2} />

        <Field
          label={
            <Span>
              Select with <Code>focusRingColor="blue.600"</Code>
            </Span>
          }
        >
          <Select
            options={colorOptions}
            placeholder="Select some colors..."
            focusRingColor="blue.600"
          />
        </Field>

        <Field
          label={
            <Span>
              Select with global <Code>tagColorPalette</Code>
            </Span>
          }
        >
          <Select
            isMulti
            options={colorOptions}
            placeholder="Select some colors..."
            tagColorPalette="purple"
          />
        </Field>

        <Field
          label={
            <Span>
              Select with <Code>colorPalette</Code> in each option
            </Span>
          }
        >
          <Select
            isMulti
            options={mappedColorOptions}
            placeholder="Select some colors..."
          />
        </Field>

        <Field
          label={
            <Span>
              Select with global <Code>tagVariant</Code>
            </Span>
          }
        >
          <Select
            isMulti
            options={colorOptions}
            placeholder="Select some colors..."
            tagVariant="outline"
          />
        </Field>

        <Field
          label={
            <Span>
              Select with individual option <Code>variant</Code>
            </Span>
          }
        >
          <Select
            isMulti
            options={tagVariantOptions}
            placeholder="Select some tag variants..."
          />
        </Field>

        <Separator my={2} />

        <Field
          disabled
          label={
            <Span>
              Disabled Select from the <Code>Field.Root</Code>
            </Span>
          }
        >
          <Select
            isMulti
            options={colorOptions}
            placeholder="Select some colors..."
          />
        </Field>

        <Field
          label={
            <Span>
              Disabled Select from the <Code>Select</Code> element
            </Span>
          }
        >
          <Select
            disabled
            isMulti
            options={colorOptions}
            placeholder="Select some colors..."
          />
        </Field>

        <Field
          invalid
          errorText="This error message shows because of an invalid Field.Root"
          label={
            <Span>
              Invalid Select from the <Code>Field.Root</Code>
            </Span>
          }
        >
          <Select
            isMulti
            options={colorOptions}
            placeholder="Select some colors..."
          />
        </Field>

        <Field
          errorText="You can't see this error message because the isInvalid prop is set on the select element instead of the form control"
          label={
            <Span>
              Invalid Select from the <Code>Select</Code> element
            </Span>
          }
        >
          <Select
            invalid
            isMulti
            options={colorOptions}
            placeholder="Select some colors..."
          />
        </Field>

        <Separator my={2} />

        <Field
          label={
            <Span>
              Single Select with{" "}
              <Code>{'selectedOptionStyle="color" (default)'}</Code>
            </Span>
          }
        >
          <Select
            options={colorOptions}
            placeholder="Select some colors..."
            selectedOptionStyle="color"
          />
        </Field>

        <Field
          label={
            <Span>
              Single Select with <Code>{'selectedOptionStyle="check"'}</Code>
            </Span>
          }
        >
          <Select
            options={colorOptions}
            placeholder="Select some colors..."
            selectedOptionStyle="check"
          />
        </Field>

        <Field
          label={
            <Span>
              Select with <Code>{'variant="outline" (default)'}</Code>
            </Span>
          }
        >
          <Select
            isMulti
            options={colorOptions}
            placeholder="Select some colors..."
            variant="outline"
          />
        </Field>

        <Field
          label={
            <Span>
              Select with <Code>{'variant="subtle"'}</Code>
            </Span>
          }
        >
          <Select
            isMulti
            options={colorOptions}
            placeholder="Select some colors..."
            variant="subtle"
          />
        </Field>

        <Separator my={2} />

        <Flex direction="column" gap={1}>
          <Text fontSize="sm" fontWeight="medium">
            Select Not wrapped in a <Code>Field.Root</Code>
          </Text>
          <Select
            name="colors"
            options={colorOptions}
            placeholder="Select some colors..."
          />
        </Flex>
      </Stack>
    </Container>
  );
};

export default App;
