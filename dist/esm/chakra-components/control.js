var _excluded = ["h"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from "react";
import { Icon } from "@chakra-ui/icon";
import { Box, Divider } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useMultiStyleConfig, useStyleConfig } from "@chakra-ui/system";
import { useSize } from "../utils";
var Control = function Control(props) {
  var className = props.className,
    cx = props.cx,
    children = props.children,
    innerRef = props.innerRef,
    innerProps = props.innerProps,
    isDisabled = props.isDisabled,
    isFocused = props.isFocused,
    menuIsOpen = props.menuIsOpen,
    _props$selectProps = props.selectProps,
    chakraStyles = _props$selectProps.chakraStyles,
    sizeProp = _props$selectProps.size,
    variant = _props$selectProps.variant,
    focusBorderColor = _props$selectProps.focusBorderColor,
    errorBorderColor = _props$selectProps.errorBorderColor,
    isInvalid = _props$selectProps.isInvalid,
    isReadOnly = _props$selectProps.isReadOnly;
  var size = useSize(sizeProp);
  var _useMultiStyleConfig = useMultiStyleConfig("Input", {
      size: size,
      variant: variant,
      focusBorderColor: focusBorderColor,
      errorBorderColor: errorBorderColor
    }),
    _useMultiStyleConfig$ = _useMultiStyleConfig.field,
    minH = _useMultiStyleConfig$.h,
    fieldStyles = _objectWithoutPropertiesLoose(_useMultiStyleConfig$, _excluded);
  var initialSx = _extends({}, fieldStyles, {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: 0,
    overflow: "hidden",
    minH: minH
  }, isDisabled ? {
    pointerEvents: "none"
  } : {});
  var sx = chakraStyles != null && chakraStyles.control ? chakraStyles.control(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: innerRef,
    className: cx({
      control: true,
      "control--is-disabled": isDisabled,
      "control--is-focused": isFocused,
      "control--menu-is-open": menuIsOpen
    }, className),
    sx: sx
  }, innerProps, {
    "data-focus": isFocused ? true : undefined,
    "data-focus-visible": isFocused ? true : undefined,
    "data-invalid": isInvalid ? true : undefined,
    "data-disabled": isDisabled ? true : undefined,
    "aria-readonly": isReadOnly ? true : undefined
  }), children);
};
export var IndicatorSeparator = function IndicatorSeparator(props) {
  var className = props.className,
    cx = props.cx,
    _props$selectProps2 = props.selectProps,
    chakraStyles = _props$selectProps2.chakraStyles,
    useBasicStyles = _props$selectProps2.useBasicStyles,
    variant = _props$selectProps2.variant;
  var initialSx = _extends({
    opacity: 1
  }, useBasicStyles || variant !== "outline" ? {
    display: "none"
  } : {});
  var sx = chakraStyles != null && chakraStyles.indicatorSeparator ? chakraStyles.indicatorSeparator(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Divider, {
    className: cx({
      "indicator-separator": true
    }, className),
    sx: sx,
    orientation: "vertical"
  });
};

/**
 * Borrowed from the `@chakra-ui/icons` package to prevent needing it as a dependency
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/main/packages/icons/src/ChevronDown.tsx}
 */
export var DownChevron = function DownChevron(props) {
  return /*#__PURE__*/React.createElement(Icon, props, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
  }));
};
export var DropdownIndicator = function DropdownIndicator(props) {
  var children = props.children,
    className = props.className,
    cx = props.cx,
    innerProps = props.innerProps,
    _props$selectProps3 = props.selectProps,
    chakraStyles = _props$selectProps3.chakraStyles,
    useBasicStyles = _props$selectProps3.useBasicStyles,
    sizeProp = _props$selectProps3.size,
    focusBorderColor = _props$selectProps3.focusBorderColor,
    errorBorderColor = _props$selectProps3.errorBorderColor,
    variant = _props$selectProps3.variant;
  var size = useSize(sizeProp);
  var inputStyles = useMultiStyleConfig("Input", {
    size: size,
    variant: variant,
    focusBorderColor: focusBorderColor,
    errorBorderColor: errorBorderColor
  });
  var iconSizes = {
    sm: "16px",
    md: "20px",
    lg: "24px"
  };
  var iconSize = iconSizes[size];
  var initialSx = _extends({}, inputStyles.addon, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: 0,
    borderWidth: 0,
    fontSize: iconSize
  }, useBasicStyles && {
    background: "transparent",
    padding: 0,
    width: 6,
    marginRight: 2,
    marginLeft: 1,
    cursor: "inherit"
  });
  var sx = chakraStyles != null && chakraStyles.dropdownIndicator ? chakraStyles.dropdownIndicator(initialSx, props) : initialSx;
  var initialIconStyles = {
    height: "1em",
    width: "1em"
  };
  var iconSx = chakraStyles != null && chakraStyles.downChevron ? chakraStyles.downChevron(initialIconStyles, props) : initialIconStyles;
  return /*#__PURE__*/React.createElement(Box, _extends({}, innerProps, {
    className: cx({
      indicator: true,
      "dropdown-indicator": true
    }, className),
    sx: sx
  }), children || /*#__PURE__*/React.createElement(DownChevron, {
    sx: iconSx
  }));
};

/**
 * Borrowed from Chakra UI source
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/close-button/src/close-button.tsx#L14}
 */
export var CrossIcon = function CrossIcon(props) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    focusable: "false",
    "aria-hidden": true
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
  }));
};
export var ClearIndicator = function ClearIndicator(props) {
  var children = props.children,
    className = props.className,
    cx = props.cx,
    innerProps = props.innerProps,
    _props$selectProps4 = props.selectProps,
    chakraStyles = _props$selectProps4.chakraStyles,
    sizeProp = _props$selectProps4.size;
  var size = useSize(sizeProp);
  var closeButtonStyles = useStyleConfig("CloseButton", {
    size: size
  });
  var initialSx = _extends({}, closeButtonStyles, {
    marginX: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "pointer"
  });
  var sx = chakraStyles != null && chakraStyles.clearIndicator ? chakraStyles.clearIndicator(initialSx, props) : initialSx;
  var initialIconStyles = {
    width: "1em",
    height: "1em"
  };
  var iconSx = chakraStyles != null && chakraStyles.crossIcon ? chakraStyles.crossIcon(initialIconStyles, props) : initialIconStyles;
  return /*#__PURE__*/React.createElement(Box, _extends({
    role: "button",
    className: cx({
      indicator: true,
      "clear-indicator": true
    }, className),
    sx: sx,
    "aria-label": "Clear selected options"
  }, innerProps), children || /*#__PURE__*/React.createElement(CrossIcon, {
    sx: iconSx
  }));
};
export var LoadingIndicator = function LoadingIndicator(props) {
  var className = props.className,
    cx = props.cx,
    innerProps = props.innerProps,
    _props$selectProps5 = props.selectProps,
    chakraStyles = _props$selectProps5.chakraStyles,
    sizeProp = _props$selectProps5.size,
    color = props.color,
    emptyColor = props.emptyColor,
    speed = props.speed,
    thickness = props.thickness,
    propsSpinnerSize = props.spinnerSize;
  var size = useSize(sizeProp);
  var spinnerSizes = {
    sm: "xs",
    md: "sm",
    lg: "md"
  };
  var spinnerSize = spinnerSizes[size];
  var initialSx = {
    marginRight: 3
  };
  var sx = chakraStyles != null && chakraStyles.loadingIndicator ? chakraStyles.loadingIndicator(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Spinner, _extends({
    className: cx({
      indicator: true,
      "loading-indicator": true
    }, className),
    sx: sx
  }, innerProps, {
    size: propsSpinnerSize || spinnerSize,
    color: color,
    emptyColor: emptyColor,
    speed: speed,
    thickness: thickness
  }));
};
export default Control;
//# sourceMappingURL=control.js.map