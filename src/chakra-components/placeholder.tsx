import React from "react";
import type { ReactElement } from "react";
import { Box } from "@chakra-ui/layout";
import type { SystemStyleObject } from "@chakra-ui/system";
import type { GroupBase, PlaceholderProps } from "react-select";

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

export default Placeholder;
