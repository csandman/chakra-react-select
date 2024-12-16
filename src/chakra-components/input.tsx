import { Box, type SystemStyleObject, chakra } from "@chakra-ui/react";
import type { GroupBase, InputProps } from "react-select";
import { cleanCommonProps } from "../utils";

const BaseInput = chakra("input");

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
    selectProps: { chakraStyles, readOnly },
  } = props;
  const { innerRef, isDisabled, isHidden, inputClassName, ...innerProps } =
    cleanCommonProps(props);

  const spacingCss: SystemStyleObject = {
    gridArea: "1 / 2",
    minW: "2px",
    border: 0,
    margin: 0,
    outline: 0,
    padding: 0,
  };

  const initialContainerCss: SystemStyleObject = {
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
      ...spacingCss,
    },
  };
  const containerCss = chakraStyles?.inputContainer
    ? chakraStyles.inputContainer(initialContainerCss, props)
    : initialContainerCss;

  const initialInputCss: SystemStyleObject = {
    background: 0,
    opacity: isHidden ? 0 : 1,
    width: "100%",
    ...spacingCss,
  };
  const inputCss = chakraStyles?.input
    ? chakraStyles.input(initialInputCss, props)
    : initialInputCss;

  return (
    <Box
      className={cx({ "input-container": true }, className)}
      data-value={value || ""}
      css={containerCss}
    >
      <BaseInput
        className={cx({ input: true }, inputClassName)}
        ref={innerRef}
        css={inputCss}
        disabled={isDisabled}
        readOnly={readOnly ? true : undefined}
        {...innerProps}
      />
    </Box>
  );
};
