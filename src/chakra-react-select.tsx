/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { cloneElement, ReactElement } from "react";
import {
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  Divider,
  CloseButton,
  Center,
  Box,
  Portal,
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
  useTheme,
  useColorModeValue,
  useFormControl,
  createIcon,
} from "@chakra-ui/react";
import {
  ChakraSelectProps,
  Size,
  Theme,
  TagVariant,
  RecursiveCSSObject,
  SxProps,
  SizeProps,
  OptionalTheme,
} from "./types";

// Taken from the @chakra-ui/icons package to prevent needing it as a dependency
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/icons/src/ChevronDown.tsx
const ChevronDown = createIcon({
  displayName: "ChevronDownIcon",
  d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",
});

// Custom styles for components which do not have a chakra equivalent
const chakraStyles: ChakraSelectProps["styles"] = {
  // When disabled, react-select sets the pointer-state to none which prevents
  // the `not-allowed` cursor style from chakra from getting applied to the
  // Control
  container: (provided) => ({
    ...provided,
    pointerEvents: "auto",
  }),
  input: (provided) => ({
    ...provided,
    color: "inherit",
    lineHeight: 1,
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "none",
  }),
  valueContainer: (provided, { selectProps: { size } }) => {
    const px: SizeProps = {
      sm: "0.75rem",
      md: "1rem",
      lg: "1rem",
    };

    return {
      ...provided,
      padding: `0.125rem ${px[size as Size]}`,
    };
  },
  loadingMessage: (provided, { selectProps: { size } }) => {
    const fontSizes: SizeProps = {
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
    };

    const paddings: SizeProps = {
      sm: "6px 9px",
      md: "8px 12px",
      lg: "10px 15px",
    };

    return {
      ...provided,
      fontSize: fontSizes[size as Size],
      padding: paddings[size as Size],
    };
  },
  // Add the chakra style for when a TagCloseButton has focus
  multiValueRemove: (
    provided,
    {
      // @ts-ignore For some reason isFocused is not recognized as a prop here
      // but it works
      isFocused,
      selectProps: { multiValueRemoveFocusStyle },
    }
  ) => (isFocused ? multiValueRemoveFocusStyle : {}),
  control: () => ({}),
  menuList: () => ({}),
  option: () => ({}),
  multiValue: () => ({}),
  multiValueLabel: () => ({}),
  group: () => ({}),
};

const chakraComponents: ChakraSelectProps["components"] = {
  // Control components
  Control: ({
    children,
    innerRef,
    innerProps,
    isDisabled,
    isFocused,
    selectProps: { size, isInvalid },
  }) => {
    const inputStyles = useMultiStyleConfig("Input", { size });

    const heights: SizeProps = {
      sm: 8,
      md: 10,
      lg: 12,
    };

    return (
      <StylesProvider value={inputStyles}>
        <Flex
          ref={innerRef}
          sx={{
            ...inputStyles.field,
            p: 0,
            overflow: "hidden",
            h: "auto",
            minH: heights[size as Size],
          }}
          {...innerProps}
          data-focus={isFocused ? true : undefined}
          data-invalid={isInvalid ? true : undefined}
          data-disabled={isDisabled ? true : undefined}
        >
          {children}
        </Flex>
      </StylesProvider>
    );
  },
  MultiValueContainer: ({
    children,
    innerRef,
    innerProps,
    data,
    selectProps,
  }) => (
    <Tag
      ref={innerRef}
      {...innerProps}
      m="0.125rem"
      // react-select Fixed Options example:
      // https://react-select.com/home#fixed-options
      variant={
        data.variant || selectProps.tagVariant || data.isFixed
          ? "solid"
          : "subtle"
      }
      colorScheme={data.colorScheme || selectProps.colorScheme}
      size={selectProps.size}
    >
      {children}
    </Tag>
  ),
  MultiValueLabel: ({ children, innerRef, innerProps }) => (
    <TagLabel ref={innerRef} {...innerProps}>
      {children}
    </TagLabel>
  ),
  MultiValueRemove: ({ children, innerRef, innerProps, data: { isFixed } }) => {
    if (isFixed) {
      return null;
    }

    return (
      <TagCloseButton ref={innerRef} {...innerProps} tabIndex={-1}>
        {children}
      </TagCloseButton>
    );
  },
  IndicatorSeparator: ({ innerProps }) => (
    <Divider {...innerProps} orientation="vertical" opacity="1" />
  ),
  ClearIndicator: ({ innerProps, selectProps: { size } }) => (
    <CloseButton {...innerProps} size={size} mx={2} tabIndex={-1} />
  ),
  DropdownIndicator: ({ innerProps, selectProps: { size } }) => {
    const { addon } = useStyles();

    const iconSizes: SizeProps = {
      sm: 4,
      md: 5,
      lg: 6,
    };
    const iconSize = iconSizes[size as Size];

    return (
      <Center
        {...innerProps}
        sx={{
          ...addon,
          h: "100%",
          borderRadius: 0,
          borderWidth: 0,
          cursor: "pointer",
        }}
      >
        <ChevronDown h={iconSize} w={iconSize} />
      </Center>
    );
  },
  // Menu components
  MenuPortal: ({ children }) => <Portal>{children}</Portal>,
  Menu: ({ children, innerProps, selectProps: { size } }) => {
    const menuStyles = useMultiStyleConfig("Menu", {});

    const chakraTheme = useTheme();
    const borderRadii: SizeProps = {
      sm: chakraTheme.radii.sm,
      md: chakraTheme.radii.md,
      lg: chakraTheme.radii.md,
    };

    return (
      <Box
        sx={{
          position: "absolute",
          top: "100%",
          my: "8px",
          w: "100%",
          zIndex: 1,
          overflow: "hidden",
          rounded: borderRadii[size as Size],
        }}
        {...innerProps}
      >
        <StylesProvider value={menuStyles}>{children}</StylesProvider>
      </Box>
    );
  },
  MenuList: ({ innerRef, children, maxHeight, selectProps: { size } }) => {
    const { list } = useStyles();

    const chakraTheme = useTheme();
    const borderRadii: SizeProps = {
      sm: chakraTheme.radii.sm,
      md: chakraTheme.radii.md,
      lg: chakraTheme.radii.md,
    };

    return (
      <Box
        sx={{
          ...list,
          maxH: `${maxHeight}px`,
          overflowY: "auto",
          borderRadius: borderRadii[size as Size],
        }}
        ref={innerRef}
      >
        {children}
      </Box>
    );
  },
  GroupHeading: ({ innerProps, children, selectProps: { size } }) => {
    const { groupTitle } = useStyles();

    const chakraTheme = useTheme();
    const fontSizes: SizeProps = {
      sm: chakraTheme.fontSizes.xs,
      md: chakraTheme.fontSizes.sm,
      lg: chakraTheme.fontSizes.md,
    };
    const paddings: SizeProps = {
      sm: "0.4rem 0.8rem",
      md: "0.5rem 1rem",
      lg: "0.6rem 1.2rem",
    };

    return (
      <Box
        sx={{
          ...groupTitle,
          fontSize: fontSizes[size as Size],
          p: paddings[size as Size],
          m: 0,
        }}
        {...innerProps}
      >
        {children}
      </Box>
    );
  },
  Option: ({
    innerRef,
    innerProps,
    children,
    isFocused,
    isDisabled,
    selectProps: { size },
  }) => {
    const { item } = useStyles();

    const paddings: SizeProps = {
      sm: "0.3rem 0.6rem",
      md: "0.4rem 0.8rem",
      lg: "0.5rem 1rem",
    };

    return (
      <Box
        role="button"
        sx={{
          ...item,
          w: "100%",
          textAlign: "start",
          fontSize: size,
          p: paddings[size as Size],
          bg: isFocused
            ? (item as RecursiveCSSObject<SxProps>)._focus.bg
            : "transparent",
          ...(isDisabled && (item as RecursiveCSSObject<SxProps>)._disabled),
        }}
        ref={innerRef}
        {...innerProps}
        disabled={isDisabled ? true : undefined}
      >
        {children}
      </Box>
    );
  },
};

const ChakraReactSelect = ({
  children,
  styles = {},
  components = {},
  theme,
  size = "md",
  colorScheme = "gray",
  isDisabled,
  isInvalid,
  inputId,
  tagVariant,
  ...props
}: ChakraSelectProps): ReactElement => {
  const chakraTheme = useTheme();

  // Combine the props passed into the component with the props that can be set
  // on a surrounding form control to get the values of `isDisabled` and
  // `isInvalid`
  const inputProps = useFormControl({ isDisabled, isInvalid });

  // The chakra theme styles for TagCloseButton when focused
  const closeButtonFocus =
    chakraTheme.components.Tag.baseStyle.closeButton._focus;
  const multiValueRemoveFocusStyle = {
    background: closeButtonFocus.bg,
    boxShadow: chakraTheme.shadows[closeButtonFocus.boxShadow],
  };

  // The chakra UI global placeholder color
  // https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/styles.ts#L13
  const placeholderColor = useColorModeValue(
    chakraTheme.colors.gray[400],
    chakraTheme.colors.whiteAlpha[400]
  );

  // Ensure that the size used is one of the options, either `sm`, `md`, or `lg`
  let realSize: Size = size;
  const sizeOptions = ["sm", "md", "lg"];
  if (!sizeOptions.includes(size)) {
    realSize = "md";
  }

  // Ensure that the tag variant used is one of the options, either `subtle`,
  // `solid`, or `outline` (or )
  let realTagVariant: TagVariant = tagVariant;
  const tagVariantOptions = ["subtle", "solid", "outline"];
  if (typeof tagVariant !== undefined) {
    if (!tagVariantOptions.includes(tagVariant as string)) {
      realTagVariant = "subtle";
    }
  }

  const select = cloneElement(children, {
    components: {
      ...chakraComponents,
      ...components,
    },
    styles: {
      ...chakraStyles,
      ...styles,
    },
    theme: (baseTheme: Theme) => {
      let propTheme: OptionalTheme = {};
      if (typeof theme === "function") {
        propTheme = theme(baseTheme);
      }

      return {
        ...baseTheme,
        ...propTheme,
        colors: {
          ...baseTheme.colors,
          neutral50: placeholderColor, // placeholder text color
          neutral40: placeholderColor, // noOptionsMessage color
          ...propTheme.colors,
        },
        spacing: {
          ...baseTheme.spacing,
          ...propTheme.spacing,
        },
      };
    },
    colorScheme,
    size: realSize,
    tagVariant: realTagVariant,
    multiValueRemoveFocusStyle,
    // isDisabled and isInvalid can be set on the component
    // or on a surrounding form control
    isDisabled: inputProps.disabled,
    isInvalid: !!inputProps["aria-invalid"],
    inputId: inputId || inputProps.id,
    ...props,
    // aria-invalid can be passed to react-select, so we allow that to
    // override the `isInvalid` prop
    "aria-invalid":
      props["aria-invalid"] ?? inputProps["aria-invalid"] ? true : undefined,
  });

  return select;
};

export default ChakraReactSelect;
