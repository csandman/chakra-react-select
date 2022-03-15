import React from "react";
import type { ReactElement } from "react";
import { Box } from "@chakra-ui/layout";
import type { SystemStyleObject } from "@chakra-ui/system";
import { useStyles, useTheme } from "@chakra-ui/system";
import type { GroupBase, GroupHeadingProps, GroupProps } from "react-select";
import type { Size, SizeProps } from "../types";

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
    zIndex: 1,
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

export { GroupHeading };
export default Group;
