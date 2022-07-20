import React from "react";
import { Box } from "@chakra-ui/layout";
import type { CSSObject } from "@chakra-ui/system";
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

  const spacingSx: CSSObject = {
    gridArea: "1 / 2",
    font: "inherit",
    minW: "2px",
    border: 0,
    margin: 0,
    outline: 0,
  };

  const initialContainerSx: CSSObject = {
    flex: "1 1 auto",
    display: "inline-grid",
    gridArea: "1 / 1 / 2 / 3",
    gridTemplateColumns: "0 min-content",
    color: "inherit",
    marginX: "0.125rem",
    paddingY: "0.125rem",
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

  const initialInputSx: CSSObject = {
    label: "input",
    color: "inherit",
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
        readOnly={isReadOnly}
        aria-readonly={isReadOnly ? true : undefined}
        aria-required={isRequired ? true : undefined}
        {...innerProps}
      />
    </Box>
  );
};

export default Input;
