function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from "react";
import { Box } from "@chakra-ui/layout";
var SingleValue = function SingleValue(props) {
  var children = props.children,
    className = props.className,
    cx = props.cx,
    isDisabled = props.isDisabled,
    innerProps = props.innerProps,
    chakraStyles = props.selectProps.chakraStyles;
  var initialSx = {
    gridArea: "1 / 1 / 2 / 3",
    mx: "0.125rem",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  };
  var sx = chakraStyles != null && chakraStyles.singleValue ? chakraStyles.singleValue(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Box, _extends({
    className: cx({
      "single-value": true,
      "single-value--is-disabled": isDisabled
    }, className),
    sx: sx
  }, innerProps), children);
};
export default SingleValue;
//# sourceMappingURL=single-value.js.map