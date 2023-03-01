import React from "react";
import type { IconProps } from "@chakra-ui/icon";
import { Icon } from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import type { SystemStyleObject } from "@chakra-ui/system";
import { chakra, useMultiStyleConfig } from "@chakra-ui/system";
import type {
  GroupBase,
  MultiValueGenericProps,
  MultiValueProps,
  MultiValueRemoveProps,
} from "react-select";
import { useSize } from "../utils";

const hasColorScheme = (option: unknown): option is { colorScheme: string } =>
  typeof option === "object" &&
  option !== null &&
  "colorScheme" in option &&
  typeof option.colorScheme === "string";

const hasVariant = (option: unknown): option is { variant: string } =>
  typeof option === "object" &&
  option !== null &&
  "variant" in option &&
  typeof option.variant === "string";

const hasIsFixed = (option: unknown): option is { isFixed: boolean } =>
  typeof option === "object" &&
  option !== null &&
  "isFixed" in option &&
  typeof option.isFixed === "boolean";

const MultiValue = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: MultiValueProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    components,
    cx,
    data,
    innerProps,
    isDisabled,
    isFocused,
    removeProps,
    selectProps,
    cropWithEllipsis,
  } = props;

  const { Container, Label, Remove } = components;

  const { chakraStyles, colorScheme, tagVariant, size: sizeProp } = selectProps;

  const size = useSize(sizeProp);

  let optionColorScheme = "";
  let optionVariant = "";
  let optionIsFixed = false;

  if (hasColorScheme(data)) {
    optionColorScheme = data.colorScheme;
  }

  if (hasVariant(data)) {
    optionVariant = data.variant;
  }

  if (hasIsFixed(data)) {
    optionIsFixed = data.isFixed;
  }

  const tagStyles = useMultiStyleConfig("Tag", {
    size,
    colorScheme: optionColorScheme || colorScheme,
    variant:
      optionVariant || tagVariant || (optionIsFixed ? "solid" : "subtle"),
  });

  const containerInitialSx: SystemStyleObject = {
    ...tagStyles.container,
    display: "flex",
    alignItems: "center",
    minWidth: 0, // resolves flex/text-overflow bug
    margin: "0.125rem",
  };
  const containerSx: SystemStyleObject = chakraStyles?.multiValue
    ? chakraStyles.multiValue(containerInitialSx, props)
    : containerInitialSx;

  const labelInitialSx: SystemStyleObject = {
    ...tagStyles.label,
    overflow: "hidden",
    textOverflow:
      cropWithEllipsis || cropWithEllipsis === undefined
        ? "ellipsis"
        : undefined,
    whiteSpace: "nowrap",
  };
  const labelSx = chakraStyles?.multiValueLabel
    ? chakraStyles.multiValueLabel(labelInitialSx, props)
    : labelInitialSx;

  const removeInitialSx: SystemStyleObject = {
    ...tagStyles.closeButton,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const removeSx = chakraStyles?.multiValueRemove
    ? chakraStyles.multiValueRemove(removeInitialSx, props)
    : removeInitialSx;

  return (
    <Container
      data={data}
      innerProps={{
        className: cx(
          {
            "multi-value": true,
            "multi-value--is-disabled": isDisabled,
          },
          className
        ),
        ...innerProps,
      }}
      sx={containerSx}
      selectProps={selectProps}
    >
      <Label
        data={data}
        innerProps={{
          className: cx(
            {
              "multi-value__label": true,
            },
            className
          ),
        }}
        sx={labelSx}
        selectProps={selectProps}
      >
        {children}
      </Label>
      <Remove
        data={data}
        innerProps={{
          className: cx(
            {
              "multi-value__remove": true,
            },
            className
          ),
          "aria-label": `Remove ${children || "option"}`,
          ...removeProps,
        }}
        sx={removeSx}
        selectProps={selectProps}
        isFocused={isFocused}
      />
    </Container>
  );
};

const MultiValueContainer = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: MultiValueGenericProps<Option, IsMulti, Group>
) => {
  const { children, innerProps, sx } = props;

  return (
    <chakra.span {...innerProps} sx={sx}>
      {children}
    </chakra.span>
  );
};

const MultiValueLabel = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: MultiValueGenericProps<Option, IsMulti, Group>
) => {
  const { children, innerProps, sx } = props;

  return (
    <chakra.span {...innerProps} sx={sx}>
      {children}
    </chakra.span>
  );
};

/**
 * Borrowed from Chakra UI Tag source
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/tag/src/tag.tsx#L75}
 */
const TagCloseIcon = (props: IconProps) => (
  <Icon verticalAlign="inherit" viewBox="0 0 512 512" {...props}>
    <path
      fill="currentColor"
      d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
    />
  </Icon>
);

const MultiValueRemove = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: MultiValueRemoveProps<Option, IsMulti, Group>
) => {
  const { children, innerProps, isFocused, data, sx } = props;

  if (hasIsFixed(data) && data.isFixed) {
    return null;
  }

  return (
    <Box
      {...innerProps}
      role="button"
      sx={sx}
      data-focus={isFocused ? true : undefined}
      data-focus-visible={isFocused ? true : undefined}
    >
      {children || <TagCloseIcon />}
    </Box>
  );
};

export { MultiValueContainer, MultiValueLabel, MultiValueRemove };
export default MultiValue;
