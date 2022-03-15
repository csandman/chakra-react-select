import React from "react";
import type { ReactElement } from "react";
import { Box } from "@chakra-ui/layout";
import type { SystemStyleObject } from "@chakra-ui/system";
import {
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
  useTheme,
} from "@chakra-ui/system";
import type {
  GroupBase,
  MenuListProps,
  MenuProps,
  NoticeProps,
} from "react-select";
import type { Size, SizeProps } from "../types";

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
      ref={innerRef}
      className={cx({ menu: true }, className)}
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
      sx={sx}
      ref={innerRef}
    >
      {children}
    </Box>
  );
};

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

export { LoadingMessage, MenuList, NoOptionsMessage };
export default Menu;
