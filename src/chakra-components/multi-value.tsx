import type { ColorPalette, SystemStyleObject } from "@chakra-ui/react";
import { Box, Span, useChakraContext, useSlotRecipe } from "@chakra-ui/react";
import type {
  GroupBase,
  MultiValueGenericProps,
  MultiValueProps,
  MultiValueRemoveProps,
} from "react-select";
import type { TagVariant } from "../types";
import { CloseIcon } from "./icons";

const hasColorPalette = (
  option: unknown
): option is { colorPalette: ColorPalette } =>
  typeof option === "object" &&
  option !== null &&
  "colorPalette" in option &&
  typeof option.colorPalette === "string";

const hasVariant = (option: unknown): option is { variant: TagVariant } =>
  typeof option === "object" &&
  option !== null &&
  "variant" in option &&
  typeof option.variant === "string";

export const MultiValue = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
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

  const { chakraStyles, tagColorPalette, tagVariant, size } = selectProps;

  const chakraContext = useChakraContext();
  const { colorPalette: themeTagColorPalette, variant: defaultTagVariant } =
    chakraContext.getSlotRecipe("tag").defaultVariants ?? {};

  let optionColorPalette: ColorPalette | undefined = themeTagColorPalette;
  if (hasColorPalette(data)) {
    optionColorPalette = data.colorPalette;
  } else if (tagColorPalette) {
    optionColorPalette = tagColorPalette;
  }

  let variant: TagVariant = defaultTagVariant;
  if (hasVariant(data)) {
    variant = data.variant;
  } else if (tagVariant) {
    variant = tagVariant;
  }

  const tagStyles = useSlotRecipe({ key: "tag" })({
    size,
    variant,
  });

  const containerInitialCss: SystemStyleObject = {
    ...tagStyles.root,
    colorPalette: optionColorPalette,
    minWidth: 0, // resolves flex/text-overflow bug
    margin: "0.125rem",
  };
  const containerCss = chakraStyles?.multiValue
    ? chakraStyles.multiValue(containerInitialCss, props)
    : containerInitialCss;

  const labelInitialCss: SystemStyleObject = {
    ...tagStyles.label,
    overflow: "hidden",
    textOverflow:
      cropWithEllipsis || cropWithEllipsis === undefined
        ? "ellipsis"
        : undefined,
    whiteSpace: "nowrap",
  };
  const labelCss = chakraStyles?.multiValueLabel
    ? chakraStyles.multiValueLabel(labelInitialCss, props)
    : labelInitialCss;

  const removeInitialCss: SystemStyleObject = {
    ...tagStyles.closeTrigger,
  };
  const removeCss = chakraStyles?.multiValueRemove
    ? chakraStyles.multiValueRemove(removeInitialCss, props)
    : removeInitialCss;

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
      css={containerCss}
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
        css={labelCss}
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
        css={removeCss}
        selectProps={selectProps}
        isFocused={isFocused}
      />
    </Container>
  );
};

export const MultiValueContainer = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: MultiValueGenericProps<Option, IsMulti, Group>
) => {
  const { children, innerProps, css } = props;

  return (
    <Span {...innerProps} css={css}>
      {children}
    </Span>
  );
};

export const MultiValueLabel = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: MultiValueGenericProps<Option, IsMulti, Group>
) => {
  const { children, innerProps, css } = props;

  return (
    <Span {...innerProps} css={css}>
      {children}
    </Span>
  );
};

export const MultiValueRemove = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: MultiValueRemoveProps<Option, IsMulti, Group>
) => {
  const {
    children,
    innerProps,
    isFocused,
    css,
    selectProps: { size, variant },
  } = props;

  const tagStyles = useSlotRecipe({ key: "tag" })({
    size,
    variant,
  });

  return (
    <Box css={tagStyles.endElement}>
      <Box
        {...innerProps}
        role="button"
        css={css}
        data-focus-visible={isFocused ? true : undefined}
      >
        {children || <CloseIcon />}
      </Box>
    </Box>
  );
};
