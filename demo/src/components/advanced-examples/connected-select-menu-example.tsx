import { useSlotRecipe } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import groupedCountries from "../../data/countries";
import { useColorModeValue } from "../ui/color-mode";

const ConnectedSelectMenuExample = () => {
  const tableStyles = useSlotRecipe({ key: "table" })({ size: "sm" });

  const outlineColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Select
      isMulti
      name="countries"
      options={groupedCountries}
      placeholder="Select some countries..."
      closeMenuOnSelect={false}
      focusRingColor={outlineColor}
      chakraStyles={{
        control: (provided, state) => ({
          ...provided,
          borderBottomRadius: state.menuIsOpen ? "none" : "sm",
        }),
        groupHeading: (provided) => ({
          ...provided,
          fontSize: tableStyles.header.fontSize,
          color: tableStyles.header.color,
          fontWeight: tableStyles.header.fontWeight,
          letterSpacing: tableStyles.header.letterSpacing,
          px: "0.8rem",
        }),
        menu: (provided) => ({
          ...provided,
          my: 0,
          borderTopRadius: 0,
          borderBottomRadius: "md",
          borderWidth: "1px",
          borderColor: outlineColor,
          shadow: `0 0 0 1px {colors.${outlineColor}}`,
        }),
        menuList: (provided) => ({
          ...provided,
          borderTopRadius: 0,
          borderWidth: 0,
        }),
      }}
    />
  );
};

export default ConnectedSelectMenuExample;
