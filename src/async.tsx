import React, { forwardRef } from "react";
import AsyncReactSelect from "react-select/async";
import { Props } from "react-select";
import ChakraReactSelect from "./chakra-react-select";

const AsyncSelect = forwardRef<any, Props>((props, ref) => (
  <ChakraReactSelect {...props}>
    <AsyncReactSelect ref={ref} />
  </ChakraReactSelect>
));

export default AsyncSelect;
