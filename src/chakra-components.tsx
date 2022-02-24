import type { ReactElement } from "react";
import React from "react";
import { Icon as ChakraIcon, IconProps } from "@chakra-ui/icon";
import { Box, BoxProps, Divider } from "@chakra-ui/layout";
import { MenuIcon } from "@chakra-ui/menu";
import { Spinner } from "@chakra-ui/spinner";
import {
  PropsOf,
  StylesProvider,
  SystemStyleObject,
  chakra,
  forwardRef,
  useColorModeValue,
  useMultiStyleConfig,
  useStyleConfig,
  useStyles,
  useTheme,
} from "@chakra-ui/system";
import type {
  ClearIndicatorProps,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  GroupHeadingProps,
  GroupProps,
  IndicatorSeparatorProps,
  IndicatorsContainerProps,
  InputProps,
  LoadingIndicatorProps,
  MenuListProps,
  MenuProps,
  MultiValueGenericProps,
  MultiValueProps,
  MultiValueRemoveProps,
  NoticeProps,
  OptionProps,
  PlaceholderProps,
  SingleValueProps,
  ValueContainerProps,
} from "react-select";
import { CaretDownIcon, CaretUpIcon, CloseIcon } from "./icons";
import type { OptionBase, Size, SizeProps, ThemeObject } from "./types";
import { cleanCommonProps } from "./utils";

const SelectContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ContainerProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    children,
    className,
    cx,
    innerProps,
    isDisabled,
    isRtl,
    selectProps: { chakraStyles },
  } = props;

  const initialStyles: SystemStyleObject = {
    position: "relative",
    direction: isRtl ? "rtl" : undefined,
    // When disabled, react-select sets the pointer-state to none which prevents
    // the `not-allowed` cursor style from chakra from getting applied to the
    // Control when it is disabled
    pointerEvents: "auto",
  };

  const sx: SystemStyleObject = chakraStyles?.container
    ? chakraStyles.container(initialStyles, props)
    : initialStyles;

  return (
    <Box
      className={cx(
        {
          "--is-disabled": isDisabled,
          "--is-rtl": isRtl,
        },
        className
      )}
      sx={sx}
      {...innerProps}
    >
      {children}
    </Box>
  );
};

const ValueContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ValueContainerProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    children,
    className,
    cx,
    isMulti,
    hasValue,
    selectProps: { size, chakraStyles },
  } = props;

  const px: SizeProps = {
    sm: 0.5,
    md: 1,
    lg: 1,
  };

  const initialStyles: SystemStyleObject = {
    d: "flex",
    alignItems: "center",
    flex: 1,
    p: `0.125rem ${px[size as Size]}`,
    flexWrap: "wrap",
    WebkitOverflowScrolling: "touch",
    position: "relative",
    overflow: "hidden",
  };

  const sx: SystemStyleObject = chakraStyles?.valueContainer
    ? chakraStyles.valueContainer(initialStyles, props)
    : initialStyles;

  return (
    <Box
      className={cx(
        {
          "value-container": true,
          "value-container--is-multi": isMulti,
          "value-container--has-value": hasValue,
        },
        className
      )}
      sx={sx}
    >
      {children}
    </Box>
  );
};

const IndicatorsContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: IndicatorsContainerProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    children,
    className,
    cx,
    selectProps: { chakraStyles },
  } = props;

  const initialStyles: SystemStyleObject = {
    d: "flex",
    alignItems: "center",
    alignSelf: "stretch",
    flexShrink: 0,
  };

  const sx: SystemStyleObject = chakraStyles?.indicatorsContainer
    ? chakraStyles.indicatorsContainer(initialStyles, props)
    : initialStyles;

  return (
    <Box
      className={cx(
        {
          indicators: true,
        },
        className
      )}
      sx={sx}
    >
      {children}
    </Box>
  );
};

const Control = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ControlProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    className,
    cx,
    children,
    innerRef,
    innerProps,
    isDisabled,
    isFocused,
    menuIsOpen,
    selectProps: {
      size,
      isInvalid,
      chakraStyles,
      focusBorderColor,
      errorBorderColor,
    },
  } = props;

  const inputStyles = useMultiStyleConfig("Input", {
    focusBorderColor,
    errorBorderColor,
    size,
  });

  const heights: SizeProps = {
    sm: 8,
    md: 10,
    lg: 12,
  };

  const initialStyles: SystemStyleObject = {
    ...inputStyles.field,
    d: "flex",
    p: 0,
    overflow: "hidden",
    h: "auto",
    minH: heights[size as Size],
  };

  const sx: SystemStyleObject = chakraStyles?.control
    ? chakraStyles.control(initialStyles, props)
    : initialStyles;

  return (
    <StylesProvider value={inputStyles}>
      <Box
        className={cx(
          {
            control: true,
            "control--is-disabled": isDisabled,
            "control--is-focused": isFocused,
            "control--menu-is-open": menuIsOpen,
          },
          className
        )}
        ref={innerRef}
        sx={sx}
        {...innerProps}
        data-disabled={isDisabled ? true : undefined}
        data-focus={isFocused ? true : undefined}
        data-invalid={isInvalid ? true : undefined}
      >
        {children}
      </Box>
    </StylesProvider>
  );
};

const Placeholder = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: PlaceholderProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { placeholderColor, chakraStyles },
  } = props;

  const initialStyles: SystemStyleObject = {
    color: placeholderColor,
    mx: "0.125rem",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    userSelect: "none",
  };

  const sx: SystemStyleObject = chakraStyles?.placeholder
    ? chakraStyles.placeholder(initialStyles, props)
    : initialStyles;

  return (
    <Box
      className={cx(
        {
          placeholder: true,
        },
        className
      )}
      sx={sx}
      {...innerProps}
    >
      {children}
    </Box>
  );
};

// Multi Value
const MultiValue = <
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MultiValueProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    children,
    className,
    components,
    cx,
    data,
    innerProps,
    isDisabled,
    isFocused,
    removeProps,
    selectProps,
  } = props;

  const { Container, Label, Remove } = components;

  const { chakraStyles, colorScheme, tagVariant, size } = selectProps;

  const { container, closeButton, label } = useMultiStyleConfig("Tag", {
    size,
    colorScheme: data.colorScheme || colorScheme,
    variant: data.variant || tagVariant || (data.isFixed ? "solid" : "subtle"),
  });

  const containerInitialStyles: SystemStyleObject = {
    display: "inline-flex",
    verticalAlign: "top",
    alignItems: "center",
    maxWidth: "100%",
    ...container,
    m: "0.125rem",
  };
  const containerSx: SystemStyleObject = chakraStyles?.multiValue
    ? chakraStyles.multiValue(containerInitialStyles, props)
    : containerInitialStyles;

  const labelSx: SystemStyleObject = chakraStyles?.multiValueLabel
    ? chakraStyles.multiValueLabel(label, props)
    : label;

  const removeInitialStyles: SystemStyleObject = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...closeButton,
  };
  const removeSx: SystemStyleObject = chakraStyles?.multiValueRemove
    ? chakraStyles.multiValueRemove(removeInitialStyles, props)
    : removeInitialStyles;

  return (
    <Container
      data={data}
      innerProps={{
        className: cx(
          {
            "multi-value": true,
            "multi-value--is-disabled": isDisabled,
          },
          className
        ),
        ...innerProps,
      }}
      selectProps={selectProps}
      sx={containerSx}
    >
      <Label
        data={data}
        innerProps={{
          className: cx(
            {
              "multi-value__label": true,
            },
            className
          ),
        }}
        selectProps={selectProps}
        sx={labelSx}
      >
        {children}
      </Label>
      <Remove
        data={data}
        innerProps={{
          className: cx(
            {
              "multi-value__remove": true,
            },
            className
          ),
          "aria-label": `Remove ${children || "option"}`,
          ...removeProps,
        }}
        isFocused={isFocused}
        selectProps={selectProps}
        sx={removeSx}
      />
    </Container>
  );
};

const MultiValueContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MultiValueGenericProps<Option, IsMulti, Group>
): ReactElement => {
  const { children, innerProps, sx } = props;

  return (
    <chakra.span {...innerProps} sx={sx}>
      {children}
    </chakra.span>
  );
};

const MultiValueLabel = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MultiValueGenericProps<Option, IsMulti, Group>
): ReactElement => {
  const { children, innerProps, sx } = props;

  return (
    <chakra.span {...innerProps} sx={sx}>
      {children}
    </chakra.span>
  );
};

// https://github.com/chakra-ui/chakra-ui/blob/main/packages/tag/src/tag.tsx#L75
const TagCloseIcon: React.FC<IconProps> = (props) => (
  <ChakraIcon verticalAlign="inherit" viewBox="0 0 512 512" {...props}>
    <path
      d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
      fill="currentColor"
    />
  </ChakraIcon>
);

const MultiValueRemove = <
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MultiValueRemoveProps<Option, IsMulti, Group>
): ReactElement | null => {
  const { children, innerProps, isFocused, data, sx } = props;

  if (data.isFixed) {
    return null;
  }

  return (
    <Box
      {...innerProps}
      data-focus={isFocused ? true : undefined}
      role="button"
      sx={sx}
    >
      {children || <TagCloseIcon />}
    </Box>
  );
};

// Single Value
const SingleValue = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: SingleValueProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    children,
    className,
    cx,
    isDisabled,
    innerProps,
    selectProps: { chakraStyles },
  } = props;

  const initialStyles: SystemStyleObject = {
    label: "singleValue",
    mx: "0.125rem",
    maxWidth: "calc(100% - 0.5rem)",
    overflow: "hidden",
    position: "absolute",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const sx: SystemStyleObject = chakraStyles?.singleValue
    ? chakraStyles.singleValue(initialStyles, props)
    : initialStyles;

  return (
    <Box
      className={cx(
        {
          "single-value": true,
          "single-value--is-disabled": isDisabled,
        },
        className
      )}
      sx={sx}
      {...innerProps}
    >
      {children}
    </Box>
  );
};

// Indicators
const IndicatorSeparator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: IndicatorSeparatorProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    className,
    cx,
    selectProps: { chakraStyles },
  } = props;

  const initialStyles: SystemStyleObject = {
    opacity: 1,
    display: "none",
  };

  const sx: SystemStyleObject = chakraStyles?.indicatorSeparator
    ? chakraStyles.indicatorSeparator(initialStyles, props)
    : initialStyles;

  return (
    <Divider
      className={cx({ "indicator-separator": true }, className)}
      orientation="vertical"
      sx={sx}
    />
  );
};

const ClearIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ClearIndicatorProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    children,
    className,
    cx,
    innerProps,
    isFocused,
    selectProps: { size, chakraStyles },
  } = props;

  const closeButtonStyles = useStyleConfig("CloseButton", {
    size: size as undefined,
  });

  const initialStyles: SystemStyleObject = {
    ...closeButtonStyles,
    mx: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "pointer",
  };

  const sx: SystemStyleObject = chakraStyles?.clearIndicator
    ? chakraStyles.clearIndicator(initialStyles, props)
    : initialStyles;

  return (
    <Box
      aria-label="Clear selected options"
      className={cx(
        {
          indicator: true,
          "clear-indicator": true,
        },
        className
      )}
      data-focused={isFocused ? true : undefined}
      role="button"
      sx={sx}
      {...innerProps}
    >
      {children || <CloseIcon height="1em" width="1em" />}
    </Box>
  );
};

const DropdownIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { menuIsOpen, size, chakraStyles },
  } = props;

  const { addon } = useStyles();

  const iconSizes: SizeProps = {
    sm: 4,
    md: 5,
    lg: 6,
  };
  const iconSize = iconSizes[size as Size];
  const Icon = menuIsOpen ? CaretUpIcon : CaretDownIcon;

  const initialStyles: SystemStyleObject = {
    ...addon,
    d: "flex",
    alignItems: "center",
    justifyContent: "center",
    h: "100%",
    borderRadius: 0,
    borderWidth: 0,
    cursor: "pointer",
    bg: "transparent",
    px: 2,
    color: "fluidBlue",
  };

  const sx: SystemStyleObject = chakraStyles?.dropdownIndicator
    ? chakraStyles.dropdownIndicator(initialStyles, props)
    : initialStyles;
  return (
    <Box
      {...innerProps}
      className={cx(
        {
          indicator: true,
          "dropdown-indicator": true,
        },
        className
      )}
      sx={sx}
    >
      {children || <Icon h={iconSize} w={iconSize} />}
    </Box>
  );
};

const LoadingIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: LoadingIndicatorProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    className,
    cx,
    innerProps,
    selectProps: { size, chakraStyles },
  } = props;

  const spinnerSizes: SizeProps = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  const spinnerSize = spinnerSizes[size as Size];

  const initialStyles: SystemStyleObject = { mr: 3, color: "fluidBlue" };

  const sx: SystemStyleObject = chakraStyles?.loadingIndicator
    ? chakraStyles.loadingIndicator(initialStyles, props)
    : initialStyles;

  return (
    <Spinner
      className={cx(
        {
          indicator: true,
          "loading-indicator": true,
        },
        className
      )}
      sx={sx}
      {...innerProps}
      size={spinnerSize as Size}
    />
  );
};

// Menu components
const Menu = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: MenuProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    className,
    cx,
    children,
    innerProps,
    innerRef,
    placement,
    selectProps: { chakraStyles },
  } = props;

  const menuStyles = useMultiStyleConfig("Menu", {});

  const initialStyles: SystemStyleObject = {
    position: "absolute",
    ...(placement === "bottom" && { top: "100%" }),
    ...(placement === "top" && { bottom: "100%" }),
    my: "8px",
    w: "100%",
    zIndex: 1,
    overflow: "hidden",
  };

  const sx: SystemStyleObject = chakraStyles?.menu
    ? chakraStyles.menu(initialStyles, props)
    : initialStyles;

  return (
    <Box
      className={cx({ menu: true }, className)}
      ref={innerRef}
      sx={sx}
      {...innerProps}
    >
      <StylesProvider value={menuStyles}>{children}</StylesProvider>
    </Box>
  );
};

const MenuList = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MenuListProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    className,
    cx,
    innerRef,
    children,
    maxHeight,
    isMulti,
    selectProps: { size, chakraStyles },
  } = props;

  const { list } = useStyles();

  const borderRadii: SizeProps = useTheme().radii;

  const initialStyles: SystemStyleObject = {
    ...list,
    maxH: `${maxHeight}px`,
    overflowY: "auto",
    borderRadius: borderRadii[size as Size],
  };

  const sx: SystemStyleObject = chakraStyles?.menuList
    ? chakraStyles.menuList(initialStyles, props)
    : initialStyles;

  return (
    <Box
      className={cx(
        {
          "menu-list": true,
          "menu-list--is-multi": isMulti,
        },
        className
      )}
      ref={innerRef}
      sx={sx}
    >
      {children}
    </Box>
  );
};

const Group = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: GroupProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    children,
    className,
    cx,
    theme,
    getStyles,
    Heading,
    headingProps,
    label,
    selectProps,
  } = props;

  const { chakraStyles } = selectProps;

  const sx: SystemStyleObject = chakraStyles?.group
    ? chakraStyles.group({}, props)
    : {};

  return (
    <Box className={cx({ group: true }, className)} sx={sx}>
      <Heading
        {...headingProps}
        cx={cx}
        getStyles={getStyles}
        selectProps={selectProps}
        theme={theme}
      >
        {label}
      </Heading>
      <Box>{children}</Box>
    </Box>
  );
};

const GroupHeading = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: GroupHeadingProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    cx,
    className,
    children,
    selectProps: { size, hasStickyGroupHeaders, chakraStyles },
  } = props;

  const {
    groupTitle,
    list: { bg },
  } = useStyles();

  const chakraTheme = useTheme();
  const fontSizes: SizeProps = {
    sm: chakraTheme.fontSizes.xs,
    md: chakraTheme.fontSizes.sm,
    lg: chakraTheme.fontSizes.md,
  };
  const paddings: SizeProps = {
    sm: "0.4rem 0.8rem",
    md: "0.5rem 1rem",
    lg: "0.6rem 1.2rem",
  };

  const initialStyles: SystemStyleObject = {
    ...groupTitle,
    fontSize: fontSizes[size as Size],
    p: paddings[size as Size],
    m: 0,
    borderBottomWidth: hasStickyGroupHeaders ? "1px" : 0,
    position: hasStickyGroupHeaders ? "sticky" : "static",
    top: -2,
    bg,
  };

  const sx: SystemStyleObject = chakraStyles?.groupHeading
    ? chakraStyles.groupHeading(initialStyles, props)
    : initialStyles;

  return (
    <Box className={cx({ "group-heading": true }, className)} sx={sx}>
      {children}
    </Box>
  );
};

// Use the CheckIcon component from the chakra menu
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/menu/src/menu.tsx#L301
const CheckIcon: React.FC<PropsOf<"svg">> = (props) => (
  <svg height="1em" viewBox="0 0 14 14" width="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </svg>
);

type OptionDivProps = BoxProps & { isDisabled?: boolean };
const OptionDiv = forwardRef<OptionDivProps, "div">((props, ref) => (
  <Box ref={ref} {...props} />
));

const Option = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    className,
    cx,
    innerRef,
    innerProps,
    children,
    isFocused,
    isDisabled,
    isSelected,
    selectProps: {
      size,
      isMulti,
      hideSelectedOptions,
      selectedOptionStyle,
      selectedOptionColor,
      chakraStyles,
    },
  } = props;

  const itemStyles = useStyles().item as ThemeObject;

  const paddings: SizeProps = {
    sm: "0.3rem 0.6rem",
    md: "0.4rem 0.8rem",
    lg: "0.5rem 1rem",
  };

  // Use the same selected color as the border of the select component
  // https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/input.ts#L73
  const selectedBg = useColorModeValue(
    `${selectedOptionColor}.500`,
    `${selectedOptionColor}.300`
  );
  const selectedColor = useColorModeValue("white", "black");

  // Don't create extra space for the checkmark if using a multi select with
  // options that dissapear when they're selected
  const showCheckIcon: boolean =
    selectedOptionStyle === "check" &&
    (!isMulti || hideSelectedOptions === false);

  const shouldHighlight: boolean =
    selectedOptionStyle === "color" && isSelected;

  const initialStyles: SystemStyleObject = {
    ...itemStyles,
    d: "flex",
    alignItems: "center",
    w: "100%",
    textAlign: "start",
    fontSize: size,
    p: paddings[size as Size],
    bg: isFocused ? itemStyles._focus?.bg : "transparent",
    ...(shouldHighlight && {
      bg: selectedBg,
      color: selectedColor,
      _active: { bg: selectedBg },
    }),
    ...(isDisabled && itemStyles._disabled),
    ...(isDisabled && { _active: {} }),
    "> .chakra-icon ": {
      color: isSelected ? "inherit" : "fluidBlue",
    },
  };

  const sx: SystemStyleObject = chakraStyles?.option
    ? chakraStyles.option(initialStyles, props)
    : initialStyles;

  return (
    <OptionDiv
      className={cx(
        {
          option: true,
          "option--is-disabled": isDisabled,
          "option--is-focused": isFocused,
          "option--is-selected": isSelected,
        },
        className
      )}
      ref={innerRef}
      role="button"
      sx={sx}
      {...innerProps}
      isDisabled={!!isDisabled || undefined}
    >
      {showCheckIcon && (
        <MenuIcon
          color="inherit"
          fontSize="0.8em"
          marginEnd="0.75rem"
          opacity={isSelected ? 1 : 0}
        >
          <CheckIcon />
        </MenuIcon>
      )}
      {children}
    </OptionDiv>
  );
};

// Messages
const LoadingMessage = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: NoticeProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { size, placeholderColor, chakraStyles },
  } = props;

  const fontSizes: SizeProps = {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
  };

  const paddings: SizeProps = {
    sm: "6px 9px",
    md: "8px 12px",
    lg: "10px 15px",
  };

  const initialStyles: SystemStyleObject = {
    color: placeholderColor,
    textAlign: "center",
    p: paddings[size as Size],
    fontSize: fontSizes[size as Size],
  };

  const sx: SystemStyleObject = chakraStyles?.loadingMessage
    ? chakraStyles.loadingMessage(initialStyles, props)
    : initialStyles;

  return (
    <Box
      className={cx(
        {
          "menu-notice": true,
          "menu-notice--loading": true,
        },
        className
      )}
      sx={sx}
      {...innerProps}
    >
      {children}
    </Box>
  );
};

const NoOptionsMessage = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: NoticeProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { size, placeholderColor, chakraStyles },
  } = props;

  const fontSizes: SizeProps = {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
  };

  const paddings: SizeProps = {
    sm: "6px 9px",
    md: "8px 12px",
    lg: "10px 15px",
  };

  const initialStyles: SystemStyleObject = {
    color: placeholderColor,
    textAlign: "center",
    p: paddings[size as Size],
    fontSize: fontSizes[size as Size],
  };

  const sx: SystemStyleObject = chakraStyles?.noOptionsMessage
    ? chakraStyles.noOptionsMessage(initialStyles, props)
    : initialStyles;

  return (
    <Box
      className={cx(
        {
          "menu-notice": true,
          "menu-notice--no-options": true,
        },
        className
      )}
      sx={sx}
      {...innerProps}
    >
      {children}
    </Box>
  );
};

const Input = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: InputProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    className,
    cx,
    value,
    selectProps: { chakraStyles },
  } = props;
  const { innerRef, isDisabled, isHidden, inputClassName, ...innerProps } =
    cleanCommonProps(props);

  const spacingStyle: SystemStyleObject = {
    gridArea: "1 / 2",
    font: "inherit",
    minW: "2px",
    border: 0,
    m: 0,
    outline: 0,
  };

  const initialContainerStyles: SystemStyleObject = {
    flex: "1 1 auto",
    display: "inline-grid",
    gridArea: "1 / 1 / 2 / 3",
    gridTemplateColumns: "0 min-content",
    color: "inherit",
    _after: {
      content: 'attr(data-value) " "',
      visibility: "hidden",
      whiteSpace: "pre",
      p: 0,
      ...spacingStyle,
    },
  };

  const containerStyles = chakraStyles?.inputContainer
    ? chakraStyles.inputContainer(initialContainerStyles, props)
    : initialContainerStyles;

  const initialInputStyles = {
    label: "input",
    color: "inherit",
    bg: 0,
    opacity: isHidden ? 0 : 1,
    w: "100%",
    py: "0.125rem",
    ...spacingStyle,
  };

  const inputStyles = chakraStyles?.input
    ? chakraStyles.input(initialInputStyles, props)
    : initialInputStyles;

  return (
    <Box
      className={cx({ "input-container": true }, className)}
      data-value={value || ""}
      sx={containerStyles}
    >
      <chakra.input
        className={cx({ input: true }, inputClassName)}
        disabled={isDisabled}
        ref={innerRef}
        sx={inputStyles}
        {...innerProps}
      />
    </Box>
  );
};

const chakraComponents = {
  ClearIndicator,
  Control,
  DropdownIndicator,
  Group,
  GroupHeading,
  IndicatorSeparator,
  IndicatorsContainer,
  Input,
  LoadingIndicator,
  LoadingMessage,
  Menu,
  MenuList,
  MultiValue,
  MultiValueContainer,
  MultiValueLabel,
  MultiValueRemove,
  NoOptionsMessage,
  Option,
  Placeholder,
  SelectContainer,
  SingleValue,
  ValueContainer,
};

export default chakraComponents;
