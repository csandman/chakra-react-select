import { Box } from "@chakra-ui/react";
import type { SystemStyleObject } from "@chakra-ui/react";
import type { GroupBase, PlaceholderProps } from "react-select";

export const Placeholder = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: PlaceholderProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles },
  } = props;

  const initialSx: SystemStyleObject = {
    gridArea: "1 / 1 / 2 / 3",
    color: "chakra-placeholder-color",
    mx: "0.125rem",
    userSelect: "none",
  };

  const sx = chakraStyles?.placeholder
    ? chakraStyles.placeholder(initialSx, props)
    : initialSx;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          placeholder: true,
        },
        className
      )}
      sx={sx}
    >
      {children}
    </Box>
  );
};
