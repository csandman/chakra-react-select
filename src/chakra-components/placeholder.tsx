import React from "react";
import { Box } from "@chakra-ui/layout";
import type { SystemStyleObject } from "@chakra-ui/system";
import { useColorModeValue } from "@chakra-ui/system";
import type { GroupBase, PlaceholderProps } from "react-select";

const Placeholder = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
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

  /**
   * The chakra UI global placeholder color
   *
   * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/theme/src/styles.ts#L13}
   */
  const color = useColorModeValue("gray.400", "whiteAlpha.400");

  const initialSx: SystemStyleObject = {
    gridArea: "1 / 1 / 2 / 3",
    color,
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

export default Placeholder;
