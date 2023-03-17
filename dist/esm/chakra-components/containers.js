function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from "react";
import { Box } from "@chakra-ui/layout";
import { useMultiStyleConfig } from "@chakra-ui/system";
import { useSize } from "../utils";
export var SelectContainer = function SelectContainer(props) {
  var children = props.children,
    className = props.className,
    cx = props.cx,
    innerProps = props.innerProps,
    isDisabled = props.isDisabled,
    isRtl = props.isRtl,
    hasValue = props.hasValue,
    chakraStyles = props.selectProps.chakraStyles;
  var initialSx = _extends({
    position: "relative",
    direction: isRtl ? "rtl" : undefined
  }, isDisabled ? {
    cursor: "not-allowed"
  } : {});
  var sx = chakraStyles != null && chakraStyles.container ? chakraStyles.container(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Box, _extends({}, innerProps, {
    className: cx({
      "--is-disabled": isDisabled,
      "--is-rtl": isRtl,
      "--has-value": hasValue
    }, className),
    sx: sx
  }), children);
};
export var ValueContainer = function ValueContainer(props) {
  var children = props.children,
    className = props.className,
    cx = props.cx,
    isMulti = props.isMulti,
    hasValue = props.hasValue,
    innerProps = props.innerProps,
    _props$selectProps = props.selectProps,
    chakraStyles = _props$selectProps.chakraStyles,
    sizeProp = _props$selectProps.size,
    variant = _props$selectProps.variant,
    focusBorderColor = _props$selectProps.focusBorderColor,
    errorBorderColor = _props$selectProps.errorBorderColor,
    controlShouldRenderValue = _props$selectProps.controlShouldRenderValue;
  var size = useSize(sizeProp);

  // Getting the css from input instead of select
  // to fit better with each of the variants
  var inputStyles = useMultiStyleConfig("Input", {
    size: size,
    variant: variant,
    focusBorderColor: focusBorderColor,
    errorBorderColor: errorBorderColor
  });
  var initialSx = {
    display: isMulti && hasValue && controlShouldRenderValue ? "flex" : "grid",
    alignItems: "center",
    flex: 1,
    paddingY: "2px",
    paddingX: inputStyles.field.px,
    flexWrap: "wrap",
    WebkitOverflowScrolling: "touch",
    position: "relative",
    overflow: "hidden"
  };
  var sx = chakraStyles != null && chakraStyles.valueContainer ? chakraStyles.valueContainer(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Box, _extends({}, innerProps, {
    className: cx({
      "value-container": true,
      "value-container--is-multi": isMulti,
      "value-container--has-value": hasValue
    }, className),
    sx: sx
  }), children);
};
export var IndicatorsContainer = function IndicatorsContainer(props) {
  var children = props.children,
    className = props.className,
    cx = props.cx,
    innerProps = props.innerProps,
    chakraStyles = props.selectProps.chakraStyles;
  var initialSx = {
    display: "flex",
    alignItems: "center",
    alignSelf: "stretch",
    flexShrink: 0
  };
  var sx = chakraStyles != null && chakraStyles.indicatorsContainer ? chakraStyles.indicatorsContainer(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Box, _extends({}, innerProps, {
    className: cx({
      indicators: true
    }, className),
    sx: sx
  }), children);
};
//# sourceMappingURL=containers.js.map