import React from "react";
import { Box } from "@chakra-ui/layout";
import type { SystemStyleObject } from "@chakra-ui/system";
import { chakra } from "@chakra-ui/system";
import type { GroupBase, InputProps } from "react-select";
import { cleanCommonProps } from "../utils";

const Input = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: InputProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    value,
    selectProps: { chakraStyles, isReadOnly, isRequired },
  } = props;
  const { innerRef, isDisabled, isHidden, inputClassName, ...innerProps } =
    cleanCommonProps(props);

  const spacingStyle: SystemStyleObject = {
    gridArea: "1 / 2",
    font: "inherit",
    minW: "2px",
    border: 0,
    margin: 0,
    outline: 0,
  };

  const initialContainerStyles: SystemStyleObject = {
    flex: "1 1 auto",
    display: "inline-grid",
    gridArea: "1 / 1 / 2 / 3",
    gridTemplateColumns: "0 min-content",
    color: "inherit",
    _after: {
      content: 'attr(data-value) " "',
      visibility: "hidden",
      whiteSpace: "pre",
      padding: 0,
      ...spacingStyle,
    },
  };

  const containerSx = chakraStyles?.inputContainer
    ? chakraStyles.inputContainer(initialContainerStyles, props)
    : initialContainerStyles;

  const initialInputStyles = {
    label: "input",
    color: "inherit",
    bg: 0,
    opacity: isHidden ? 0 : 1,
    width: "100%",
    py: "0.125rem",
    ...spacingStyle,
  };

  const inputSx = chakraStyles?.input
    ? chakraStyles.input(initialInputStyles, props)
    : initialInputStyles;

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
        readOnly={isReadOnly}
        aria-readonly={isReadOnly ? true : undefined}
        aria-required={isRequired ? true : undefined}
        {...innerProps}
      />
    </Box>
  );
};

export default Input;
