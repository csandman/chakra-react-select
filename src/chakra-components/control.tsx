import React from "react";
import type { ReactElement } from "react";
import { Box } from "@chakra-ui/layout";
import type { SystemStyleObject } from "@chakra-ui/system";
import { StylesProvider, useMultiStyleConfig } from "@chakra-ui/system";
import type { ControlProps, GroupBase } from "react-select";
import type { Size, SizeProps } from "../types";

const Control = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ControlProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    className,
    cx,
    children,
    innerRef,
    innerProps,
    isDisabled,
    isFocused,
    menuIsOpen,
    selectProps: {
      size,
      isInvalid,
      chakraStyles,
      focusBorderColor,
      errorBorderColor,
    },
  } = props;

  const inputStyles = useMultiStyleConfig("Input", {
    focusBorderColor,
    errorBorderColor,
    size,
  });

  const heights: SizeProps = {
    sm: 8,
    md: 10,
    lg: 12,
  };

  const initialStyles: SystemStyleObject = {
    ...inputStyles.field,
    d: "flex",
    p: 0,
    overflow: "hidden",
    h: "auto",
    minH: heights[size as Size],
  };

  const sx: SystemStyleObject = chakraStyles?.control
    ? chakraStyles.control(initialStyles, props)
    : initialStyles;

  return (
    <StylesProvider value={inputStyles}>
      <Box
        ref={innerRef}
        className={cx(
          {
            control: true,
            "control--is-disabled": isDisabled,
            "control--is-focused": isFocused,
            "control--menu-is-open": menuIsOpen,
          },
          className
        )}
        sx={sx}
        {...innerProps}
        data-focus={isFocused ? true : undefined}
        data-invalid={isInvalid ? true : undefined}
        data-disabled={isDisabled ? true : undefined}
      >
        {children}
      </Box>
    </StylesProvider>
  );
};

export default Control;
