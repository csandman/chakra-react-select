import React, { forwardRef } from "react";
import CreatableReactSelect from "react-select/creatable";
import { Props } from "react-select";
import ChakraReactSelect from "./chakra-react-select";

const CreatableSelect = forwardRef<any, Props>((props, ref) => (
  <ChakraReactSelect {...props}>
    <CreatableReactSelect ref={ref} />
  </ChakraReactSelect>
));

export default CreatableSelect;
