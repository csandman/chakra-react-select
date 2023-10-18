import React from "react";
import { Box } from "@chakra-ui/layout";
import { Menu as ChakraMenu, MenuIcon } from "@chakra-ui/menu";
import type { PropsOf, SystemStyleObject } from "@chakra-ui/system";
import { useColorModeValue, useMultiStyleConfig } from "@chakra-ui/system";
import type {
  CoercedMenuPlacement,
  GroupBase,
  GroupHeadingProps,
  GroupProps,
  MenuListProps,
  MenuProps,
  NoticeProps,
  OptionProps,
} from "react-select";
import type { SizeProps, ThemeObject } from "../types";
import { useSize } from "../utils";

const alignToControl = (placement: CoercedMenuPlacement) => {
  const placementToCSSProp = { bottom: "top", top: "bottom" };
  return placement ? placementToCSSProp[placement] : "top";
};

const Menu = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: MenuProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    children,
    innerProps,
    innerRef,
    placement,
    selectProps,
  } = props;

  const { chakraStyles } = selectProps;

  const crsStyles = useMultiStyleConfig("ChakraReactSelect", selectProps);

  const initialSx: SystemStyleObject = {
    position: "absolute",
    [alignToControl(placement)]: "100%",
    marginY: "8px",
    width: "100%",
    zIndex: 1,
    ...crsStyles.menu,
  };

  const sx = chakraStyles?.menu
    ? chakraStyles.menu(initialSx, props)
    : initialSx;

  return (
    <ChakraMenu>
      <Box
        {...innerProps}
        ref={innerRef}
        className={cx({ menu: true }, className)}
        sx={sx}
      >
        {children}
      </Box>
    </ChakraMenu>
  );
};

export default Menu;

export const MenuList = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: MenuListProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    innerRef,
    children,
    maxHeight,
    isMulti,
    innerProps,
    selectProps,
  } = props;

  const { chakraStyles } = selectProps;

  const menuStyles = useMultiStyleConfig("Menu", selectProps);

  // We're pulling in the border radius from the theme for the input component
  // so we can match the menu lists' border radius to it, but in 2.8.0 the value
  // was changed to being pulled from a theme variable instead of being hardcoded
  const fieldStyles = useMultiStyleConfig("Input", selectProps).field as Record<
    string,
    string
  >;

  const crsStyles = useMultiStyleConfig("ChakraReactSelect", selectProps);

  const initialSx: SystemStyleObject = {
    ...menuStyles.list,
    minW: "100%",
    maxHeight: `${maxHeight}px`,
    overflowY: "auto",
    // This is hacky, but it works. May be removed in the future
    "--input-border-radius": fieldStyles?.["--input-border-radius"],
    borderRadius: fieldStyles?.borderRadius || menuStyles.list?.borderRadius,
    position: "relative", // required for offset[Height, Top] > keyboard scroll
    WebkitOverflowScrolling: "touch",
    ...crsStyles.menuList,
  };

  const sx = chakraStyles?.menuList
    ? chakraStyles.menuList(initialSx, props)
    : initialSx;

  return (
    <Box
      {...innerProps}
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
};

export const LoadingMessage = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: NoticeProps<Option, IsMulti, Group>
) => {
  const { children, className, cx, innerProps, selectProps } = props;

  const { chakraStyles, size: sizeProp } = selectProps;

  const size = useSize(sizeProp);

  const verticalPaddings: SizeProps = {
    sm: "6px",
    md: "8px",
    lg: "10px",
  };

  const crsStyles = useMultiStyleConfig("ChakraReactSelect", selectProps);

  const initialSx: SystemStyleObject = {
    color: "chakra-subtle-text",
    textAlign: "center",
    paddingY: verticalPaddings[size],
    fontSize: size,
    ...crsStyles.loadingMessage,
  };

  const sx = chakraStyles?.loadingMessage
    ? chakraStyles.loadingMessage(initialSx, props)
    : initialSx;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          "menu-notice": true,
          "menu-notice--loading": true,
        },
        className
      )}
      sx={sx}
    >
      {children}
    </Box>
  );
};

export const NoOptionsMessage = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: NoticeProps<Option, IsMulti, Group>
) => {
  const { children, className, cx, innerProps, selectProps } = props;

  const { chakraStyles, size: sizeProp } = selectProps;

  const size = useSize(sizeProp);

  const verticalPaddings: SizeProps = {
    sm: "6px",
    md: "8px",
    lg: "10px",
  };

  const crsStyles = useMultiStyleConfig("ChakraReactSelect", selectProps);

  const initialSx: SystemStyleObject = {
    color: "chakra-subtle-text",
    textAlign: "center",
    paddingY: verticalPaddings[size],
    fontSize: size,
    ...crsStyles.noOptionsMessage,
  };

  const sx = chakraStyles?.noOptionsMessage
    ? chakraStyles.noOptionsMessage(initialSx, props)
    : initialSx;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          "menu-notice": true,
          "menu-notice--no-options": true,
        },
        className
      )}
      sx={sx}
    >
      {children}
    </Box>
  );
};

export const Group = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: GroupProps<Option, IsMulti, Group>
) => {
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
    innerProps,
    getClassNames,
  } = props;

  const { chakraStyles } = selectProps;

  const crsStyles = useMultiStyleConfig("ChakraReactSelect", selectProps);

  const initialSx: SystemStyleObject = crsStyles.group || {};

  const sx = chakraStyles?.group
    ? chakraStyles.group(initialSx, props)
    : initialSx;

  return (
    <Box {...innerProps} className={cx({ group: true }, className)} sx={sx}>
      <Heading
        {...headingProps}
        selectProps={selectProps}
        cx={cx}
        theme={theme}
        getStyles={getStyles}
        getClassNames={getClassNames}
      >
        {label}
      </Heading>
      <Box>{children}</Box>
    </Box>
  );
};

export const GroupHeading = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: GroupHeadingProps<Option, IsMulti, Group>
) => {
  const { cx, className, children, selectProps } = props;

  const { chakraStyles, size: sizeProp } = selectProps;

  const menuStyles = useMultiStyleConfig("Menu", selectProps);

  const size = useSize(sizeProp);

  const fontSizes: SizeProps = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };
  const paddings: SizeProps = {
    sm: "0.4rem 0.8rem",
    md: "0.5rem 1rem",
    lg: "0.6rem 1.2rem",
  };

  const crsStyles = useMultiStyleConfig("ChakraReactSelect", selectProps);

  const initialSx: SystemStyleObject = {
    ...menuStyles.groupTitle,
    fontSize: fontSizes[size],
    padding: paddings[size],
    margin: 0,
    ...crsStyles.groupHeading,
  };

  const sx = chakraStyles?.groupHeading
    ? chakraStyles.groupHeading(initialSx, props)
    : initialSx;

  return (
    <Box className={cx({ "group-heading": true }, className)} sx={sx}>
      {children}
    </Box>
  );
};

/**
 * The `CheckIcon` component from the Chakra UI Menu
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/eb0316ddf96dd259433724062e923c33e6eee729/packages/components/menu/src/menu-item-option.tsx#L10-L17}
 */
const CheckIcon: React.FC<PropsOf<"svg">> = (props) => (
  <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </svg>
);

export const Option = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: OptionProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    innerRef,
    innerProps,
    children,
    isFocused,
    isDisabled,
    isSelected,
    selectProps,
  } = props;

  const {
    chakraStyles,
    size: sizeProp,
    isMulti,
    hideSelectedOptions,
    selectedOptionStyle,
    selectedOptionColorScheme,
  } = selectProps;

  const size = useSize(sizeProp);

  const menuItemStyles: ThemeObject = useMultiStyleConfig(
    "Menu",
    selectProps
  ).item;

  const horizontalPaddingOptions: SizeProps = {
    sm: "0.6rem",
    md: "0.8rem",
    lg: "1rem",
  };

  const verticalPaddingOptions: SizeProps = {
    sm: "0.3rem",
    md: "0.4rem",
    lg: "0.5rem",
  };

  /**
   * Use the same selected color as the border of the select component
   *
   * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/theme/src/components/input.ts#L73}
   */
  const selectedBg = useColorModeValue(
    `${selectedOptionColorScheme}.500`,
    `${selectedOptionColorScheme}.300`
  );
  const selectedColor = useColorModeValue("white", "black");

  // Don't create exta space for the checkmark if using a multi select with
  // options that dissapear when they're selected
  const showCheckIcon: boolean =
    selectedOptionStyle === "check" &&
    (!isMulti || hideSelectedOptions === false);

  const shouldHighlight: boolean =
    selectedOptionStyle === "color" && isSelected;

  const crsStyles = useMultiStyleConfig("ChakraReactSelect", selectProps);

  const initialSx: SystemStyleObject = {
    ...menuItemStyles,
    display: "flex",
    alignItems: "center",
    width: "100%",
    textAlign: "start",
    fontSize: size,
    paddingX: horizontalPaddingOptions[size],
    paddingY: verticalPaddingOptions[size],
    ...(isFocused && menuItemStyles._focus),
    ...(shouldHighlight && {
      bg: selectedBg,
      color: selectedColor,
      _active: { bg: selectedBg },
    }),
    ...(isDisabled && menuItemStyles._disabled),
    ...(isDisabled && { _active: {} }),
    ...crsStyles.option,
  };

  const sx = chakraStyles?.option
    ? chakraStyles.option(initialSx, props)
    : initialSx;

  return (
    <Box
      {...innerProps}
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
      data-disabled={isDisabled ? true : undefined}
      aria-disabled={isDisabled ? true : undefined}
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
};
