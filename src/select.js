import React, { forwardRef } from "react";
import ReactSelect from "react-select";
import ChakraReactSelect from "./chakra-react-select";

const Select = forwardRef((props, ref) => (
  <ChakraReactSelect {...props}>
    <ReactSelect ref={ref} />
  </ChakraReactSelect>
));

export default Select;
