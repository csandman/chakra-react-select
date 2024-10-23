import {
  Box,
  IconButton,
  Separator,
  Spinner,
  type SystemStyleObject,
  useRecipe,
  useSlotRecipe,
} from "@chakra-ui/react";
import type {
  ClearIndicatorProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
} from "react-select";
import type { SizeProps } from "../types";
import { useSize } from "../utils";
import { ChevronDownIcon, CloseIcon } from "./icons";

export const Control = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: ControlProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    children,
    innerRef,
    innerProps,
    isDisabled,
    isFocused,
    menuIsOpen,
    selectProps: { chakraStyles, size, variant, invalid, readOnly },
  } = props;

  const inputRecipe = useRecipe({ key: "input" });
  const inputStyles = inputRecipe({
    size,
    variant,
  });

  const initialCss: SystemStyleObject = {
    ...inputStyles,
    position: "relative",
    display: "flex",
    overflow: "hidden",
    height: "auto",
    cursor: "text",
    // TODO: figure out if this is the best way
    minHeight: "var(--select-trigger-height)",
    ...(isDisabled ? { pointerEvents: "none" } : {}),
  };

  const css = chakraStyles?.control
    ? chakraStyles.control(initialCss, props)
    : initialCss;

  return (
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
      css={css}
      {...innerProps}
      data-focus={isFocused ? true : undefined}
      data-focus-visible={isFocused ? true : undefined}
      data-invalid={invalid ? true : undefined}
      data-disabled={isDisabled ? true : undefined}
      data-readonly={readOnly ? true : undefined}
    >
      {children}
    </Box>
  );
};

export const IndicatorSeparator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: IndicatorSeparatorProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    selectProps: { chakraStyles },
  } = props;

  const initialCss: SystemStyleObject = {
    // To match the default styles of the Chakra select, we don't want to show the separator
    display: "none",
  };

  const css = chakraStyles?.indicatorSeparator
    ? chakraStyles.indicatorSeparator(initialCss, props)
    : initialCss;

  return (
    <Separator
      className={cx({ "indicator-separator": true }, className)}
      css={css}
      orientation="vertical"
    />
  );
};

export const DropdownIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles, size, variant },
  } = props;

  const selectStyles = useSlotRecipe({ key: "select" })({
    size,
    variant,
  });

  const initialDropdownIndicatorCss: SystemStyleObject = {
    ...selectStyles.indicator,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const dropdownIndicatorCss = chakraStyles?.dropdownIndicator
    ? chakraStyles.dropdownIndicator(initialDropdownIndicatorCss, props)
    : initialDropdownIndicatorCss;

  const initialDownChevronCss: SystemStyleObject = {
    ...selectStyles.indicator,
    height: "1em",
    width: "1em",
    fontSize: "1.2em",
  };
  const downChevronCss = chakraStyles?.downChevron
    ? chakraStyles.downChevron(initialDownChevronCss, props)
    : initialDownChevronCss;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          indicator: true,
          "dropdown-indicator": true,
        },
        className
      )}
      css={dropdownIndicatorCss}
    >
      {children || <ChevronDownIcon css={downChevronCss} />}
    </Box>
  );
};

export const ClearIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: ClearIndicatorProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles, size, variant },
  } = props;

  const selectStyles = useSlotRecipe({ key: "select" })({
    size,
    variant,
  });

  const initialCss: SystemStyleObject = {
    ...selectStyles.clearTrigger,
  };
  const css = chakraStyles?.clearIndicator
    ? chakraStyles.clearIndicator(initialCss, props)
    : initialCss;

  const initialIconStyles: SystemStyleObject = {
    width: "1em",
    height: "1em",
  };
  const iconCss: SystemStyleObject = chakraStyles?.crossIcon
    ? chakraStyles.crossIcon(initialIconStyles, props)
    : initialIconStyles;

  return (
    <Box
      role="button"
      className={cx(
        {
          indicator: true,
          "clear-indicator": true,
        },
        className
      )}
      css={css}
      aria-label="Clear selected options"
      asChild
      {...innerProps}
    >
      <IconButton size="sm" variant="plain" pointerEvents="auto">
        {children || <CloseIcon css={iconCss} />}
      </IconButton>
    </Box>
  );
};

export const LoadingIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: LoadingIndicatorProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles, size: sizeProp },
    color,
    spinnerSize: propsSpinnerSize,
  } = props;

  const size = useSize(sizeProp);
  const spinnerSizes: SizeProps<"sm" | "md" | "lg" | "xl" | "xs"> = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };
  const spinnerSize = spinnerSizes[size];

  const initialCss: SystemStyleObject = { marginRight: 3 };

  const css = chakraStyles?.loadingIndicator
    ? chakraStyles.loadingIndicator(initialCss, props)
    : initialCss;

  return (
    <Spinner
      className={cx(
        {
          indicator: true,
          "loading-indicator": true,
        },
        className
      )}
      css={css}
      {...innerProps}
      size={propsSpinnerSize || spinnerSize}
      color={color}
    />
  );
};
