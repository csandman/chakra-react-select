"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _formControl = require("@chakra-ui/form-control");
var _react = require("@chakra-ui/react");
var _chakraComponents = _interopRequireDefault(require("./chakra-components"));
var _excluded = ["components", "theme", "size", "colorScheme", "isDisabled", "isInvalid", "isReadOnly", "isRequired", "inputId", "tagVariant", "selectedOptionStyle", "selectedOptionColorScheme", "selectedOptionColor", "variant", "focusBorderColor", "errorBorderColor", "chakraStyles", "onFocus", "onBlur", "menuIsOpen"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var useChakraSelectProps = function useChakraSelectProps(_ref) {
  var _props$ariaInvalid;
  var _ref$components = _ref.components,
    components = _ref$components === void 0 ? {} : _ref$components,
    theme = _ref.theme,
    size = _ref.size,
    _ref$colorScheme = _ref.colorScheme,
    colorScheme = _ref$colorScheme === void 0 ? "gray" : _ref$colorScheme,
    isDisabled = _ref.isDisabled,
    isInvalid = _ref.isInvalid,
    isReadOnly = _ref.isReadOnly,
    isRequired = _ref.isRequired,
    inputId = _ref.inputId,
    tagVariant = _ref.tagVariant,
    _ref$selectedOptionSt = _ref.selectedOptionStyle,
    selectedOptionStyle = _ref$selectedOptionSt === void 0 ? "color" : _ref$selectedOptionSt,
    selectedOptionColorScheme = _ref.selectedOptionColorScheme,
    selectedOptionColor = _ref.selectedOptionColor,
    variant = _ref.variant,
    focusBorderColor = _ref.focusBorderColor,
    errorBorderColor = _ref.errorBorderColor,
    _ref$chakraStyles = _ref.chakraStyles,
    chakraStyles = _ref$chakraStyles === void 0 ? {} : _ref$chakraStyles,
    onFocus = _ref.onFocus,
    onBlur = _ref.onBlur,
    menuIsOpen = _ref.menuIsOpen,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var chakraTheme = (0, _react.useTheme)();
  var defaultVariant = chakraTheme.components.Input.defaultProps.variant;

  // Combine the props passed into the component with the props that can be set
  // on a surrounding form control to get the values of `isDisabled` and
  // `isInvalid`
  var inputProps = (0, _formControl.useFormControl)({
    id: inputId,
    isDisabled: isDisabled,
    isInvalid: isInvalid,
    isRequired: isRequired,
    isReadOnly: isReadOnly,
    onFocus: onFocus,
    onBlur: onBlur
  });

  // Unless `menuIsOpen` is controlled, disable it if the select is readonly
  var realMenuIsOpen = menuIsOpen != null ? menuIsOpen : inputProps.readOnly ? false : undefined;

  // Ensure that the selected option style is either `color` or `check`
  var realSelectedOptionStyle = selectedOptionStyle;
  var selectedOptionStyleOptions = ["color", "check"];
  if (!selectedOptionStyleOptions.includes(selectedOptionStyle)) {
    realSelectedOptionStyle = "color";
  }

  // Ensure that the color used for the selected options is a string
  var realSelectedOptionColorScheme = selectedOptionColorScheme || selectedOptionColor || "blue";
  if (typeof realSelectedOptionColorScheme !== "string") {
    realSelectedOptionColorScheme = "blue";
  }
  var select = _extends({
    // Allow overriding of custom components
    components: _extends({}, _chakraComponents["default"], components),
    // Custom select props
    colorScheme: colorScheme,
    size: size,
    tagVariant: tagVariant,
    selectedOptionStyle: realSelectedOptionStyle,
    selectedOptionColorScheme: realSelectedOptionColorScheme,
    variant: variant != null ? variant : defaultVariant,
    chakraStyles: chakraStyles,
    focusBorderColor: focusBorderColor,
    errorBorderColor: errorBorderColor,
    // Extract custom props from form control
    onFocus: inputProps.onFocus,
    onBlur: inputProps.onBlur,
    isDisabled: inputProps.disabled,
    isInvalid: !!inputProps["aria-invalid"],
    inputId: inputProps.id,
    isReadOnly: inputProps.readOnly,
    menuIsOpen: realMenuIsOpen
  }, props, {
    // aria-invalid can be passed to react-select, so we allow that to
    // override the `isInvalid` prop
    "aria-invalid": (_props$ariaInvalid = props["aria-invalid"]) != null ? _props$ariaInvalid : inputProps["aria-invalid"]
  });
  return select;
};
var _default = useChakraSelectProps;
exports["default"] = _default;
//# sourceMappingURL=use-chakra-select-props.js.map