/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import AsyncCreatableReactSelect from "react-select/async-creatable";
import { Props } from "react-select";
import ChakraReactSelect from "./chakra-react-select";

const AsyncCreatableSelect = forwardRef<any, Props>((props, ref) => (
  <ChakraReactSelect {...props}>
    <AsyncCreatableReactSelect ref={ref} />
  </ChakraReactSelect>
));

export default AsyncCreatableSelect;
