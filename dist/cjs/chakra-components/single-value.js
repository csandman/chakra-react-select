"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _layout = require("@chakra-ui/layout");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  return /*#__PURE__*/_react["default"].createElement(_layout.Box, _extends({
    className: cx({
      "single-value": true,
      "single-value--is-disabled": isDisabled
    }, className),
    sx: sx
  }, innerProps), children);
};
var _default = SingleValue;
exports["default"] = _default;
//# sourceMappingURL=single-value.js.map