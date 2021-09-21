import React, { forwardRef } from "react";
import CreatableReactSelect from "react-select/creatable";
import ChakraReactSelect from "./chakra-react-select";

const CreatableSelect = forwardRef((props, ref) => (
  <ChakraReactSelect {...props}>
    <CreatableReactSelect ref={ref} />
  </ChakraReactSelect>
));

export default CreatableSelect;
