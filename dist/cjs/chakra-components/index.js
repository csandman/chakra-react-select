"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _containers = require("./containers");
var _control = _interopRequireWildcard(require("./control"));
var _input = _interopRequireDefault(require("./input"));
var _menu = _interopRequireWildcard(require("./menu"));
var _multiValue = _interopRequireWildcard(require("./multi-value"));
var _placeholder = _interopRequireDefault(require("./placeholder"));
var _singleValue = _interopRequireDefault(require("./single-value"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var chakraComponents = {
  ClearIndicator: _control.ClearIndicator,
  Control: _control["default"],
  DropdownIndicator: _control.DropdownIndicator,
  Group: _menu.Group,
  GroupHeading: _menu.GroupHeading,
  IndicatorSeparator: _control.IndicatorSeparator,
  IndicatorsContainer: _containers.IndicatorsContainer,
  Input: _input["default"],
  LoadingIndicator: _control.LoadingIndicator,
  LoadingMessage: _menu.LoadingMessage,
  Menu: _menu["default"],
  MenuList: _menu.MenuList,
  MultiValue: _multiValue["default"],
  MultiValueContainer: _multiValue.MultiValueContainer,
  MultiValueLabel: _multiValue.MultiValueLabel,
  MultiValueRemove: _multiValue.MultiValueRemove,
  NoOptionsMessage: _menu.NoOptionsMessage,
  Option: _menu.Option,
  Placeholder: _placeholder["default"],
  SelectContainer: _containers.SelectContainer,
  SingleValue: _singleValue["default"],
  ValueContainer: _containers.ValueContainer
};
var _default = chakraComponents;
exports["default"] = _default;
//# sourceMappingURL=index.js.map