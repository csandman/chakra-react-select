/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import {
  Tag,
  TagCloseButton,
  TagLabel,
  Divider,
  CloseButton,
  Box,
  MenuIcon,
  Spinner,
  PropsOf,
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
  useTheme,
  useColorModeValue,
  createIcon,
  chakra,
} from "@chakra-ui/react";
import { components as selectComponents } from "react-select";
import {
  ChakraSelectProps,
  Size,
  RecursiveCSSObject,
  SxProps,
  SizeProps,
} from "./types";

// Taken from the @chakra-ui/icons package to prevent needing it as a dependency
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/icons/src/ChevronDown.tsx
const ChevronDown = createIcon({
  displayName: "ChevronDownIcon",
  d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",
});

// Use the CheckIcon component from the chakra menu
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/menu/src/menu.tsx#L301
const CheckIcon: React.FC<PropsOf<"svg">> = (props) => (
  <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </svg>
);

const chakraComponents: ChakraSelectProps["components"] = {
  SelectContainer: (props) => {
    const {
      children,
      className,
      cx,
      innerProps,
      isDisabled,
      isRtl,
      selectProps: { chakraStyles },
    } = props;

    const initialStyles = {
      position: "relative",
      direction: isRtl ? "rtl" : undefined,
      // When disabled, react-select sets the pointer-state to none which prevents
      // the `not-allowed` cursor style from chakra from getting applied to the
      // Control when it is disabled
      pointerEvents: "auto",
    };

    const sx = chakraStyles?.container
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
  },
  // Control components
  Control: (props) => {
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

    const initialStyles = {
      ...inputStyles.field,
      d: "flex",
      p: 0,
      overflow: "hidden",
      h: "auto",
      minH: heights[size as Size],
    };

    const sx = chakraStyles?.control
      ? chakraStyles.control(initialStyles, props)
      : initialStyles;

    return (
      <StylesProvider value={inputStyles}>
        <Box
          ref={innerRef}
          className={cx(
            {
              control: true,
              "control--is-disabled": isDisabled,
              "control--is-focused": isFocused,
              "control--menu-is-open": menuIsOpen,
            },
            className
          )}
          sx={sx}
          {...innerProps}
          data-focus={isFocused ? true : undefined}
          data-invalid={isInvalid ? true : undefined}
          data-disabled={isDisabled ? true : undefined}
        >
          {children}
        </Box>
      </StylesProvider>
    );
  },
  ValueContainer: (props) => {
    const {
      children,
      className,
      cx,
      isMulti,
      hasValue,
      selectProps: { size, chakraStyles },
    } = props;

    const px: SizeProps = {
      sm: "0.75rem",
      md: "1rem",
      lg: "1rem",
    };

    const initialStyles = {
      d: "flex",
      alignItems: "center",
      flex: 1,
      p: `0.125rem ${px[size as Size]}`,
      flexWrap: "wrap",
      WebkitOverflowScrolling: "touch",
      position: "relative",
      overflow: "hidden",
    };

    const sx = chakraStyles?.valueContainer
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
  },
  Placeholder: (props) => {
    const {
      children,
      className,
      cx,
      innerProps,
      selectProps: { placeholderColor, chakraStyles },
    } = props;

    const initialStyles = {
      color: placeholderColor,
      mx: "0.125rem",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    };

    const sx = chakraStyles?.placeholder
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
  },
  // Multi Value
  MultiValue: (props) => {
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

    const { chakraStyles } = selectProps;

    const containerInitialStyles = { m: "0.125rem" };
    const containerSx = chakraStyles?.multiValue
      ? chakraStyles.multiValue(containerInitialStyles, props)
      : containerInitialStyles;

    const labelSx = chakraStyles?.multiValueLabel
      ? chakraStyles.multiValueLabel({}, props)
      : {};

    const removeSx = chakraStyles?.multiValueRemove
      ? chakraStyles.multiValueRemove({}, props)
      : {};

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
          sx: containerSx,
          ...innerProps,
        }}
        selectProps={selectProps}
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
            sx: labelSx,
          }}
          selectProps={selectProps}
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
            sx: removeSx,
            ...removeProps,
          }}
          selectProps={selectProps}
          isFocused={isFocused}
        />
      </Container>
    );
  },
  MultiValueContainer: ({
    children,
    innerRef,
    innerProps,
    data,
    selectProps,
  }) => (
    <Tag
      ref={innerRef}
      {...innerProps}
      // react-select Fixed Options example:
      // https://react-select.com/home#fixed-options
      variant={
        data.variant ||
        selectProps.tagVariant ||
        (data.isFixed ? "solid" : "subtle")
      }
      colorScheme={data.colorScheme || selectProps.colorScheme}
      size={selectProps.size}
    >
      {children}
    </Tag>
  ),
  MultiValueLabel: ({ children, innerRef, innerProps }) => (
    <TagLabel ref={innerRef} {...innerProps}>
      {children}
    </TagLabel>
  ),
  MultiValueRemove: ({
    children,
    innerRef,
    innerProps,
    isFocused,
    data: { isFixed },
  }) => {
    if (isFixed) {
      return null;
    }

    return (
      <TagCloseButton
        ref={innerRef}
        {...innerProps}
        tabIndex={-1}
        data-focus={isFocused ? true : undefined}
      >
        {children}
      </TagCloseButton>
    );
  },
  // Single Value
  SingleValue: (props) => {
    const {
      children,
      className,
      cx,
      isDisabled,
      innerProps,
      selectProps: { chakraStyles },
    } = props;

    const initialStyles = {
      label: "singleValue",
      mx: "0.125rem",
      maxWidth: `calc(100% - 0.5rem)`,
      overflow: "hidden",
      position: "absolute",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      top: "50%",
      transform: "translateY(-50%)",
    };

    const sx = chakraStyles?.singleValue
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
  },
  // Indicators
  IndicatorsContainer: (props) => {
    const {
      children,
      className,
      cx,
      selectProps: { chakraStyles },
    } = props;

    const initialStyles = {
      d: "flex",
      alignItems: "center",
      alignSelf: "stretch",
      flexShrink: 0,
    };

    const sx = chakraStyles?.indicatorsContainer
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
  },
  IndicatorSeparator: (props) => {
    const {
      className,
      cx,
      innerProps,
      selectProps: { chakraStyles },
    } = props;

    const initialStyles = { opacity: 1 };

    const sx = chakraStyles?.indicatorSeparator
      ? chakraStyles.indicatorSeparator(initialStyles, props)
      : initialStyles;

    return (
      <Divider
        {...innerProps}
        className={cx({ "indicator-separator": true }, className)}
        sx={sx}
        orientation="vertical"
      />
    );
  },
  ClearIndicator: (props) => {
    const {
      className,
      cx,
      innerProps,
      selectProps: { size, chakraStyles },
    } = props;

    const initialStyles = { mx: 1 };

    const sx = chakraStyles?.clearIndicator
      ? chakraStyles.clearIndicator(initialStyles, props)
      : initialStyles;

    return (
      <CloseButton
        {...innerProps}
        className={cx(
          {
            indicator: true,
            "clear-indicator": true,
          },
          className
        )}
        size={size}
        sx={sx}
        tabIndex={-1}
      />
    );
  },
  DropdownIndicator: (props) => {
    const {
      className,
      cx,
      innerProps,
      selectProps: { size, chakraStyles },
    } = props;

    const { addon } = useStyles();

    const iconSizes: SizeProps = {
      sm: 4,
      md: 5,
      lg: 6,
    };
    const iconSize = iconSizes[size as Size];

    const initialStyles = {
      ...addon,
      d: "flex",
      alignItems: "center",
      justifyContent: "center",
      h: "100%",
      borderRadius: 0,
      borderWidth: 0,
      cursor: "pointer",
    };

    const sx = chakraStyles?.dropdownIndicator
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
        <ChevronDown h={iconSize} w={iconSize} />
      </Box>
    );
  },
  LoadingIndicator: (props) => {
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

    const initialStyles = { mr: 3 };

    const sx = chakraStyles?.loadingIndicator
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
        size={spinnerSize}
      />
    );
  },
  // Menu components
  Menu: (props) => {
    const {
      className,
      cx,
      children,
      innerProps,
      innerRef,
      // @ts-ignore `placement` is not recognized as a prop but it's essential
      // for the menu placement (and it is passed)
      placement,
      selectProps: { size, chakraStyles },
    } = props;

    const menuStyles = useMultiStyleConfig("Menu", {});

    const chakraTheme = useTheme();
    const borderRadii: SizeProps = {
      sm: chakraTheme.radii.sm,
      md: chakraTheme.radii.md,
      lg: chakraTheme.radii.md,
    };

    const initialStyles = {
      position: "absolute",
      ...(placement === "bottom" && { top: "100%" }),
      ...(placement === "top" && { bottom: "100%" }),
      my: "8px",
      w: "100%",
      zIndex: 1,
      overflow: "hidden",
      rounded: borderRadii[size as Size],
    };

    const sx = chakraStyles?.menu
      ? chakraStyles.menu(initialStyles, props)
      : initialStyles;

    return (
      <Box
        ref={innerRef}
        className={cx({ menu: true }, className)}
        sx={sx}
        {...innerProps}
      >
        <StylesProvider value={menuStyles}>{children}</StylesProvider>
      </Box>
    );
  },
  MenuList: (props) => {
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

    const chakraTheme = useTheme();
    const borderRadii: SizeProps = {
      sm: chakraTheme.radii.sm,
      md: chakraTheme.radii.md,
      lg: chakraTheme.radii.md,
    };

    const initialStyles = {
      ...list,
      maxH: `${maxHeight}px`,
      overflowY: "auto",
      borderRadius: borderRadii[size as Size],
    };

    const sx = chakraStyles?.menuList
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
        sx={sx}
        ref={innerRef}
      >
        {children}
      </Box>
    );
  },
  Group: (props) => {
    const {
      children,
      className,
      cx,
      Heading,
      headingProps,
      label,
      theme,
      selectProps,
    } = props;

    const { chakraStyles } = selectProps;

    const sx = chakraStyles?.group ? chakraStyles.group({}, props) : {};

    return (
      <Box className={cx({ group: true }, className)} sx={sx}>
        <Heading
          {...headingProps}
          selectProps={selectProps}
          theme={theme}
          cx={cx}
        >
          {label}
        </Heading>
        <Box>{children}</Box>
      </Box>
    );
  },
  GroupHeading: (props) => {
    const {
      cx,
      className,
      innerProps,
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

    const initialStyles = {
      ...groupTitle,
      fontSize: fontSizes[size as Size],
      p: paddings[size as Size],
      m: 0,
      borderBottomWidth: hasStickyGroupHeaders ? "1px" : 0,
      position: hasStickyGroupHeaders ? "sticky" : "static",
      top: -2,
      bg,
    };

    const sx = chakraStyles?.groupHeading
      ? chakraStyles.groupHeading(initialStyles, props)
      : initialStyles;

    return (
      <Box
        className={cx({ "group-heading": true }, className)}
        sx={sx}
        {...innerProps}
      >
        {children}
      </Box>
    );
  },
  Option: (props) => {
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

    const { item } = useStyles();

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

    // Don't create exta space for the checkmark if using a multi select with
    // options that dissapear when they're selected
    const showCheckIcon: boolean =
      selectedOptionStyle === "check" &&
      (!isMulti || hideSelectedOptions === false);

    const shouldHighlight: boolean =
      selectedOptionStyle === "color" && isSelected;

    const initialStyles = {
      ...item,
      d: "flex",
      alignItems: "center",
      w: "100%",
      textAlign: "start",
      fontSize: size,
      p: paddings[size as Size],
      bg: isFocused
        ? (item as RecursiveCSSObject<SxProps>)._focus.bg
        : "transparent",
      ...(shouldHighlight && {
        bg: selectedBg,
        color: selectedColor,
        _active: { bg: selectedBg },
      }),
      ...(isDisabled && (item as RecursiveCSSObject<SxProps>)._disabled),
    };

    const sx = chakraStyles?.option
      ? chakraStyles.option(initialStyles, props)
      : initialStyles;

    return (
      <Box
        role="button"
        className={cx(
          {
            option: true,
            "option--is-disabled": isDisabled,
            "option--is-focused": isFocused,
            "option--is-selected": isSelected,
          },
          className
        )}
        sx={sx}
        ref={innerRef}
        {...innerProps}
        disabled={isDisabled ? true : undefined}
      >
        {showCheckIcon && (
          <MenuIcon
            fontSize="0.8em"
            marginEnd="0.75rem"
            opacity={isSelected ? 1 : 0}
          >
            <CheckIcon />
          </MenuIcon>
        )}
        {children}
      </Box>
    );
  },
  // Messages
  LoadingMessage: (props) => {
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

    const initialStyles = {
      color: placeholderColor,
      textAlign: "center",
      p: paddings[size as Size],
      fontSize: fontSizes[size as Size],
    };

    const sx = chakraStyles?.loadingMessage
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
  },
  NoOptionsMessage: (props) => {
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

    const initialStyles = {
      color: placeholderColor,
      textAlign: "center",
      p: paddings[size as Size],
      fontSize: fontSizes[size as Size],
    };

    const sx = chakraStyles?.noOptionsMessage
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
  },
  Input: (props) => (
    <chakra.input
      as={selectComponents.Input}
      __css={{
        color: "inherit",
        lineHeight: 1,
      }}
      {...props}
    />
  ),
};

export default chakraComponents;
