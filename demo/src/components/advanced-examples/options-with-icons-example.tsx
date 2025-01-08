import { Box, Icon, useSlotRecipe } from "@chakra-ui/react";
import {
  type GroupBase,
  Select,
  type SelectComponentsConfig,
  chakraComponents,
} from "chakra-react-select";
import {
  GiCherry,
  GiChocolateBar,
  GiCoffeeBeans,
  GiStrawberry,
} from "react-icons/gi";

interface FlavorOption {
  label: string;
  value: string;
  Icon: React.FC;
  iconColor: string;
}

const flavorOptions: FlavorOption[] = [
  {
    value: "coffee",
    label: "Coffee",
    Icon: GiCoffeeBeans,
    iconColor: "orange.700",
  },
  {
    value: "chocolate",
    label: "Chocolate",
    Icon: GiChocolateBar,
    iconColor: "yellow.800",
  },
  {
    value: "strawberry",
    label: "Strawberry",
    Icon: GiStrawberry,
    iconColor: "red.500",
  },
  {
    value: "cherry",
    label: "Cherry",
    Icon: GiCherry,
    iconColor: "red.600",
  },
];

const customComponents: SelectComponentsConfig<
  FlavorOption,
  true,
  GroupBase<FlavorOption>
> = {
  Option: ({ children, ...props }) => (
    <chakraComponents.Option {...props}>
      <Icon color={props.data.iconColor} boxSize={4}>
        <props.data.Icon />
      </Icon>
      <Box flexGrow={1}>{children}</Box>
    </chakraComponents.Option>
  ),
  MultiValueContainer: ({ children, ...props }) => {
    const tagStyles = useSlotRecipe({ key: "tag" })();
    return (
      <chakraComponents.MultiValueContainer {...props}>
        <Box css={tagStyles.startElement} color={props.data.iconColor}>
          <props.data.Icon />
        </Box>
        {children}
      </chakraComponents.MultiValueContainer>
    );
  },
};

const OptionsWithIconsExample = () => (
  <Select
    isMulti
    options={flavorOptions}
    placeholder="Select some flavors..."
    components={customComponents}
  />
);

export default OptionsWithIconsExample;
