import {
  Select as ChakraSelect,
  Code,
  Container,
  Field,
  Flex,
  IconButton,
  Input,
  Portal,
} from "@chakra-ui/react";
import { AsyncSelect, CreatableSelect, Select } from "chakra-react-select";
import { LuX } from "react-icons/lu";
import { ColorModeButton } from "./components/color-mode";
import { SelectValueText } from "./components/select";
import animeMovies from "./data/anime-movies";
import { colorOptions, groupedOptions } from "./data/options";

const App = () => {
  return (
    <Container as="main" maxWidth="lg">
      <Flex justifyContent="flex-end" p={4}>
        <ColorModeButton alignSelf="flex-end" />
      </Flex>
      <Field.Root p={4}>
        <Field.Label>Standard Input</Field.Label>
        <Input placeholder="This is my placeholder" />
        <Field.HelperText>This is some helper text</Field.HelperText>
      </Field.Root>

      <ChakraSelect.Root
        collection={animeMovies}
        defaultValue={["spirited_away"]}
        positioning={{ sameWidth: true }}
        p={4}
      >
        <ChakraSelect.Label>
          Built-in Chakra UI Select <Code>{'size="md"'}</Code>
        </ChakraSelect.Label>

        <ChakraSelect.Control>
          <ChakraSelect.Trigger>
            <SelectValueText placeholder="Select movie" />
          </ChakraSelect.Trigger>
          <ChakraSelect.IndicatorGroup>
            <ChakraSelect.ClearTrigger asChild>
              <IconButton
                size="xs"
                variant="plain"
                focusVisibleRing="inside"
                focusRingWidth="2px"
                pointerEvents="auto"
              >
                <LuX />
              </IconButton>
            </ChakraSelect.ClearTrigger>
            <ChakraSelect.Indicator />
          </ChakraSelect.IndicatorGroup>
        </ChakraSelect.Control>

        <Portal>
          <ChakraSelect.Positioner>
            <ChakraSelect.Content>
              <ChakraSelect.ItemGroup>
                <ChakraSelect.ItemGroupLabel>
                  Anime Movies
                </ChakraSelect.ItemGroupLabel>
                {animeMovies.items.map((movie) => (
                  <ChakraSelect.Item key={movie.value} item={movie}>
                    {movie.label}
                    <ChakraSelect.ItemIndicator />
                  </ChakraSelect.Item>
                ))}
              </ChakraSelect.ItemGroup>
            </ChakraSelect.Content>
          </ChakraSelect.Positioner>
        </Portal>
      </ChakraSelect.Root>

      <ChakraSelect.Root
        collection={animeMovies}
        defaultValue={["spirited_away"]}
        size="sm"
        positioning={{ sameWidth: true }}
        p={4}
      >
        <ChakraSelect.Label>
          Built-in Chakra UI Select <Code>{'size="sm"'}</Code>
        </ChakraSelect.Label>
        <ChakraSelect.Control>
          <ChakraSelect.Trigger>
            <SelectValueText placeholder="Select movie" />
          </ChakraSelect.Trigger>
          <ChakraSelect.IndicatorGroup>
            <ChakraSelect.ClearTrigger asChild>
              <IconButton
                size="xs"
                variant="plain"
                focusVisibleRing="inside"
                focusRingWidth="2px"
                pointerEvents="auto"
              >
                <LuX />
              </IconButton>
            </ChakraSelect.ClearTrigger>
            <ChakraSelect.Indicator />
          </ChakraSelect.IndicatorGroup>
        </ChakraSelect.Control>
        <Portal>
          <ChakraSelect.Positioner>
            <ChakraSelect.Content>
              <ChakraSelect.ItemGroup>
                <ChakraSelect.ItemGroupLabel>
                  Anime Movies
                </ChakraSelect.ItemGroupLabel>
                {animeMovies.items.map((movie) => (
                  <ChakraSelect.Item key={movie.value} item={movie}>
                    {movie.label}
                    <ChakraSelect.ItemIndicator />
                  </ChakraSelect.Item>
                ))}
              </ChakraSelect.ItemGroup>
            </ChakraSelect.Content>
          </ChakraSelect.Positioner>
        </Portal>
      </ChakraSelect.Root>

      <Field.Root p={4}>
        <Field.Label>
          Select Colors and Flavours <Code>{'size="sm"'}</Code>
        </Field.Label>
        <Select
          name="colors"
          options={groupedOptions}
          placeholder="Select some colors..."
          instanceId="colors-flavors"
        />
      </Field.Root>

      <Field.Root p={4}>
        <Field.Label>
          Select a Color or Flavor<Code>{'size="sm"'}</Code>
        </Field.Label>
        <CreatableSelect
          name="colors"
          options={colorOptions}
          placeholder="Select some colors..."
          instanceId="colors"
          size="sm"
          classNamePrefix="crs"
          tagColorPalette="blue"
        />
      </Field.Root>

      <Field.Root p={4}>
        <Field.Label>Async Select</Field.Label>
        <AsyncSelect
          name="colors"
          options={colorOptions}
          placeholder="Select some colors..."
          instanceId="colors"
          classNamePrefix="crs"
          tagColorPalette="blue"
          loadOptions={(_inputValue, callback) => {
            setTimeout(() => {
              callback(colorOptions);
            }, 3000);
          }}
        />
      </Field.Root>

      <Field.Root p={4}>
        <Field.Label>
          Select Colors and Flavours <Code>{'size="lg"'}</Code>
        </Field.Label>
        <CreatableSelect
          name="colors"
          options={groupedOptions}
          placeholder="Select some colors..."
          instanceId="colors"
          isMulti
          size="lg"
          classNamePrefix="crs"
        />
      </Field.Root>

      <Field.Root p={4}>
        <Field.Label>Select Colors and Flavours</Field.Label>
        <CreatableSelect
          name="colors"
          options={groupedOptions}
          placeholder="Select some colors..."
          instanceId="colors"
          isMulti
          classNamePrefix="crs"
        />
      </Field.Root>

      <Field.Root p={4}>
        <Field.Label>
          Select Colors and Flavours <Code>{'size="sm"'}</Code>
        </Field.Label>
        <CreatableSelect
          name="colors"
          options={groupedOptions}
          placeholder="Select some colors..."
          instanceId="colors"
          isMulti
          size="sm"
          classNamePrefix="crs"
        />
      </Field.Root>

      <Field.Root p={4}>
        <Field.Label>Check Style</Field.Label>
        <CreatableSelect
          name="colors"
          options={colorOptions}
          placeholder="Select some colors..."
          classNamePrefix="crs"
          selectedOptionStyle="check"
          isClearable
        />
      </Field.Root>

      <Field.Root p={4} invalid>
        <Field.Label>Invalid from Field</Field.Label>
        <CreatableSelect
          name="colors"
          options={colorOptions}
          placeholder="Select some colors..."
          classNamePrefix="crs"
          isClearable
        />
        <Field.ErrorText>This is an error from the field</Field.ErrorText>
      </Field.Root>

      <Field.Root p={4} disabled>
        <Field.Label>Disabled from Field</Field.Label>
        <CreatableSelect
          name="colors"
          options={colorOptions}
          placeholder="Select some colors..."
          classNamePrefix="crs"
          isClearable
        />
        <Field.ErrorText>This is an error from the field</Field.ErrorText>
      </Field.Root>

      <Field.Root p={4}>
        <Field.Label>Flushed Variant</Field.Label>
        <CreatableSelect
          name="colors"
          options={colorOptions}
          placeholder="Select some colors..."
          classNamePrefix="crs"
          isClearable
          variant="flushed"
        />
        <Field.ErrorText>This is an error from the field</Field.ErrorText>
      </Field.Root>

      <Field.Root p={4}>
        <Field.Label>Subtle Variant</Field.Label>
        <CreatableSelect
          name="colors"
          options={colorOptions}
          placeholder="Select some colors..."
          classNamePrefix="crs"
          isClearable
          variant="subtle"
        />
        <Field.ErrorText>This is an error from the field</Field.ErrorText>
      </Field.Root>
    </Container>
  );
};

export default App;
