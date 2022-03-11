import type { ChakraStylesConfig } from "../../types";
import { colorOptions } from "./data";

const chakraStyles: ChakraStylesConfig = {
  menu: (provided) => ({
    ...provided,
    zIndex: 10,
  }),
};

const defaultProps = {
  chakraStyles,
  options: colorOptions,
  placeholder: "Select some colors",
  isMulti: true,
  menuPortalTarget: document.body,
};

export default defaultProps;
