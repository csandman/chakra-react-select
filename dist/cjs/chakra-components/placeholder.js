"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _layout = require("@chakra-ui/layout");
var _system = require("@chakra-ui/system");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  var color = (0, _system.useColorModeValue)("gray.400", "whiteAlpha.400");
  var initialSx = {
    gridArea: "1 / 1 / 2 / 3",
    color: color,
    mx: "0.125rem",
    userSelect: "none"
  };
  var sx = chakraStyles != null && chakraStyles.placeholder ? chakraStyles.placeholder(initialSx, props) : initialSx;
  return /*#__PURE__*/_react["default"].createElement(_layout.Box, _extends({}, innerProps, {
    className: cx({
      placeholder: true
    }, className),
    sx: sx
  }), children);
};
var _default = Placeholder;
exports["default"] = _default;
//# sourceMappingURL=placeholder.js.map