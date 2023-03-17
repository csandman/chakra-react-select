function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from "react";
import { Icon } from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { chakra, useMultiStyleConfig } from "@chakra-ui/system";
import { useSize } from "../utils";
var hasColorScheme = function hasColorScheme(option) {
  return typeof option === "object" && option !== null && "colorScheme" in option && typeof option.colorScheme === "string";
};
var hasVariant = function hasVariant(option) {
  return typeof option === "object" && option !== null && "variant" in option && typeof option.variant === "string";
};
var hasIsFixed = function hasIsFixed(option) {
  return typeof option === "object" && option !== null && "isFixed" in option && typeof option.isFixed === "boolean";
};
var MultiValue = function MultiValue(props) {
  var children = props.children,
    className = props.className,
    components = props.components,
    cx = props.cx,
    data = props.data,
    innerProps = props.innerProps,
    isDisabled = props.isDisabled,
    isFocused = props.isFocused,
    removeProps = props.removeProps,
    selectProps = props.selectProps,
    cropWithEllipsis = props.cropWithEllipsis;
  var Container = components.Container,
    Label = components.Label,
    Remove = components.Remove;
  var chakraStyles = selectProps.chakraStyles,
    colorScheme = selectProps.colorScheme,
    tagVariant = selectProps.tagVariant,
    sizeProp = selectProps.size;
  var size = useSize(sizeProp);
  var optionColorScheme = "";
  var optionVariant = "";
  var optionIsFixed = false;
  if (hasColorScheme(data)) {
    optionColorScheme = data.colorScheme;
  }
  if (hasVariant(data)) {
    optionVariant = data.variant;
  }
  if (hasIsFixed(data)) {
    optionIsFixed = data.isFixed;
  }
  var tagStyles = useMultiStyleConfig("Tag", {
    size: size,
    colorScheme: optionColorScheme || colorScheme,
    variant: optionVariant || tagVariant || (optionIsFixed ? "solid" : "subtle")
  });
  var containerInitialSx = _extends({}, tagStyles.container, {
    display: "flex",
    alignItems: "center",
    minWidth: 0,
    // resolves flex/text-overflow bug
    margin: "0.125rem"
  });
  var containerSx = chakraStyles != null && chakraStyles.multiValue ? chakraStyles.multiValue(containerInitialSx, props) : containerInitialSx;
  var labelInitialSx = _extends({}, tagStyles.label, {
    overflow: "hidden",
    textOverflow: cropWithEllipsis || cropWithEllipsis === undefined ? "ellipsis" : undefined,
    whiteSpace: "nowrap"
  });
  var labelSx = chakraStyles != null && chakraStyles.multiValueLabel ? chakraStyles.multiValueLabel(labelInitialSx, props) : labelInitialSx;
  var removeInitialSx = _extends({}, tagStyles.closeButton, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  });
  var removeSx = chakraStyles != null && chakraStyles.multiValueRemove ? chakraStyles.multiValueRemove(removeInitialSx, props) : removeInitialSx;
  return /*#__PURE__*/React.createElement(Container, {
    data: data,
    innerProps: _extends({
      className: cx({
        "multi-value": true,
        "multi-value--is-disabled": isDisabled
      }, className)
    }, innerProps),
    sx: containerSx,
    selectProps: selectProps
  }, /*#__PURE__*/React.createElement(Label, {
    data: data,
    innerProps: {
      className: cx({
        "multi-value__label": true
      }, className)
    },
    sx: labelSx,
    selectProps: selectProps
  }, children), /*#__PURE__*/React.createElement(Remove, {
    data: data,
    innerProps: _extends({
      className: cx({
        "multi-value__remove": true
      }, className),
      "aria-label": "Remove " + (children || "option")
    }, removeProps),
    sx: removeSx,
    selectProps: selectProps,
    isFocused: isFocused
  }));
};
var MultiValueContainer = function MultiValueContainer(props) {
  var children = props.children,
    innerProps = props.innerProps,
    sx = props.sx;
  return /*#__PURE__*/React.createElement(chakra.span, _extends({}, innerProps, {
    sx: sx
  }), children);
};
var MultiValueLabel = function MultiValueLabel(props) {
  var children = props.children,
    innerProps = props.innerProps,
    sx = props.sx;
  return /*#__PURE__*/React.createElement(chakra.span, _extends({}, innerProps, {
    sx: sx
  }), children);
};

/**
 * Borrowed from Chakra UI Tag source
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/tag/src/tag.tsx#L75}
 */
var TagCloseIcon = function TagCloseIcon(props) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    verticalAlign: "inherit",
    viewBox: "0 0 512 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
  }));
};
var MultiValueRemove = function MultiValueRemove(props) {
  var children = props.children,
    innerProps = props.innerProps,
    isFocused = props.isFocused,
    data = props.data,
    sx = props.sx;
  if (hasIsFixed(data) && data.isFixed) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Box, _extends({}, innerProps, {
    role: "button",
    sx: sx,
    "data-focus": isFocused ? true : undefined,
    "data-focus-visible": isFocused ? true : undefined
  }), children || /*#__PURE__*/React.createElement(TagCloseIcon, null));
};
export { MultiValueContainer, MultiValueLabel, MultiValueRemove };
export default MultiValue;
//# sourceMappingURL=multi-value.js.map