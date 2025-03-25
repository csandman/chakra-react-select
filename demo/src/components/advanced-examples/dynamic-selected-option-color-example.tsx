import { useState } from "react";
import { Select } from "chakra-react-select";
import { ColorOption, colorOptions } from "../../data/options";

const DynamicSelectedOptionColorExample = () => {
  const [selectedOptionColorPalette, setSelectedOptionColorPalette] =
    useState<ColorOption | null>(colorOptions[0]);

  return (
    <Select
      name="colors"
      options={colorOptions}
      placeholder="Select a color..."
      closeMenuOnSelect={false}
      value={selectedOptionColorPalette}
      onChange={setSelectedOptionColorPalette}
      selectedOptionColorPalette={selectedOptionColorPalette?.value}
    />
  );
};

export default DynamicSelectedOptionColorExample;
