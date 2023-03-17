function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from "react";
import { Box } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/system";
var Placeholder = function Placeholder(props) {
  var children = props.children,
    className = props.className,
    cx = props.cx,
    innerProps = props.innerProps,
    chakraStyles = props.selectProps.chakraStyles;

  /**
   * The chakra UI global placeholder color
   *
   * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/theme/src/styles.ts#L13}
   */
  var color = useColorModeValue("gray.400", "whiteAlpha.400");
  var initialSx = {
    gridArea: "1 / 1 / 2 / 3",
    color: color,
    mx: "0.125rem",
    userSelect: "none"
  };
  var sx = chakraStyles != null && chakraStyles.placeholder ? chakraStyles.placeholder(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Box, _extends({}, innerProps, {
    className: cx({
      placeholder: true
    }, className),
    sx: sx
  }), children);
};
export default Placeholder;
//# sourceMappingURL=placeholder.js.map