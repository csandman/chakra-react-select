function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef } from "react";
import CreatableReactSelect from "react-select/creatable";
import useChakraSelectProps from "../use-chakra-select-props";
var CreatableSelect = /*#__PURE__*/forwardRef(function (props, ref) {
  var chakraSelectProps = useChakraSelectProps(props);
  return /*#__PURE__*/React.createElement(CreatableReactSelect, _extends({
    ref: ref
  }, chakraSelectProps));
});
export default CreatableSelect;
//# sourceMappingURL=creatable-select.js.map