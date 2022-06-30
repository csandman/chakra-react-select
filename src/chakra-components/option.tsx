import React from "react";
import type { ReactElement } from "react";
import { Box } from "@chakra-ui/layout";
import { MenuIcon } from "@chakra-ui/menu";
import type { PropsOf, SystemStyleObject } from "@chakra-ui/system";
import { useColorModeValue, useStyles } from "@chakra-ui/system";
import type { GroupBase, OptionProps } from "react-select";
import type { SizeProps, ThemeObject } from "../types";

/**
 * The `CheckIcon` component from the Chakra UI Menu
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/menu/src/menu.tsx#L314}
 */
const CheckIcon: React.FC<PropsOf<"svg">> = (props) => (
  <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </svg>
);

const Option = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group>
): ReactElement => {
  const {
    className,
    cx,
    innerRef,
    innerProps,
    children,
    isFocused,
    isDisabled,
    isSelected,
    selectProps: {
      size,
      isMulti,
      hideSelectedOptions,
      selectedOptionStyle,
      selectedOptionColor,
      chakraStyles,
    },
  } = props;

  const itemStyles = useStyles().item as ThemeObject;

  const paddings: SizeProps = {
    sm: "0.3rem 0.6rem",
    md: "0.4rem 0.8rem",
    lg: "0.5rem 1rem",
  };

  /**
   * Use the same selected color as the border of the select component
   *
   * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/theme/src/components/input.ts#L73}
   */
  const selectedBg = useColorModeValue(
    `${selectedOptionColor}.500`,
    `${selectedOptionColor}.300`
  );
  const selectedColor = useColorModeValue("white", "black");

  // Don't create exta space for the checkmark if using a multi select with
  // options that dissapear when they're selected
  const showCheckIcon: boolean =
    selectedOptionStyle === "check" &&
    (!isMulti || hideSelectedOptions === false);

  const shouldHighlight: boolean =
    selectedOptionStyle === "color" && isSelected;

  const initialStyles: SystemStyleObject = {
    ...itemStyles,
    display: "flex",
    alignItems: "center",
    width: "100%",
    textAlign: "start",
    fontSize: size,
    padding: paddings[size || "md"],
    bg: "transparent",
    ...(isFocused && itemStyles._focus),
    ...(shouldHighlight && {
      bg: selectedBg,
      color: selectedColor,
      _active: { bg: selectedBg },
    }),
    ...(isDisabled && itemStyles._disabled),
    ...(isDisabled && { _active: {} }),
  };

  const sx: SystemStyleObject = chakraStyles?.option
    ? chakraStyles.option(initialStyles, props)
    : initialStyles;

  return (
    <Box
      role="button"
      className={cx(
        {
          option: true,
          "option--is-disabled": isDisabled,
          "option--is-focused": isFocused,
          "option--is-selected": isSelected,
        },
        className
      )}
      sx={sx}
      ref={innerRef}
      {...innerProps}
      data-disabled={isDisabled ? true : undefined}
      aria-disabled={isDisabled ? true : undefined}
    >
      {showCheckIcon && (
        <MenuIcon
          fontSize="0.8em"
          marginEnd="0.75rem"
          opacity={isSelected ? 1 : 0}
        >
          <CheckIcon />
        </MenuIcon>
      )}
      {children}
    </Box>
  );
};

export default Option;
