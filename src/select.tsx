/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import ReactSelect, { Props } from "react-select";
import ChakraReactSelect from "./chakra-react-select";

const Select = forwardRef<any, Props>((props, ref) => (
  <ChakraReactSelect {...props}>
    <ReactSelect ref={ref} />
  </ChakraReactSelect>
));

export default Select;
