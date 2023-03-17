function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from "react";
import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { MenuIcon } from "@chakra-ui/menu";
import { useColorModeValue, useMultiStyleConfig } from "@chakra-ui/system";
import { useSize } from "../utils";
var alignToControl = function alignToControl(placement) {
  var placementToCSSProp = {
    bottom: "top",
    top: "bottom"
  };
  return placement ? placementToCSSProp[placement] : "top";
};
var Menu = function Menu(props) {
  var _initialSx;
  var className = props.className,
    cx = props.cx,
    children = props.children,
    innerProps = props.innerProps,
    innerRef = props.innerRef,
    placement = props.placement,
    chakraStyles = props.selectProps.chakraStyles;
  var initialSx = (_initialSx = {
    position: "absolute"
  }, _initialSx[alignToControl(placement)] = "100%", _initialSx.marginY = "8px", _initialSx.width = "100%", _initialSx.zIndex = 1, _initialSx);
  var sx = chakraStyles != null && chakraStyles.menu ? chakraStyles.menu(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Box, _extends({}, innerProps, {
    ref: innerRef,
    className: cx({
      menu: true
    }, className),
    sx: sx
  }), children);
};
export default Menu;
export var MenuList = function MenuList(props) {
  var _inputStyles$field;
  var className = props.className,
    cx = props.cx,
    innerRef = props.innerRef,
    children = props.children,
    maxHeight = props.maxHeight,
    isMulti = props.isMulti,
    innerProps = props.innerProps,
    _props$selectProps = props.selectProps,
    chakraStyles = _props$selectProps.chakraStyles,
    sizeProp = _props$selectProps.size,
    variant = _props$selectProps.variant,
    focusBorderColor = _props$selectProps.focusBorderColor,
    errorBorderColor = _props$selectProps.errorBorderColor;
  var menuStyles = useMultiStyleConfig("Menu");
  var size = useSize(sizeProp);
  var inputStyles = useMultiStyleConfig("Input", {
    size: size,
    variant: variant,
    focusBorderColor: focusBorderColor,
    errorBorderColor: errorBorderColor
  });
  var initialSx = _extends({}, menuStyles.list, {
    minW: "100%",
    maxHeight: maxHeight + "px",
    overflowY: "auto",
    borderRadius: (_inputStyles$field = inputStyles.field) == null ? void 0 : _inputStyles$field.borderRadius,
    position: "relative",
    // required for offset[Height, Top] > keyboard scroll
    WebkitOverflowScrolling: "touch"
  });
  var sx = chakraStyles != null && chakraStyles.menuList ? chakraStyles.menuList(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Box, _extends({}, innerProps, {
    className: cx({
      "menu-list": true,
      "menu-list--is-multi": isMulti
    }, className),
    sx: sx,
    ref: innerRef
  }), children);
};
export var LoadingMessage = function LoadingMessage(props) {
  var children = props.children,
    className = props.className,
    cx = props.cx,
    innerProps = props.innerProps,
    _props$selectProps2 = props.selectProps,
    chakraStyles = _props$selectProps2.chakraStyles,
    sizeProp = _props$selectProps2.size;

  /**
   * The chakra UI global placeholder color
   *
   * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/theme/src/styles.ts#L13}
   */
  var color = useColorModeValue("gray.400", "whiteAlpha.400");
  var size = useSize(sizeProp);
  var verticalPaddings = {
    sm: "6px",
    md: "8px",
    lg: "10px"
  };
  var initialSx = {
    color: color,
    textAlign: "center",
    paddingY: verticalPaddings[size],
    fontSize: size
  };
  var sx = chakraStyles != null && chakraStyles.loadingMessage ? chakraStyles.loadingMessage(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Box, _extends({}, innerProps, {
    className: cx({
      "menu-notice": true,
      "menu-notice--loading": true
    }, className),
    sx: sx
  }), children);
};
export var NoOptionsMessage = function NoOptionsMessage(props) {
  var children = props.children,
    className = props.className,
    cx = props.cx,
    innerProps = props.innerProps,
    _props$selectProps3 = props.selectProps,
    chakraStyles = _props$selectProps3.chakraStyles,
    sizeProp = _props$selectProps3.size;

  /**
   * The chakra UI global placeholder color
   *
   * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/theme/src/styles.ts#L13}
   */
  var color = useColorModeValue("gray.400", "whiteAlpha.400");
  var size = useSize(sizeProp);
  var verticalPaddings = {
    sm: "6px",
    md: "8px",
    lg: "10px"
  };
  var initialSx = {
    color: color,
    textAlign: "center",
    paddingY: verticalPaddings[size],
    fontSize: size
  };
  var sx = chakraStyles != null && chakraStyles.noOptionsMessage ? chakraStyles.noOptionsMessage(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Box, _extends({}, innerProps, {
    className: cx({
      "menu-notice": true,
      "menu-notice--no-options": true
    }, className),
    sx: sx
  }), children);
};
export var Group = function Group(props) {
  var children = props.children,
    className = props.className,
    cx = props.cx,
    theme = props.theme,
    getStyles = props.getStyles,
    Heading = props.Heading,
    headingProps = props.headingProps,
    label = props.label,
    selectProps = props.selectProps,
    innerProps = props.innerProps,
    getClassNames = props.getClassNames;
  var chakraStyles = selectProps.chakraStyles;
  var sx = chakraStyles != null && chakraStyles.group ? chakraStyles.group({}, props) : {};
  return /*#__PURE__*/React.createElement(Box, _extends({}, innerProps, {
    className: cx({
      group: true
    }, className),
    sx: sx
  }), /*#__PURE__*/React.createElement(Heading, _extends({}, headingProps, {
    selectProps: selectProps,
    cx: cx,
    theme: theme,
    getStyles: getStyles,
    getClassNames: getClassNames
  }), label), /*#__PURE__*/React.createElement(Box, null, children));
};
export var GroupHeading = function GroupHeading(props) {
  var cx = props.cx,
    className = props.className,
    children = props.children,
    _props$selectProps4 = props.selectProps,
    chakraStyles = _props$selectProps4.chakraStyles,
    sizeProp = _props$selectProps4.size,
    hasStickyGroupHeaders = _props$selectProps4.hasStickyGroupHeaders;
  var menuStyles = useMultiStyleConfig("Menu");
  var size = useSize(sizeProp);
  var fontSizes = {
    sm: "xs",
    md: "sm",
    lg: "md"
  };
  var paddings = {
    sm: "0.4rem 0.8rem",
    md: "0.5rem 1rem",
    lg: "0.6rem 1.2rem"
  };
  var initialSx = _extends({}, menuStyles.groupTitle, {
    fontSize: fontSizes[size],
    padding: paddings[size],
    margin: 0,
    borderBottomWidth: hasStickyGroupHeaders ? "1px" : 0,
    position: hasStickyGroupHeaders ? "sticky" : "static",
    top: -2,
    bg: menuStyles.list.bg,
    zIndex: 1
  });
  var sx = chakraStyles != null && chakraStyles.groupHeading ? chakraStyles.groupHeading(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Box, {
    className: cx({
      "group-heading": true
    }, className),
    sx: sx
  }, children);
};

/**
 * The `CheckIcon` component from the Chakra UI Menu
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/menu/src/menu.tsx#L314}
 */
var CheckIcon = function CheckIcon(props) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    viewBox: "0 0 14 14",
    w: "1em",
    h: "1em"
  }, props), /*#__PURE__*/React.createElement("polygon", {
    fill: "currentColor",
    points: "5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
  }));
};
export var Option = function Option(props) {
  var className = props.className,
    cx = props.cx,
    innerRef = props.innerRef,
    innerProps = props.innerProps,
    children = props.children,
    isFocused = props.isFocused,
    isDisabled = props.isDisabled,
    isSelected = props.isSelected,
    _props$selectProps5 = props.selectProps,
    chakraStyles = _props$selectProps5.chakraStyles,
    sizeProp = _props$selectProps5.size,
    isMulti = _props$selectProps5.isMulti,
    hideSelectedOptions = _props$selectProps5.hideSelectedOptions,
    selectedOptionStyle = _props$selectProps5.selectedOptionStyle,
    selectedOptionColorScheme = _props$selectProps5.selectedOptionColorScheme;
  var size = useSize(sizeProp);
  var menuItemStyles = useMultiStyleConfig("Menu").item;
  var paddings = {
    sm: "0.3rem 0.6rem",
    md: "0.4rem 0.8rem",
    lg: "0.5rem 1rem"
  };

  /**
   * Use the same selected color as the border of the select component
   *
   * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/theme/src/components/input.ts#L73}
   */
  var selectedBg = useColorModeValue(selectedOptionColorScheme + ".500", selectedOptionColorScheme + ".300");
  var selectedColor = useColorModeValue("white", "black");

  // Don't create exta space for the checkmark if using a multi select with
  // options that dissapear when they're selected
  var showCheckIcon = selectedOptionStyle === "check" && (!isMulti || hideSelectedOptions === false);
  var shouldHighlight = selectedOptionStyle === "color" && isSelected;
  var initialSx = _extends({}, menuItemStyles, {
    display: "flex",
    alignItems: "center",
    width: "100%",
    textAlign: "start",
    fontSize: size,
    padding: paddings[size]
  }, isFocused && menuItemStyles._focus, shouldHighlight && {
    bg: selectedBg,
    color: selectedColor,
    _active: {
      bg: selectedBg
    }
  }, isDisabled && menuItemStyles._disabled, isDisabled && {
    _active: {}
  });
  var sx = chakraStyles != null && chakraStyles.option ? chakraStyles.option(initialSx, props) : initialSx;
  return /*#__PURE__*/React.createElement(Box, _extends({}, innerProps, {
    role: "button",
    className: cx({
      option: true,
      "option--is-disabled": isDisabled,
      "option--is-focused": isFocused,
      "option--is-selected": isSelected
    }, className),
    sx: sx,
    ref: innerRef,
    "data-disabled": isDisabled ? true : undefined,
    "aria-disabled": isDisabled ? true : undefined
  }), showCheckIcon && /*#__PURE__*/React.createElement(MenuIcon, {
    fontSize: "0.8em",
    marginEnd: "0.75rem",
    opacity: isSelected ? 1 : 0
  }, /*#__PURE__*/React.createElement(CheckIcon, null)), children);
};
//# sourceMappingURL=menu.js.map