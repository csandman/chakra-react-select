function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef } from "react";
import AsyncCreatableReactSelect from "react-select/async-creatable";
import useChakraSelectProps from "../use-chakra-select-props";
var AsyncCreatableSelect = /*#__PURE__*/forwardRef(function (props, ref) {
  var chakraSelectProps = useChakraSelectProps(props);
  return /*#__PURE__*/React.createElement(AsyncCreatableReactSelect, _extends({
    ref: ref
  }, chakraSelectProps));
});
export default AsyncCreatableSelect;
//# sourceMappingURL=async-creatable-select.js.map