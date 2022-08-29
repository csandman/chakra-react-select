import React from "react";
import type { IconProps } from "@chakra-ui/icon";
import { Icon } from "@chakra-ui/icon";
import { Box, Divider } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useMultiStyleConfig, useStyleConfig } from "@chakra-ui/system";
import type { CSSObject } from "@chakra-ui/system";
import type {
  ClearIndicatorProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
} from "react-select";
import type { SizeProps } from "../types";

const Control = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ControlProps<Option, IsMulti, Group>
) => {
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
      variant,
    },
  } = props;

  const inputStyles = useMultiStyleConfig("Input", {
    focusBorderColor,
    errorBorderColor,
    size,
    variant,
  });

  const heights: SizeProps = {
    sm: 8,
    md: 10,
    lg: 12,
  };

  const initialSx: CSSObject = {
    ...inputStyles.field,
    display: "flex",
    padding: 0,
    overflow: "hidden",
    height: "auto",
    minHeight: heights[size || "md"],
  };

  const sx = chakraStyles?.control
    ? chakraStyles.control(initialSx, props)
    : initialSx;

  return (
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
      data-focus-visible={isFocused ? true : undefined}
      data-invalid={isInvalid ? true : undefined}
      data-disabled={isDisabled ? true : undefined}
    >
      {children}
    </Box>
  );
};

export const IndicatorSeparator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: IndicatorSeparatorProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    selectProps: { chakraStyles, useBasicStyles },
  } = props;

  const initialSx: CSSObject = {
    opacity: 1,
    ...(useBasicStyles && { display: "none" }),
  };

  const sx = chakraStyles?.indicatorSeparator
    ? chakraStyles.indicatorSeparator(initialSx, props)
    : initialSx;

  return (
    <Divider
      className={cx({ "indicator-separator": true }, className)}
      sx={sx}
      orientation="vertical"
    />
  );
};

/**
 * Borrowed from the `@chakra-ui/icons` package to prevent needing it as a dependency
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/main/packages/icons/src/ChevronDown.tsx}
 */
export const DownChevron = (props: IconProps) => (
  <Icon {...props}>
    <path
      fill="currentColor"
      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
    />
  </Icon>
);

export const DropdownIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: {
      size,
      chakraStyles,
      useBasicStyles,
      focusBorderColor,
      errorBorderColor,
    },
  } = props;

  const inputStyles = useMultiStyleConfig("Input", {
    focusBorderColor,
    errorBorderColor,
    size,
  });

  const iconSizes: SizeProps = {
    sm: "16px",
    md: "20px",
    lg: "24px",
  };
  const iconSize = iconSizes[size || "md"];

  const initialSx: CSSObject = {
    ...inputStyles.addon,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: 0,
    borderWidth: 0,
    cursor: "pointer",
    fontSize: iconSize,
    ...(useBasicStyles && {
      background: "transparent",
      padding: 0,
      width: 6,
      marginRight: 2,
      marginLeft: 1,
      cursor: "inherit",
    }),
  };
  const sx = chakraStyles?.dropdownIndicator
    ? chakraStyles.dropdownIndicator(initialSx, props)
    : initialSx;

  const initialIconStyles = {
    height: "1em",
    width: "1em",
  };
  const iconSx: CSSObject = chakraStyles?.downChevron
    ? chakraStyles.downChevron(initialIconStyles, props)
    : initialIconStyles;

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
      {children || <DownChevron sx={iconSx} />}
    </Box>
  );
};

/**
 * Borrowed from Chakra UI source
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/close-button/src/close-button.tsx#L14}
 */
export const CrossIcon = (props: IconProps) => (
  <Icon focusable="false" aria-hidden {...props}>
    <path
      fill="currentColor"
      d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
    />
  </Icon>
);

export const ClearIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ClearIndicatorProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { size, chakraStyles },
  } = props;

  const closeButtonStyles = useStyleConfig("CloseButton", {
    size,
  });

  const initialSx: CSSObject = {
    ...closeButtonStyles,
    marginX: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "pointer",
  };
  const sx = chakraStyles?.clearIndicator
    ? chakraStyles.clearIndicator(initialSx, props)
    : initialSx;

  const initialIconStyles: CSSObject = {
    width: "1em",
    height: "1em",
  };
  const iconSx: CSSObject = chakraStyles?.crossIcon
    ? chakraStyles.crossIcon(initialIconStyles, props)
    : initialIconStyles;

  return (
    <Box
      role="button"
      className={cx(
        {
          indicator: true,
          "clear-indicator": true,
        },
        className
      )}
      sx={sx}
      aria-label="Clear selected options"
      {...innerProps}
    >
      {children || <CrossIcon sx={iconSx} />}
    </Box>
  );
};

export const LoadingIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: LoadingIndicatorProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    innerProps,
    selectProps: { size, chakraStyles },
    color,
    emptyColor,
    speed,
    thickness,
    spinnerSize: propsSpinnerSize,
  } = props;

  const spinnerSizes: SizeProps<string> = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  const spinnerSize = spinnerSizes[size || "md"];

  const initialSx: CSSObject = { marginRight: 3 };

  const sx = chakraStyles?.loadingIndicator
    ? chakraStyles.loadingIndicator(initialSx, props)
    : initialSx;

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
      size={propsSpinnerSize || spinnerSize}
      color={color}
      emptyColor={emptyColor}
      speed={speed}
      thickness={thickness}
    />
  );
};

export default Control;
