var _excluded = ["innerRef", "isDisabled", "isHidden", "inputClassName"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from "react";
import { Box } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { cleanCommonProps } from "../utils";
var Input = function Input(props) {
  var className = props.className,
    cx = props.cx,
    value = props.value,
    _props$selectProps = props.selectProps,
    chakraStyles = _props$selectProps.chakraStyles,
    isReadOnly = _props$selectProps.isReadOnly,
    isRequired = _props$selectProps.isRequired;
  var _cleanCommonProps = cleanCommonProps(props),
    innerRef = _cleanCommonProps.innerRef,
    isDisabled = _cleanCommonProps.isDisabled,
    isHidden = _cleanCommonProps.isHidden,
    inputClassName = _cleanCommonProps.inputClassName,
    innerProps = _objectWithoutPropertiesLoose(_cleanCommonProps, _excluded);
  var spacingSx = {
    gridArea: "1 / 2",
    minW: "2px",
    border: 0,
    margin: 0,
    outline: 0,
    padding: 0
  };
  var initialContainerSx = {
    flex: "1 1 auto",
    display: "inline-grid",
    gridArea: "1 / 1 / 2 / 3",
    gridTemplateColumns: "0 min-content",
    color: "inherit",
    marginX: "0.125rem",
    paddingY: "0.125rem",
    visibility: isDisabled ? "hidden" : "visible",
    // Force css to recompute when value change due to @emotion bug.
    // We can remove it whenever the bug is fixed.
    transform: value ? "translateZ(0)" : "",
    _after: _extends({
      content: 'attr(data-value) " "',
      visibility: "hidden",
      whiteSpace: "pre",
      padding: 0
    }, spacingSx)
  };
  var containerSx = chakraStyles != null && chakraStyles.inputContainer ? chakraStyles.inputContainer(initialContainerSx, props) : initialContainerSx;
  var initialInputSx = _extends({
    background: 0,
    opacity: isHidden ? 0 : 1,
    width: "100%"
  }, spacingSx);
  var inputSx = chakraStyles != null && chakraStyles.input ? chakraStyles.input(initialInputSx, props) : initialInputSx;
  return /*#__PURE__*/React.createElement(Box, {
    className: cx({
      "input-container": true
    }, className),
    "data-value": value || "",
    sx: containerSx
  }, /*#__PURE__*/React.createElement(chakra.input, _extends({
    className: cx({
      input: true
    }, inputClassName),
    ref: innerRef,
    sx: inputSx,
    disabled: isDisabled,
    readOnly: isReadOnly ? true : undefined,
    "aria-readonly": isReadOnly ? true : undefined,
    "aria-required": isRequired ? true : undefined
  }, innerProps)));
};
export default Input;
//# sourceMappingURL=input.js.map