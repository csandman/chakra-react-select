import React from "react";
import { Container, FormControl, FormLabel } from "@chakra-ui/react";
import ChakraReactSelect from "../select";

const defaultColorOptions = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

export default {
  component: ChakraReactSelect,
  title: "Select",
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "inline-radio" },
      defaultValue: "md",
      description: "The input's size",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
      },
    },
    selectedOptionStyle: {
      options: ["color", "check"],
      control: { type: "inline-radio" },
      defaultValue: "color",
      description:
        "Whether to highlight a selected option with a color or the check used in Chakra UI's menu component",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "color" },
      },
    },
    selectedOptionColor: {
      options: defaultColorOptions,
      control: { type: "select" },
      defaultValue: "blue",
      description:
        "The color key from your theme that styles the selected option",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "blue" },
      },
    },
    tagVariant: {
      options: [undefined, "subtle", "solid", "outline"],
      control: { type: "radio" },
      description:
        "The variant to apply to the selected option tags when `isMulti` is passed",
      table: {
        type: { summary: "string" },
      },
    },
    colorScheme: {
      options: defaultColorOptions,
      control: { type: "select" },
      defaultValue: "gray",
      description:
        "The color key from your theme that styles the selected option `<Tag />`",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "gray" },
      },
    },
    isInvalid: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "Style the component with Chakra UI's invalid input outline",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
  },
};

const Template: React.FC = (props) => {
  const flavorOptions = [
    { value: "vanilla", label: "Vanilla", rating: "safe" },
    { value: "chocolate", label: "Chocolate", rating: "good" },
    { value: "strawberry", label: "Strawberry", rating: "wild" },
    { value: "salted-caramel", label: "Salted Caramel", rating: "crazy" },
  ];

  return (
    <Container h="400px">
      <FormControl id="flavors">
        <FormLabel>Select a Flavor</FormLabel>
        <ChakraReactSelect options={flavorOptions} {...props} />
      </FormControl>
    </Container>
  );
};

export const Select = Template.bind({});
