import React, { forwardRef } from "react";
import AsyncReactSelect from "react-select/async";
import ChakraReactSelect from "./chakra-react-select";

const AsyncSelect = forwardRef((props, ref) => (
  <ChakraReactSelect {...props}>
    <AsyncReactSelect ref={ref} />
  </ChakraReactSelect>
));

export default AsyncSelect;
