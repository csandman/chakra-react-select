import { useRef, useState } from "react";
import { Icon } from "@chakra-ui/react";
import type {
  ChakraStylesConfig,
  SelectInstance,
  SingleValue,
} from "chakra-react-select";
import { Select } from "chakra-react-select";
import { LuChevronDown, LuSearch } from "react-icons/lu";
import type { StateOption } from "../../data/options";
import { stateOptions } from "../../data/options";
import { Button } from "../ui/button";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../ui/popover";

const selectStyles: ChakraStylesConfig<StateOption, false> = {
  control: (provided) => ({
    ...provided,
    margin: 2,
    paddingLeft: 0,
    width: "calc(100% - 1rem)",
    cursor: "text",
    flexDirection: "row-reverse",
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingLeft: 2,
  }),
  menu: () => ({}),
  menuList: (provided) => ({
    ...provided,
    shadow: "none",
    borderWidth: 0,
    borderTopWidth: 1,
    borderTopRadius: 0,
  }),
};

const DropdownIndicator = () => (
  <Icon color="gray.400">
    <LuSearch />
  </Icon>
);

const SelectPopoverExample = () => {
  const selectRef = useRef<SelectInstance<StateOption, false>>(null);

  const [open, setOpen] = useState(false);

  const [value, setValue] = useState<StateOption | null>(null);

  const buttonLabel = value ? `State: ${value.label}` : "Select a State";

  const handleChange = (newValue: SingleValue<StateOption>) => {
    setValue(newValue);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    // For some reason, relying on the built-in autoFocus causes the page to scroll
    // to the top of the page on first open. This is a workaround to delay the focus call,
    // which seems to fix the issue.
    setTimeout(() => {
      selectRef.current?.focus();
    });
  };

  return (
    <PopoverRoot
      positioning={{ placement: "bottom-start" }}
      open={open}
      onOpenChange={(changeDetails) => setOpen(changeDetails.open)}
      autoFocus={false}
    >
      <PopoverTrigger asChild>
        <Button
          colorPalette="blue"
          onClick={handleOpen}
          data-active={open ? true : undefined}
        >
          {buttonLabel}
          <LuChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody p={0}>
          <Select
            ref={selectRef}
            options={stateOptions}
            value={value}
            onChange={handleChange}
            components={{ DropdownIndicator }}
            chakraStyles={selectStyles}
            placeholder="Search for a state..."
            menuIsOpen
            backspaceRemovesValue={false}
            tabSelectsValue={false}
            isClearable={false}
            hideSelectedOptions={false}
            controlShouldRenderValue={false}
            focusRingColor="blue.600"
          />
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default SelectPopoverExample;
