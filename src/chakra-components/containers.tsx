import { Box, type SystemStyleObject, useSlotRecipe } from "@chakra-ui/react";
import type {
  ContainerProps,
  GroupBase,
  IndicatorsContainerProps,
  ValueContainerProps,
} from "react-select";

export const SelectContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: ContainerProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    isDisabled,
    isRtl,
    hasValue,
    selectProps: { chakraStyles, size, variant },
  } = props;

  const selectStyles = useSlotRecipe({ key: "select" })({
    size,
    variant,
  });

  const initialCss: SystemStyleObject = {
    ...selectStyles.root,
    gap: 0,
    direction: isRtl ? "rtl" : undefined,
    ...(isDisabled ? { cursor: "not-allowed" } : {}),
  };

  const css = chakraStyles?.container
    ? chakraStyles.container(initialCss, props)
    : initialCss;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          "--is-disabled": isDisabled,
          "--is-rtl": isRtl,
          "--has-value": hasValue,
        },
        className
      )}
      css={css}
    >
      {children}
    </Box>
  );
};

export const ValueContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: ValueContainerProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    isMulti,
    hasValue,
    innerProps,
    selectProps: { chakraStyles, controlShouldRenderValue },
  } = props;

  const initialCss: SystemStyleObject = {
    display: isMulti && hasValue && controlShouldRenderValue ? "flex" : "grid",
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap",
    position: "relative",
    overflow: "hidden",
    py: "2px",
  };

  const css = chakraStyles?.valueContainer
    ? chakraStyles.valueContainer(initialCss, props)
    : initialCss;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          "value-container": true,
          "value-container--is-multi": isMulti,
          "value-container--has-value": hasValue,
        },
        className
      )}
      css={css}
    >
      {children}
    </Box>
  );
};

export const IndicatorsContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: IndicatorsContainerProps<Option, IsMulti, Group>
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
    ...selectStyles.indicatorGroup,
    // TODO: Figure out if this should be allowed to be position: "absolute"
    // That's the built-in default, but it's causing the tags to overlap the indicators
    position: "static",
    // This needs to be overridden otherwise, because the padding is already on the control
    paddingRight: 0,
  };

  const css = chakraStyles?.indicatorsContainer
    ? chakraStyles.indicatorsContainer(initialCss, props)
    : initialCss;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          indicators: true,
        },
        className
      )}
      css={css}
    >
      {children}
    </Box>
  );
};
