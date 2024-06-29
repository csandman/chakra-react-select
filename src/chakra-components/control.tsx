import React from "react";
import type { IconProps } from "@chakra-ui/icon";
import { Icon } from "@chakra-ui/icon";
import { Box, Divider } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useMultiStyleConfig, useStyleConfig } from "@chakra-ui/system";
import type { SystemStyleObject } from "@chakra-ui/system";
import type {
  ClearIndicatorProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
} from "react-select";
import type { SizeProps } from "../types";
import { useSize } from "../utils";

const Control = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
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
      chakraStyles,
      size: sizeProp,
      variant,
      focusBorderColor,
      errorBorderColor,
      isInvalid,
      isReadOnly,
    },
  } = props;

  const size = useSize(sizeProp);
  const {
    field: { height, h, ...fieldStyles },
  } = useMultiStyleConfig("Input", {
    size,
    variant,
    focusBorderColor,
    errorBorderColor,
  });

  /**
   * `@chakra-ui/theme@3.2.0` introduced a breaking change that switched from using `h` to `height` for the Input sizing.
   *
   * We need to keep checking for either to maintain backwards compatibility.
   *
   * @see {@link https://github.com/chakra-ui/chakra-ui/releases/tag/%40chakra-ui%2Ftheme%403.2.0}
   */
  const minH = height || h;

  const initialSx: SystemStyleObject = {
    ...fieldStyles,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: 0,
    overflow: "hidden",
    height: "auto",
    minH,
    ...(isDisabled ? { pointerEvents: "none" } : {}),
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
      data-readonly={isReadOnly ? true : undefined}
    >
      {children}
    </Box>
  );
};

export const IndicatorSeparator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: IndicatorSeparatorProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    selectProps: { chakraStyles },
  } = props;

  const initialSx: SystemStyleObject = {
    opacity: 1,
    // To match the default styles of the Chakra select, we don't want to show the separator
    display: "none",
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
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/61f965a/packages/components/icons/src/ChevronDown.tsx}
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/61f965a/packages/components/select/src/select.tsx#L168-L179}
 */
export const DownChevron = (props: IconProps) => (
  <Icon role="presentation" focusable="false" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
    />
  </Icon>
);

export const DropdownIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: {
      chakraStyles,
      size: sizeProp,
      focusBorderColor,
      errorBorderColor,
      variant,
    },
  } = props;

  const size = useSize(sizeProp);
  const selectStyles = useMultiStyleConfig("Select", {
    size,
    variant,
    focusBorderColor,
    errorBorderColor,
  });

  const initialDropdownIndicatorSx: SystemStyleObject = {
    ...selectStyles.icon,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "static",
    marginRight: 2,
    marginLeft: 1,
    pointerEvents: "none",
  };
  const dropdownIndicatorSx = chakraStyles?.dropdownIndicator
    ? chakraStyles.dropdownIndicator(initialDropdownIndicatorSx, props)
    : initialDropdownIndicatorSx;

  const initialDownChevronSx: SystemStyleObject = {
    height: "1em",
    width: "1em",
  };
  const downChevronSx = chakraStyles?.downChevron
    ? chakraStyles.downChevron(initialDownChevronSx, props)
    : initialDownChevronSx;

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
      sx={dropdownIndicatorSx}
    >
      {children || <DownChevron sx={downChevronSx} />}
    </Box>
  );
};

/**
 * Borrowed from Chakra UI source
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/61f965a/packages/components/close-button/src/close-button.tsx#L12-L21}
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
  Group extends GroupBase<Option>,
>(
  props: ClearIndicatorProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles, size: sizeProp },
  } = props;

  const size = useSize(sizeProp);
  const closeButtonStyles = useStyleConfig("CloseButton", {
    size,
  });

  const initialSx: SystemStyleObject = {
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

  const initialIconStyles: SystemStyleObject = {
    width: "1em",
    height: "1em",
  };
  const iconSx: SystemStyleObject = chakraStyles?.crossIcon
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
  Group extends GroupBase<Option>,
>(
  props: LoadingIndicatorProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles, size: sizeProp },
    color,
    emptyColor,
    speed,
    thickness,
    spinnerSize: propsSpinnerSize,
  } = props;

  const size = useSize(sizeProp);
  const spinnerSizes: SizeProps<string> = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };
  const spinnerSize = spinnerSizes[size];

  const initialSx: SystemStyleObject = { marginRight: 3 };

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
