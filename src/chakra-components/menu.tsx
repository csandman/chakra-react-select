import React from "react";
import type { IconProps } from "@chakra-ui/icon";
import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { MenuIcon } from "@chakra-ui/menu";
import type { SystemStyleObject } from "@chakra-ui/system";
import { useColorModeValue, useMultiStyleConfig } from "@chakra-ui/system";
import type {
  GroupBase,
  GroupHeadingProps,
  GroupProps,
  MenuListProps,
  MenuProps,
  NoticeProps,
  OptionProps,
} from "react-select";
import type { SizeProps, ThemeObject } from "../types";

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
    selectProps: { chakraStyles },
  } = props;

  const initialSx: SystemStyleObject = {
    position: "absolute",
    ...(placement === "bottom" && { top: "100%" }),
    ...(placement === "top" && { bottom: "100%" }),
    marginY: "8px",
    width: "100%",
    zIndex: 1,
    overflow: "hidden",
  };

  const sx = chakraStyles?.menu
    ? chakraStyles.menu(initialSx, props)
    : initialSx;

  return (
    <Box
      {...innerProps}
      ref={innerRef}
      className={cx({ menu: true }, className)}
      sx={sx}
    >
      {children}
    </Box>
  );
};

export default Menu;

export const MenuList = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
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
    selectProps: { size, chakraStyles },
  } = props;

  const menuStyles = useMultiStyleConfig("Menu");
  const inputStyles = useMultiStyleConfig("Input", { size });

  const initialSx: SystemStyleObject = {
    ...menuStyles.list,
    maxHeight: `${maxHeight}px`,
    overflowY: "auto",
    borderRadius: inputStyles.field?.borderRadius,
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
  Group extends GroupBase<Option>
>(
  props: NoticeProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { size, chakraStyles },
  } = props;

  /**
   * The chakra UI global placeholder color
   *
   * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/theme/src/styles.ts#L13}
   */
  const color = useColorModeValue("gray.400", "whiteAlpha.400");

  const verticalPaddings: SizeProps = {
    sm: "6px",
    md: "8px",
    lg: "10px",
  };

  const initialSx: SystemStyleObject = {
    color,
    textAlign: "center",
    paddingY: verticalPaddings[size || "md"],
    fontSize: size,
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
  Group extends GroupBase<Option>
>(
  props: NoticeProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { size, chakraStyles },
  } = props;

  /**
   * The chakra UI global placeholder color
   *
   * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/theme/src/styles.ts#L13}
   */
  const color = useColorModeValue("gray.400", "whiteAlpha.400");

  const verticalPaddings: SizeProps = {
    sm: "6px",
    md: "8px",
    lg: "10px",
  };

  const initialSx: SystemStyleObject = {
    color,
    textAlign: "center",
    paddingY: verticalPaddings[size || "md"],
    fontSize: size,
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
  Group extends GroupBase<Option>
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
  } = props;

  const { chakraStyles } = selectProps;

  const sx = chakraStyles?.group ? chakraStyles.group({}, props) : {};

  return (
    <Box {...innerProps} className={cx({ group: true }, className)} sx={sx}>
      <Heading
        {...headingProps}
        selectProps={selectProps}
        cx={cx}
        theme={theme}
        getStyles={getStyles}
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
  Group extends GroupBase<Option>
>(
  props: GroupHeadingProps<Option, IsMulti, Group>
) => {
  const {
    cx,
    className,
    children,
    selectProps: { size, hasStickyGroupHeaders, chakraStyles },
  } = props;

  const menuStyles = useMultiStyleConfig("Menu");

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

  const initialSx: SystemStyleObject = {
    ...menuStyles.groupTitle,
    fontSize: fontSizes[size || "md"],
    padding: paddings[size || "md"],
    margin: 0,
    borderBottomWidth: hasStickyGroupHeaders ? "1px" : 0,
    position: hasStickyGroupHeaders ? "sticky" : "static",
    top: -2,
    bg: menuStyles.list.bg,
    zIndex: 1,
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
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/menu/src/menu.tsx#L314}
 */
const CheckIcon = (props: IconProps) => (
  <Icon viewBox="0 0 14 14" w="1em" h="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </Icon>
);

export const Option = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
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
    selectProps: {
      size,
      isMulti,
      hideSelectedOptions,
      selectedOptionStyle,
      selectedOptionColor,
      chakraStyles,
    },
  } = props;

  const menuItemStyles = useMultiStyleConfig("Menu").item as ThemeObject;

  const paddings: SizeProps = {
    sm: "0.3rem 0.6rem",
    md: "0.4rem 0.8rem",
    lg: "0.5rem 1rem",
  };

  /**
   * Use the same selected color as the border of the select component
   *
   * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/theme/src/components/input.ts#L73}
   */
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

  const initialSx: SystemStyleObject = {
    ...menuItemStyles,
    display: "flex",
    alignItems: "center",
    width: "100%",
    textAlign: "start",
    fontSize: size,
    padding: paddings[size || "md"],
    bg: "transparent",
    ...(isFocused && menuItemStyles._focus),
    ...(shouldHighlight && {
      bg: selectedBg,
      color: selectedColor,
      _active: { bg: selectedBg },
    }),
    ...(isDisabled && menuItemStyles._disabled),
    ...(isDisabled && { _active: {} }),
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
