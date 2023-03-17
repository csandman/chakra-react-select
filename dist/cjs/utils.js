"use strict";

exports.__esModule = true;
exports.useSize = exports.cleanCommonProps = void 0;
var _mediaQuery = require("@chakra-ui/media-query");
var _system = require("@chakra-ui/system");
var _excluded = ["className", "clearValue", "cx", "getStyles", "getClassNames", "getValue", "hasValue", "isMulti", "isRtl", "options", "selectOption", "selectProps", "setValue", "theme"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Clean Common Props
 *
 * Borrowed from the original `react-select` package
 *
 * @see {@link https://github.com/JedWatson/react-select/blob/edf5265ee0158c026c9e8527a6d0490a5ac2ef23/packages/react-select/src/utils.ts#L75-L110}
 */
var cleanCommonProps = function cleanCommonProps(props) {
  // className
  var className = props.className,
    clearValue = props.clearValue,
    cx = props.cx,
    getStyles = props.getStyles,
    getClassNames = props.getClassNames,
    getValue = props.getValue,
    hasValue = props.hasValue,
    isMulti = props.isMulti,
    isRtl = props.isRtl,
    options = props.options,
    selectOption = props.selectOption,
    selectProps = props.selectProps,
    setValue = props.setValue,
    theme = props.theme,
    innerProps = _objectWithoutPropertiesLoose(props, _excluded);
  return _extends({}, innerProps);
};

/** A typeguard to ensure the default size on the Input component is valid. */
exports.cleanCommonProps = cleanCommonProps;
var isSize = function isSize(size) {
  var isString = typeof size === "string";
  return isString && ["sm", "md", "lg"].includes(size);
};
var getDefaultSize = function getDefaultSize(size) {
  if (isSize(size)) {
    return size;
  }
  if (size === "xs") {
    return "sm";
  }

  // This shouldn't be necessary but it might help the size get closer to the
  // user's goal if they have `xl` as a custom size.
  if (size === "xl") {
    return "lg";
  }
  return "md";
};
var useSize = function useSize(size) {
  var chakraTheme = (0, _system.useTheme)();
  var defaultSize = getDefaultSize(chakraTheme.components.Input.defaultProps.size);

  // Ensure that the size used is one of the options, either `sm`, `md`, or `lg`
  var definedSize = size != null ? size : defaultSize;
  // Or, if a breakpoint is passed, get the size based on the current screen size
  var realSize = (0, _mediaQuery.useBreakpointValue)(typeof definedSize === "string" ? [definedSize] : definedSize, {
    fallback: "md"
  }) || defaultSize;
  return realSize;
};
exports.useSize = useSize;
//# sourceMappingURL=utils.js.map