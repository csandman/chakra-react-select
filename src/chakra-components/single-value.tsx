import React from "react";
import { Box } from "@chakra-ui/layout";
import type { SystemStyleObject } from "@chakra-ui/system";
import type { GroupBase, SingleValueProps } from "react-select";

const SingleValue = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: SingleValueProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    isDisabled,
    innerProps,
    selectProps: { chakraStyles },
  } = props;

  const initialSx: SystemStyleObject = {
    gridArea: "1 / 1 / 2 / 3",
    mx: "0.125rem",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const sx = chakraStyles?.singleValue
    ? chakraStyles.singleValue(initialSx, props)
    : initialSx;

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

export default SingleValue;
