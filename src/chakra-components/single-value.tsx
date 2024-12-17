import { Box, type SystemStyleObject } from "@chakra-ui/react";
import type { GroupBase, SingleValueProps } from "react-select";

export const SingleValue = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
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

  const initialCss: SystemStyleObject = {
    gridArea: "1 / 1 / 2 / 3",
    mx: "0.125rem",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const css = chakraStyles?.singleValue
    ? chakraStyles.singleValue(initialCss, props)
    : initialCss;

  return (
    <Box
      className={cx(
        {
          "single-value": true,
          "single-value--is-disabled": isDisabled,
        },
        className
      )}
      css={css}
      {...innerProps}
    >
      {children}
    </Box>
  );
};
