import { Box, chakra } from "@chakra-ui/react";
import type { SystemStyleObject } from "@chakra-ui/react";
import type { GroupBase, InputProps } from "react-select";
import { cleanCommonProps } from "../utils";

export const Input = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: InputProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    value,
    selectProps: { chakraStyles, isReadOnly },
  } = props;
  const { innerRef, isDisabled, isHidden, inputClassName, ...innerProps } =
    cleanCommonProps(props);

  const spacingSx: SystemStyleObject = {
    gridArea: "1 / 2",
    minW: "2px",
    border: 0,
    margin: 0,
    outline: 0,
    padding: 0,
  };

  const initialContainerSx: SystemStyleObject = {
    flex: "1 1 auto",
    display: "inline-grid",
    gridArea: "1 / 1 / 2 / 3",
    gridTemplateColumns: "0 min-content",
    color: "inherit",
    marginX: "0.125rem",
    paddingY: "0.125rem",
    visibility: isDisabled ? "hidden" : "visible",
    // Force css to recompute when value change due to @emotion bug.
    // We can remove it whenever the bug is fixed.
    transform: value ? "translateZ(0)" : "",
    _after: {
      content: 'attr(data-value) " "',
      visibility: "hidden",
      whiteSpace: "pre",
      padding: 0,
      ...spacingSx,
    },
  };
  const containerSx = chakraStyles?.inputContainer
    ? chakraStyles.inputContainer(initialContainerSx, props)
    : initialContainerSx;

  const initialInputSx: SystemStyleObject = {
    background: 0,
    opacity: isHidden ? 0 : 1,
    width: "100%",
    ...spacingSx,
  };
  const inputSx = chakraStyles?.input
    ? chakraStyles.input(initialInputSx, props)
    : initialInputSx;

  return (
    <Box
      className={cx({ "input-container": true }, className)}
      data-value={value || ""}
      sx={containerSx}
    >
      <chakra.input
        className={cx({ input: true }, inputClassName)}
        ref={innerRef}
        sx={inputSx}
        disabled={isDisabled}
        readOnly={isReadOnly ? true : undefined}
        {...innerProps}
      />
    </Box>
  );
};
