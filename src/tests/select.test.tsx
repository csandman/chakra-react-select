// Ported from react-select@5.10.2:
//   https://github.com/JedWatson/react-select/blob/react-select%405.10.2/packages/react-select/src/__tests__/Select.test.tsx
// When bumping the react-select dep, diff upstream at the new tag against
// this file and port relevant additions/changes. Wrapper-specific
// adaptations (Chakra render wrapper, userEvent v14 async, jsdom
// workarounds) should remain. Chakra-specific tests live in
// ./chakra-specific.test.tsx.
import type { KeyboardEvent } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Select } from "../index";
import type {
  FormatOptionLabelMeta,
  FilterOptionOption,
  AriaLiveMessages,
  GroupBase,
} from "../index";
import cases from "./cases";
import {
  OPTIONS,
  OPTIONS_ACCENTED,
  OPTIONS_NUMBER_VALUE,
  OPTIONS_GROUPED,
  OPTIONS_BOOLEAN_VALUE,
  OPTIONS_DISABLED,
} from "./constants";
import type {
  Option,
  GroupedOption,
  OptionNumberValue,
  OptionBooleanValue,
} from "./constants";
import { render, fireEvent } from "./render";
import type { EventType } from "./render";

describe("Select (ported from react-select)", () => {
  const noop = vi.fn<() => void>();
  // `@emotion/jest` matchers and snapshot tests from upstream were dropped
  // because chakra-react-select renders Chakra UI components rather than the
  // emotion-styled defaults; assertions that depend on either will be
  // reimplemented in chakra-specific.test.tsx as needed.

  interface BasicProps {
    readonly className: string;
    readonly classNamePrefix: string;
    readonly onChange: () => void;
    readonly onInputChange: () => void;
    readonly onMenuClose: () => void;
    readonly onMenuOpen: () => void;
    readonly name: string;
    readonly options: readonly Option[];
    readonly inputValue: string;
    readonly value: null;
  }

  const BASIC_PROPS: BasicProps = {
    className: "react-select",
    classNamePrefix: "react-select",
    onChange: vi.fn<() => void>(),
    onInputChange: vi.fn<() => void>(),
    onMenuClose: vi.fn<() => void>(),
    onMenuOpen: vi.fn<() => void>(),
    name: "test-input-name",
    options: OPTIONS,
    inputValue: "",
    value: null,
  };

  test("instanceId prop > to have instanceId as id prefix for the select components", () => {
    const { container } = render(
      <Select {...BASIC_PROPS} menuIsOpen instanceId="custom-id" />
    );
    expect(container.querySelector("input")!.id).toContain("custom-id");
    for (const opt of container.querySelectorAll("div.react-select__option")) {
      expect(opt.id).toContain("custom-id");
    }
  });

  test("hidden input field is not present if name is not passes", () => {
    const { container } = render(
      <Select
        onChange={noop}
        onInputChange={noop}
        onMenuOpen={noop}
        onMenuClose={noop}
        inputValue=""
        value={null}
        options={OPTIONS}
      />
    );
    expect(container.querySelector('input[type="hidden"]')).toBeNull();
  });

  test("hidden input field is present if name passes", () => {
    const { container } = render(
      <Select
        onChange={noop}
        onInputChange={noop}
        onMenuOpen={noop}
        onMenuClose={noop}
        inputValue=""
        value={null}
        name="test-input-name"
        options={OPTIONS}
      />
    );
    expect(container.querySelector('input[type="hidden"]')).toBeTruthy();
  });

  test("single select > passing multiple values > should select the first value", () => {
    const props = { ...BASIC_PROPS, value: [OPTIONS[0], OPTIONS[4]] };
    const { container } = render(<Select {...props} />);

    expect(container.querySelector(".react-select__control")!.textContent).toBe(
      "0"
    );
  });

  test("isRtl boolean prop sets direction: rtl on container", () => {
    const { container } = render(
      <Select {...BASIC_PROPS} value={[OPTIONS[0]]} isRtl isClearable />
    );
    // chakra-react-select's SelectContainer adds a `--is-rtl` modifier class
    // when isRtl is true (see src/chakra-components/containers.tsx).
    expect(container.firstChild).toHaveClass("react-select--is-rtl");
  });

  test("isOptionSelected() prop > single select > mark value as isSelected if isOptionSelected returns true for the option", () => {
    // Select all but option with label '1'
    const isOptionSelected = vi.fn((option) => option.label !== "1");
    const { container } = render(
      <Select {...BASIC_PROPS} isOptionSelected={isOptionSelected} menuIsOpen />
    );
    const options = container.querySelectorAll(".react-select__option");

    // Option label 0 to be selected
    expect(options[0].classList).toContain("react-select__option--is-selected");
    // Option label 1 to be not selected
    expect(options[1].classList).not.toContain(
      "react-select__option--is-selected"
    );
  });

  test("isOptionSelected() prop > multi select > to not show the selected options in Menu for multiSelect", () => {
    // Select all but option with label '1'
    const isOptionSelected = vi.fn((option) => option.label !== "1");
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        isMulti
        isOptionSelected={isOptionSelected}
        menuIsOpen
      />
    );

    expect(container.querySelectorAll(".react-select__option")).toHaveLength(1);
    expect(container.querySelector(".react-select__option")!.textContent).toBe(
      "1"
    );
  });

  cases(
    "formatOptionLabel",
    ({ props, valueComponentSelector, expectedOptions }) => {
      const { container } = render(<Select {...props} />);
      const value = container.querySelector(valueComponentSelector);
      expect(value!.textContent).toBe(expectedOptions);
    },
    {
      "single select > should format label of options according to text returned by formatOptionLabel":
        {
          props: {
            ...BASIC_PROPS,
            formatOptionLabel: (
              { label, value }: Option,
              { context }: FormatOptionLabelMeta<Option>
            ) => `${label} ${value} ${context}`,
            value: OPTIONS[0],
          },
          valueComponentSelector: ".react-select__single-value",
          expectedOptions: "0 zero value",
        },
      "multi select > should format label of options according to text returned by formatOptionLabel":
        {
          props: {
            ...BASIC_PROPS,
            formatOptionLabel: (
              { label, value }: Option,
              { context }: FormatOptionLabelMeta<Option>
            ) => `${label} ${value} ${context}`,
            isMulti: true,
            value: OPTIONS[0],
          },
          valueComponentSelector: ".react-select__multi-value",
          expectedOptions: "0 zero value",
        },
    }
  );

  cases(
    "name prop",
    ({ expectedName, props }) => {
      const { container } = render(<Select {...props} />);
      const input =
        container.querySelector<HTMLInputElement>("input[type=hidden]");

      expect(input!.name).toBe(expectedName);
    },
    {
      "single select > should assign the given name": {
        props: { ...BASIC_PROPS, name: "form-field-single-select" },
        expectedName: "form-field-single-select",
      },
      "multi select > should assign the given name": {
        props: {
          ...BASIC_PROPS,
          name: "form-field-multi-select",
          isMulti: true,
          value: OPTIONS[2],
        },
        expectedName: "form-field-multi-select",
      },
    }
  );

  cases(
    "menuIsOpen prop",
    ({ props = BASIC_PROPS }) => {
      const { container, rerender } = render(<Select {...props} />);
      expect(container.querySelector(".react-select__menu")).toBeFalsy();

      rerender(<Select {...props} menuIsOpen />);
      expect(container.querySelector(".react-select__menu")).toBeTruthy();

      rerender(<Select {...props} />);
      expect(container.querySelector(".react-select__menu")).toBeFalsy();
    },
    {
      "single select > should show menu if menuIsOpen is true and hide menu if menuIsOpen prop is false":
        {},
      "multi select > should show menu if menuIsOpen is true and hide menu if menuIsOpen prop is false":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
          },
        },
    }
  );

  cases(
    "filterOption() prop - default filter behavior",
    ({ props, searchString, expectResultsLength }) => {
      const { container, rerender } = render(<Select {...props} />);
      rerender(<Select {...props} inputValue={searchString} />);
      expect(container.querySelectorAll(".react-select__option")).toHaveLength(
        expectResultsLength
      );
    },
    {
      "single select > should match accented char": {
        props: {
          ...BASIC_PROPS,
          menuIsOpen: true,
          options: OPTIONS_ACCENTED,
        },
        searchString: "ecole", // should match "école"
        expectResultsLength: 1,
      },
      "single select > should ignore accented char in query": {
        props: {
          ...BASIC_PROPS,
          menuIsOpen: true,
          options: OPTIONS_ACCENTED,
        },
        searchString: "schoöl", // should match "school"
        expectResultsLength: 1,
      },
    }
  );

  cases(
    "filterOption() prop - should filter only if function returns truthy for value",
    ({ props, searchString, expectResultsLength }) => {
      const { container, rerender } = render(<Select {...props} />);
      rerender(<Select {...props} inputValue={searchString} />);
      expect(container.querySelectorAll(".react-select__option")).toHaveLength(
        expectResultsLength
      );
    },
    {
      "single select > should filter all options as per searchString": {
        props: {
          ...BASIC_PROPS,
          filterOption: (value: FilterOptionOption<Option>, search: string) =>
            value.value.includes(search),
          menuIsOpen: true,
          value: OPTIONS[0],
        },
        searchString: "o",
        expectResultsLength: 5,
      },
      "multi select > should filter all options other that options in value of select":
        {
          props: {
            ...BASIC_PROPS,
            filterOption: (value: FilterOptionOption<Option>, search: string) =>
              value.value.includes(search),
            isMulti: true,
            menuIsOpen: true,
            value: OPTIONS[0],
          },
          searchString: "o",
          expectResultsLength: 4,
        },
    }
  );

  cases(
    "filterOption prop is null",
    ({ props, searchString, expectResultsLength }) => {
      const { container, rerender } = render(<Select {...props} />);
      rerender(<Select {...props} inputValue={searchString} />);
      expect(container.querySelectorAll(".react-select__option")).toHaveLength(
        expectResultsLength
      );
    },
    {
      "single select > should show all the options": {
        props: {
          ...BASIC_PROPS,
          filterOption: null,
          menuIsOpen: true,
          value: OPTIONS[0],
        },
        searchString: "o",
        expectResultsLength: 17,
      },
      "multi select > should show all the options other than selected options":
        {
          props: {
            ...BASIC_PROPS,
            filterOption: null,
            isMulti: true,
            menuIsOpen: true,
            value: OPTIONS[0],
          },
          searchString: "o",
          expectResultsLength: 16,
        },
    }
  );

  cases(
    "no option found on search based on filterOption prop",
    ({ props, searchString }) => {
      const { getByText, rerender } = render(<Select {...props} />);
      rerender(<Select {...props} inputValue={searchString} />);
      expect(getByText("No options").className).toContain(
        "menu-notice--no-options"
      );
    },
    {
      "single Select > should show NoOptionsMessage": {
        props: {
          ...BASIC_PROPS,
          filterOption: (value: FilterOptionOption<Option>, search: string) =>
            value.value.includes(search),
          menuIsOpen: true,
        },
        searchString: "some text not in options",
      },
      "multi select > should show NoOptionsMessage": {
        props: {
          ...BASIC_PROPS,
          filterOption: (value: FilterOptionOption<Option>, search: string) =>
            value.value.includes(search),
          menuIsOpen: true,
        },
        searchString: "some text not in options",
      },
    }
  );

  cases(
    "noOptionsMessage() function prop",
    ({ props, expectNoOptionsMessage, searchString }) => {
      const { getByText, rerender } = render(<Select {...props} />);
      rerender(<Select {...props} inputValue={searchString} />);
      expect(getByText(expectNoOptionsMessage).className).toContain(
        "menu-notice--no-options"
      );
    },
    {
      "single Select > should show NoOptionsMessage returned from noOptionsMessage function prop":
        {
          props: {
            ...BASIC_PROPS,
            filterOption: (value: FilterOptionOption<Option>, search: string) =>
              value.value.includes(search),
            menuIsOpen: true,
            noOptionsMessage: () =>
              "this is custom no option message for single select",
          },
          expectNoOptionsMessage:
            "this is custom no option message for single select",
          searchString: "some text not in options",
        },
      "multi select > should show NoOptionsMessage returned from noOptionsMessage function prop":
        {
          props: {
            ...BASIC_PROPS,
            filterOption: (value: FilterOptionOption<Option>, search: string) =>
              value.value.includes(search),
            menuIsOpen: true,
            noOptionsMessage: () =>
              "this is custom no option message for multi select",
          },
          expectNoOptionsMessage:
            "this is custom no option message for multi select",
          searchString: "some text not in options",
        },
    }
  );

  cases(
    "value prop",
    ({ props, expectedValue }) => {
      let value: unknown;
      render(
        <Select<Option | OptionNumberValue, boolean>
          {...props}
          components={{
            Control: ({ getValue }) => {
              value = getValue();
              return null;
            },
          }}
        />
      );
      expect(value).toStrictEqual(expectedValue);
    },
    {
      "single select > should set it as initial value": {
        props: {
          ...BASIC_PROPS,
          value: OPTIONS[2],
        },
        expectedValue: [{ label: "2", value: "two" }],
      },
      "single select > with option values as number > should set it as initial value":
        {
          props: {
            ...BASIC_PROPS,
            value: OPTIONS_NUMBER_VALUE[2],
          },
          expectedValue: [{ label: "2", value: 2 }],
        },
      "multi select > should set it as initial value": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
          value: OPTIONS[1],
        },
        expectedValue: [{ label: "1", value: "one" }],
      },
      "multi select > with option values as number > should set it as initial value":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            value: OPTIONS_NUMBER_VALUE[1],
          },
          expectedValue: [{ label: "1", value: 1 }],
        },
    }
  );

  cases(
    "update the value prop",
    ({
      props = { ...BASIC_PROPS, value: OPTIONS[1] },
      updateValueTo,
      expectedInitialValue,
      expectedUpdatedValue,
    }) => {
      const { container, rerender } = render(
        <Select<Option | OptionNumberValue, boolean> {...props} />
      );
      expect(
        container.querySelector<HTMLInputElement>('input[type="hidden"]')!.value
      ).toStrictEqual(expectedInitialValue);

      rerender(
        <Select<Option | OptionNumberValue, boolean>
          {...props}
          value={updateValueTo}
        />
      );

      expect(
        container.querySelector<HTMLInputElement>('input[type="hidden"]')!.value
      ).toStrictEqual(expectedUpdatedValue);
    },
    {
      "single select > should update the value when prop is updated": {
        updateValueTo: OPTIONS[3],
        expectedInitialValue: "one",
        expectedUpdatedValue: "three",
      },
      "single select > value of options is number > should update the value when prop is updated":
        {
          props: {
            ...BASIC_PROPS,
            options: OPTIONS_NUMBER_VALUE,
            value: OPTIONS_NUMBER_VALUE[2],
          },
          updateValueTo: OPTIONS_NUMBER_VALUE[3],
          expectedInitialValue: "2",
          expectedUpdatedValue: "3",
        },
      "multi select > should update the value when prop is updated": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
          value: OPTIONS[1],
        },
        updateValueTo: OPTIONS[3],
        expectedInitialValue: "one",
        expectedUpdatedValue: "three",
      },
      "multi select > value of options is number > should update the value when prop is updated":
        {
          props: {
            ...BASIC_PROPS,
            delimiter: ",",
            isMulti: true,
            options: OPTIONS_NUMBER_VALUE,
            value: OPTIONS_NUMBER_VALUE[2],
          },
          updateValueTo: [OPTIONS_NUMBER_VALUE[3], OPTIONS_NUMBER_VALUE[2]],
          expectedInitialValue: "2",
          expectedUpdatedValue: "3,2",
        },
    }
  );

  cases(
    "calls onChange on selecting an option",
    ({
      props = { ...BASIC_PROPS, menuIsOpen: true },
      event: [eventName, eventOptions],
      expectedSelectedOption,
      optionsSelected,
      focusedOption,
      expectedActionMetaOption,
    }) => {
      const onChangeSpy = vi.fn<() => void>();
      props = { ...props, onChange: onChangeSpy };
      const { container } = render(
        <Select<Option | OptionNumberValue | OptionBooleanValue, boolean>
          {...props}
        />
      );

      if (focusedOption) {
        focusOption(container, focusedOption, props.options);
      }

      const selectOption = [
        ...container.querySelectorAll("div.react-select__option"),
      ].find((n) => n.textContent === optionsSelected.label);

      fireEvent[eventName](selectOption!, eventOptions);
      expect(onChangeSpy).toHaveBeenCalledWith(expectedSelectedOption, {
        action: "select-option",
        option: expectedActionMetaOption,
        name: BASIC_PROPS.name,
      });
    },
    {
      "single select > option is clicked > should call onChange() prop with selected option":
        {
          event: ["click" as const] as const,
          optionsSelected: { label: "2", value: "two" },
          expectedSelectedOption: { label: "2", value: "two" },
        },
      "single select > option with number value > option is clicked > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
            options: OPTIONS_NUMBER_VALUE,
          },
          event: ["click" as const] as const,
          optionsSelected: { label: "0", value: 0 },
          expectedSelectedOption: { label: "0", value: 0 },
        },
      "single select > option with boolean value > option is clicked > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
            options: OPTIONS_BOOLEAN_VALUE,
          },
          event: ["click" as const] as const,
          optionsSelected: { label: "true", value: true },
          expectedSelectedOption: { label: "true", value: true },
        },
      "single select > tab key is pressed while focusing option > should call onChange() prop with selected option":
        {
          event: ["keyDown" as const, { keyCode: 9, key: "Tab" }] as const,
          optionsSelected: { label: "1", value: "one" },
          focusedOption: { label: "1", value: "one" },
          expectedSelectedOption: { label: "1", value: "one" },
        },
      "single select > enter key is pressed while focusing option > should call onChange() prop with selected option":
        {
          event: ["keyDown" as const, { keyCode: 13, key: "Enter" }] as const,
          optionsSelected: { label: "3", value: "three" },
          focusedOption: { label: "3", value: "three" },
          expectedSelectedOption: { label: "3", value: "three" },
        },
      "single select > space key is pressed while focusing option > should call onChange() prop with selected option":
        {
          event: ["keyDown" as const, { keyCode: 32, key: " " }] as const,
          optionsSelected: { label: "1", value: "one" },
          focusedOption: { label: "1", value: "one" },
          expectedSelectedOption: { label: "1", value: "one" },
        },
      "multi select > option is clicked > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            options: OPTIONS,
          },
          event: ["click" as const] as const,
          optionsSelected: { label: "2", value: "two" },
          expectedSelectedOption: [{ label: "2", value: "two" }],
          expectedActionMetaOption: { label: "2", value: "two" },
        },
      "multi select > option with number value > option is clicked > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            options: OPTIONS_NUMBER_VALUE,
          },
          event: ["click" as const] as const,
          optionsSelected: { label: "0", value: 0 },
          expectedSelectedOption: [{ label: "0", value: 0 }],
          expectedActionMetaOption: { label: "0", value: 0 },
        },
      "multi select > option with boolean value > option is clicked > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            options: OPTIONS_BOOLEAN_VALUE,
          },
          event: ["click" as const] as const,
          optionsSelected: { label: "true", value: true },
          expectedSelectedOption: [{ label: "true", value: true }],
          expectedActionMetaOption: { label: "true", value: true },
        },
      "multi select > tab key is pressed while focusing option > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            options: OPTIONS,
          },
          event: ["keyDown" as const, { keyCode: 9, key: "Tab" }] as const,
          menuIsOpen: true,
          optionsSelected: { label: "1", value: "one" },
          focusedOption: { label: "1", value: "one" },
          expectedSelectedOption: [{ label: "1", value: "one" }],
          expectedActionMetaOption: { label: "1", value: "one" },
        },
      "multi select > enter key is pressed while focusing option > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            options: OPTIONS,
          },
          event: ["keyDown" as const, { keyCode: 13, key: "Enter" }] as const,
          optionsSelected: { label: "3", value: "three" },
          focusedOption: { label: "3", value: "three" },
          expectedSelectedOption: [{ label: "3", value: "three" }],
          expectedActionMetaOption: { label: "3", value: "three" },
        },
      "multi select > space key is pressed while focusing option > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            options: OPTIONS,
          },
          event: ["keyDown" as const, { keyCode: 32, key: " " }] as const,
          optionsSelected: { label: "1", value: "one" },
          focusedOption: { label: "1", value: "one" },
          expectedSelectedOption: [{ label: "1", value: "one" }],
          expectedActionMetaOption: { label: "1", value: "one" },
        },
    }
  );

  interface CallsOnChangeOnDeselectOptsProps extends Omit<
    BasicProps,
    "options" | "value"
  > {
    readonly options: readonly (
      | Option
      | OptionNumberValue
      | OptionBooleanValue
    )[];
    readonly value:
      | readonly Option[]
      | readonly OptionNumberValue[]
      | readonly OptionBooleanValue[]
      | Option;
    readonly menuIsOpen?: boolean;
    readonly hideSelectedOptions?: boolean;
    readonly isMulti?: boolean;
  }

  interface CallsOnOnDeselectChangeOpts {
    readonly props: CallsOnChangeOnDeselectOptsProps;
    readonly event:
      | readonly [EventType]
      | readonly [EventType, Record<string, unknown>];
    readonly menuIsOpen?: boolean;
    readonly optionsSelected: Option | OptionNumberValue | OptionBooleanValue;
    readonly focusedOption?: Option | OptionNumberValue | OptionBooleanValue;
    readonly expectedSelectedOption:
      | readonly Option[]
      | readonly OptionNumberValue[]
      | readonly OptionBooleanValue[];
    readonly expectedMetaOption:
      | Option
      | OptionNumberValue
      | OptionBooleanValue;
  }

  cases<CallsOnOnDeselectChangeOpts>(
    "calls onChange on de-selecting an option in multi select",
    ({
      props,
      event: [eventName, eventOptions],
      expectedSelectedOption,
      expectedMetaOption,
      optionsSelected,
      focusedOption,
    }) => {
      const onChangeSpy = vi.fn<() => void>();
      props = {
        ...props,
        onChange: onChangeSpy,
        menuIsOpen: true,
        hideSelectedOptions: false,
        isMulti: true,
      };
      const { container } = render(
        <Select<Option | OptionNumberValue | OptionBooleanValue, boolean>
          {...props}
        />
      );

      const selectOption = [
        ...container.querySelectorAll("div.react-select__option"),
      ].find((n) => n.textContent === optionsSelected.label);
      if (focusedOption) {
        focusOption(container, focusedOption, props.options);
      }
      fireEvent[eventName](selectOption!, eventOptions);
      expect(onChangeSpy).toHaveBeenCalledWith(expectedSelectedOption, {
        action: "deselect-option",
        option: expectedMetaOption,
        name: BASIC_PROPS.name,
      });
    },
    {
      "option is clicked > should call onChange() prop with correct selected options and meta":
        {
          props: {
            ...BASIC_PROPS,
            options: OPTIONS,
            value: [{ label: "2", value: "two" }],
          },
          event: ["click"],
          optionsSelected: { label: "2", value: "two" },
          expectedSelectedOption: [],
          expectedMetaOption: { label: "2", value: "two" },
        },
      "option with number value > option is clicked > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            options: OPTIONS_NUMBER_VALUE,
            value: [{ label: "0", value: 0 }],
          },
          event: ["click"],
          optionsSelected: { label: "0", value: 0 },
          expectedSelectedOption: [],
          expectedMetaOption: { label: "0", value: 0 },
        },
      "option with boolean value > option is clicked > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            options: OPTIONS_BOOLEAN_VALUE,
            value: [{ label: "true", value: true }],
          },
          event: ["click"],
          optionsSelected: { label: "true", value: true },
          expectedSelectedOption: [],
          expectedMetaOption: { label: "true", value: true },
        },
      "tab key is pressed while focusing option > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            options: OPTIONS,
            value: [{ label: "1", value: "one" }],
          },
          event: ["keyDown", { keyCode: 9, key: "Tab" }],
          menuIsOpen: true,
          optionsSelected: { label: "1", value: "one" },
          focusedOption: { label: "1", value: "one" },
          expectedSelectedOption: [],
          expectedMetaOption: { label: "1", value: "one" },
        },
      "enter key is pressed while focusing option > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            options: OPTIONS,
            value: { label: "3", value: "three" },
          },
          event: ["keyDown", { keyCode: 13, key: "Enter" }],
          optionsSelected: { label: "3", value: "three" },
          focusedOption: { label: "3", value: "three" },
          expectedSelectedOption: [],
          expectedMetaOption: { label: "3", value: "three" },
        },
      "space key is pressed while focusing option > should call onChange() prop with selected option":
        {
          props: {
            ...BASIC_PROPS,
            options: OPTIONS,
            value: [{ label: "1", value: "one" }],
          },
          event: ["keyDown", { keyCode: 32, key: " " }],
          optionsSelected: { label: "1", value: "one" },
          focusedOption: { label: "1", value: "one" },
          expectedSelectedOption: [],
          expectedMetaOption: { label: "1", value: "one" },
        },
    }
  );

  const focusOption = (
    container: HTMLElement,
    option: Option | OptionNumberValue | OptionBooleanValue,
    options: readonly (Option | OptionNumberValue | OptionBooleanValue)[]
  ) => {
    const indexOfSelectedOption = options.findIndex(
      (o) => o.value === option.value
    );

    for (let i = -1; i < indexOfSelectedOption; i++) {
      fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
        keyCode: 40,
        key: "ArrowDown",
      });
    }
    expect(
      container.querySelector(".react-select__option--is-focused")!.textContent
    ).toStrictEqual(option.label);
  };

  cases(
    "hitting escape on select option",
    ({
      props,
      event: [eventName, eventOptions],
      focusedOption,
      optionsSelected,
    }) => {
      const onChangeSpy = vi.fn<() => void>();
      const { container } = render(
        <Select
          {...props}
          onChange={onChangeSpy}
          onInputChange={vi.fn<() => void>()}
          onMenuClose={vi.fn<() => void>()}
        />
      );

      const selectOption = [
        ...container.querySelectorAll("div.react-select__option"),
      ].find((n) => n.textContent === optionsSelected.label);
      focusOption(container, focusedOption, props.options);

      fireEvent[eventName](selectOption!, eventOptions);
      expect(onChangeSpy).not.toHaveBeenCalled();
    },
    {
      "single select > should not call onChange prop": {
        props: {
          ...BASIC_PROPS,
          menuIsOpen: true,
        },
        optionsSelected: { label: "1", value: "one" },
        focusedOption: { label: "1", value: "one" },
        event: ["keyDown" as const, { keyCode: 27 }] as const,
      },
      "multi select > should not call onChange prop": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
          menuIsOpen: true,
        },
        optionsSelected: { label: "1", value: "one" },
        focusedOption: { label: "1", value: "one" },
        event: ["keyDown" as const, { keyCode: 27 }] as const,
      },
    }
  );

  cases(
    "click to open select",
    async ({ props = BASIC_PROPS, expectedToFocus }) => {
      const { container, rerender } = render(
        <Select
          {...props}
          onMenuOpen={() => {
            rerender(<Select {...props} menuIsOpen onMenuOpen={noop} />);
          }}
        />
      );

      const user = userEvent.setup();
      await user.pointer({
        keys: "[MouseLeft>]",
        target: container.querySelector(".react-select__dropdown-indicator")!,
      });

      expect(
        container.querySelector(".react-select__option--is-focused")!
          .textContent
      ).toStrictEqual(expectedToFocus.label);
    },
    {
      "single select > should focus the first option": {
        expectedToFocus: { label: "0", value: "zero" },
      },
      "multi select > should focus the first option": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
        },
        expectedToFocus: { label: "0", value: "zero" },
      },
    }
  );

  test("clicking when focused does not open select when openMenuOnClick=false", async () => {
    const spy = vi.fn<() => void>();
    const { container } = render(
      <Select {...BASIC_PROPS} openMenuOnClick={false} onMenuOpen={spy} />
    );

    // this will get updated on input click, though click on input is not bubbling up to control component
    await userEvent.click(
      container.querySelector("input.react-select__input")!
    );
    expect(spy).not.toHaveBeenCalled();
  });

  cases(
    "focus on options > keyboard interaction with Menu",
    ({ props, selectedOption, nextFocusOption, keyEvent = [] }) => {
      const { container } = render(<Select {...props} />);

      const indexOfSelectedOption = props.options.indexOf(selectedOption);

      for (let i = -1; i < indexOfSelectedOption; i++) {
        fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
          keyCode: 40,
          key: "ArrowDown",
        });
      }

      expect(
        container.querySelector(".react-select__option--is-focused")!
          .textContent
      ).toStrictEqual(selectedOption.label);

      for (const event of keyEvent) {
        fireEvent.keyDown(
          container.querySelector(".react-select__menu")!,
          event
        );
      }

      expect(
        container.querySelector(".react-select__option--is-focused")!
          .textContent
      ).toStrictEqual(nextFocusOption.label);
    },
    {
      "single select > ArrowDown key on first option should focus second option":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
          },
          keyEvent: [{ keyCode: 40, key: "ArrowDown" }],
          selectedOption: OPTIONS[0],
          nextFocusOption: OPTIONS[1],
        },
      "single select > ArrowDown key on last option should focus first option":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 40, key: "ArrowDown" }],
          selectedOption: OPTIONS[OPTIONS.length - 1],
          nextFocusOption: OPTIONS[0],
        },
      "single select > ArrowUp key on first option should focus last option": {
        props: {
          ...BASIC_PROPS,
          menuIsOpen: true,
          options: OPTIONS,
        },
        keyEvent: [{ keyCode: 38, key: "ArrowUp" }],
        selectedOption: OPTIONS[0],
        nextFocusOption: OPTIONS[OPTIONS.length - 1],
      },
      "single select > ArrowUp key on last option should focus second last option":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 38, key: "ArrowUp" }],
          selectedOption: OPTIONS[OPTIONS.length - 1],
          nextFocusOption: OPTIONS[OPTIONS.length - 2],
        },
      "single select > disabled options should be focusable": {
        props: {
          ...BASIC_PROPS,
          menuIsOpen: true,
          options: OPTIONS_DISABLED,
        },
        keyEvent: [{ keyCode: 40, key: "ArrowDown" }],
        selectedOption: OPTIONS_DISABLED[0],
        nextFocusOption: OPTIONS_DISABLED[1],
      },
      "single select > PageDown key takes us to next page with default page size of 5":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 34, key: "PageDown" }],
          selectedOption: OPTIONS[0],
          nextFocusOption: OPTIONS[5],
        },
      "single select > PageDown key takes us to next page with custom pageSize 7":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
            pageSize: 7,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 34, key: "PageDown" }],
          selectedOption: OPTIONS[0],
          nextFocusOption: OPTIONS[7],
        },
      "single select > PageDown key takes to the last option is options below is less then page size":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 34, key: "PageDown" }],
          selectedOption: OPTIONS[OPTIONS.length - 3],
          nextFocusOption: OPTIONS[OPTIONS.length - 1],
        },
      "single select > PageUp key takes us to previous page with default page size of 5":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 33, key: "PageUp" }],
          selectedOption: OPTIONS[6],
          nextFocusOption: OPTIONS[1],
        },
      "single select > PageUp key takes us to previous page with custom pageSize of 7":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
            pageSize: 7,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 33, key: "PageUp" }],
          selectedOption: OPTIONS[9],
          nextFocusOption: OPTIONS[2],
        },
      "single select > PageUp key takes us to first option - (previous options < pageSize)":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 33, key: "PageUp" }],
          selectedOption: OPTIONS[1],
          nextFocusOption: OPTIONS[0],
        },
      "single select > Home key takes up to the first option": {
        props: {
          ...BASIC_PROPS,
          menuIsOpen: true,
          options: OPTIONS,
        },
        keyEvent: [{ keyCode: 36, key: "Home" }],
        selectedOption: OPTIONS[OPTIONS.length - 3],
        nextFocusOption: OPTIONS[0],
      },
      "single select > End key takes down to the last option": {
        props: {
          ...BASIC_PROPS,
          menuIsOpen: true,
          options: OPTIONS,
        },
        keyEvent: [{ keyCode: 35, key: "End" }],
        selectedOption: OPTIONS[2],
        nextFocusOption: OPTIONS[OPTIONS.length - 1],
      },
      "multi select > ArrowDown key on first option should focus second option":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 40, key: "ArrowDown" }],
          selectedOption: OPTIONS[0],
          nextFocusOption: OPTIONS[1],
        },
      "multi select > ArrowDown key on last option should focus first option": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
          menuIsOpen: true,
          options: OPTIONS,
        },
        keyEvent: [{ keyCode: 40, key: "ArrowDown" }],
        selectedOption: OPTIONS[OPTIONS.length - 1],
        nextFocusOption: OPTIONS[0],
      },
      "multi select > ArrowUp key on first option should focus last option": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
          menuIsOpen: true,
          options: OPTIONS,
        },
        keyEvent: [{ keyCode: 38, key: "ArrowUp" }],
        selectedOption: OPTIONS[0],
        nextFocusOption: OPTIONS[OPTIONS.length - 1],
      },
      "multi select > ArrowUp key on last option should focus second last option":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 38, key: "ArrowUp" }],
          selectedOption: OPTIONS[OPTIONS.length - 1],
          nextFocusOption: OPTIONS[OPTIONS.length - 2],
        },
      "multi select > PageDown key takes us to next page with default page size of 5":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 34, key: "PageDown" }],
          selectedOption: OPTIONS[0],
          nextFocusOption: OPTIONS[5],
        },
      "multi select > PageDown key takes us to next page with custom pageSize of 8":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            pageSize: 8,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 34, key: "PageDown" }],
          selectedOption: OPTIONS[0],
          nextFocusOption: OPTIONS[8],
        },
      "multi select > PageDown key takes to the last option is options below is less then page size":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 34, key: "PageDown" }],
          selectedOption: OPTIONS[OPTIONS.length - 3],
          nextFocusOption: OPTIONS[OPTIONS.length - 1],
        },
      "multi select > PageUp key takes us to previous page with default page size of 5":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 33, key: "PageUp" }],
          selectedOption: OPTIONS[6],
          nextFocusOption: OPTIONS[1],
        },
      "multi select > PageUp key takes us to previous page with default page size of 9":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            pageSize: 9,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 33, key: "PageUp" }],
          selectedOption: OPTIONS[10],
          nextFocusOption: OPTIONS[1],
        },
      "multi select > PageUp key takes us to first option - previous options < pageSize":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            options: OPTIONS,
          },
          keyEvent: [{ keyCode: 33, key: "PageUp" }],
          selectedOption: OPTIONS[1],
          nextFocusOption: OPTIONS[0],
        },
      "multi select > Home key takes up to the first option": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
          menuIsOpen: true,
          options: OPTIONS,
        },
        keyEvent: [{ keyCode: 36, key: "Home" }],
        selectedOption: OPTIONS[OPTIONS.length - 3],
        nextFocusOption: OPTIONS[0],
      },
      "multi select > End key takes down to the last option": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
          menuIsOpen: true,
          options: OPTIONS,
        },
        keyEvent: [{ keyCode: 35, key: "End" }],
        selectedOption: OPTIONS[2],
        nextFocusOption: OPTIONS[OPTIONS.length - 1],
      },
    }
  );

  // TODO: Cover more scenarios
  cases(
    "hitting escape with inputValue in select",
    ({ props }) => {
      const spy = vi.fn<() => void>();
      const { container } = render(
        <Select
          {...props}
          onInputChange={spy}
          onMenuClose={vi.fn<() => void>()}
        />
      );

      fireEvent.keyDown(container.querySelector(".react-select")!, {
        keyCode: 27,
        key: "Escape",
      });
      expect(spy).toHaveBeenCalledWith("", {
        action: "menu-close",
        prevInputValue: "test",
      });
    },
    {
      "single select > should call onInputChange prop with empty string as inputValue":
        {
          props: {
            ...BASIC_PROPS,
            inputValue: "test",
            menuIsOpen: true,
            value: OPTIONS[0],
          },
        },
      "multi select > should call onInputChange prop with empty string as inputValue":
        {
          props: {
            ...BASIC_PROPS,
            inputValue: "test",
            isMulti: true,
            menuIsOpen: true,
            value: OPTIONS[0],
          },
        },
    }
  );

  cases(
    "Clicking dropdown indicator on select with closed menu with primary button on mouse",
    ({ props = BASIC_PROPS }) => {
      const onMenuOpenSpy = vi.fn<() => void>();
      props = { ...props, onMenuOpen: onMenuOpenSpy };
      const { container } = render(<Select {...props} />);
      // Menu is closed
      expect(
        container.querySelector(".react-select__menu")
      ).not.toBeInTheDocument();
      fireEvent.mouseDown(
        container.querySelector("div.react-select__dropdown-indicator")!,
        { button: 0 }
      );
      expect(onMenuOpenSpy).toHaveBeenCalled();
    },
    {
      "single select > should call onMenuOpen prop when select is opened and onMenuClose prop when select is closed":
        {},
      "multi select > should call onMenuOpen prop when select is opened and onMenuClose prop when select is closed":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
          },
        },
    }
  );

  cases(
    "Clicking dropdown indicator on select with open menu with primary button on mouse",
    ({ props = BASIC_PROPS }) => {
      const onMenuCloseSpy = vi.fn<() => void>();
      props = { ...props, onMenuClose: onMenuCloseSpy };
      const { container } = render(<Select {...props} menuIsOpen />);
      // Menu is open
      expect(
        container.querySelector(".react-select__menu")
      ).toBeInTheDocument();
      fireEvent.mouseDown(
        container.querySelector("div.react-select__dropdown-indicator")!,
        { button: 0 }
      );
      expect(onMenuCloseSpy).toHaveBeenCalled();
    },
    {
      "single select > should call onMenuOpen prop when select is opened and onMenuClose prop when select is closed":
        {},
      "multi select > should call onMenuOpen prop when select is opened and onMenuClose prop when select is closed":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
          },
        },
    }
  );

  interface ClickingEnterOptsProps extends BasicProps {
    readonly menuIsOpen?: boolean;
  }

  interface ClickingEnterOpts {
    readonly props: ClickingEnterOptsProps;
    readonly expectedValue: boolean;
  }

  cases<ClickingEnterOpts>(
    "Clicking Enter on a focused select",
    ({ props, expectedValue }) => {
      // Definite-assignment assertion used because event is set inside the
      // onKeyDown callback below.
      let event!: KeyboardEvent<HTMLDivElement>;
      const { container } = render(
        <div
          role="presentation"
          onKeyDown={(_event) => {
            event = _event;
            event.persist();
          }}
        >
          <Select {...props} />
        </div>
      );
      if (props.menuIsOpen) {
        fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
          keyCode: 40,
          key: "ArrowDown",
        });
      }

      fireEvent.keyDown(container.querySelector(".react-select")!, {
        key: "Enter",
        keyCode: 13,
      });
      expect(event.defaultPrevented).toBe(expectedValue);
    },
    {
      "while menuIsOpen && focusedOption && !isComposing  > should invoke event.preventDefault":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
          },
          expectedValue: true,
        },
      "while !menuIsOpen > should not invoke event.preventDefault": {
        props: {
          ...BASIC_PROPS,
        },
        expectedValue: false,
      },
    }
  );

  // Upstream's own QUESTION comment, copied verbatim:
  //   "Is this test right? I tried right clicking on the dropdown indicator
  //    in a browser and the select opened but this test says it shouldn't?"
  // Both individual cases are marked `skip: true` in the case data below —
  // see src/tests/cases.ts, which honors that flag (jest-in-case API).
  // https://github.com/JedWatson/react-select/blob/react-select%405.10.2/packages/react-select/src/__tests__/Select.test.tsx#L1433
  cases(
    "clicking on select using secondary button on mouse",
    ({ props = BASIC_PROPS }) => {
      const onMenuOpenSpy = vi.fn<() => void>();
      const onMenuCloseSpy = vi.fn<() => void>();
      const { container, rerender } = render(
        <Select
          {...props}
          onMenuClose={onMenuCloseSpy}
          onMenuOpen={onMenuOpenSpy}
        />
      );
      const downButton = container.querySelector(
        "div.react-select__dropdown-indicator"
      );

      // does not open menu if menu is closed
      fireEvent.mouseDown(downButton!, { button: 1 });
      expect(onMenuOpenSpy).not.toHaveBeenCalled();

      // does not close menu if menu is opened
      rerender(
        <Select
          {...props}
          menuIsOpen
          onMenuClose={onMenuCloseSpy}
          onMenuOpen={onMenuOpenSpy}
        />
      );
      fireEvent.mouseDown(downButton!, { button: 1 });
      expect(onMenuCloseSpy).not.toHaveBeenCalled();
    },
    {
      "single select > secondary click is ignored > should not call onMenuOpen and onMenuClose prop":
        {
          skip: true,
        },
      "multi select > secondary click is ignored > should not call onMenuOpen and onMenuClose prop":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
          },
          skip: true,
        },
    }
  );

  interface RequiredOnInputOpts {
    readonly props?: BasicProps;
    readonly isMulti?: boolean;
  }

  cases<RequiredOnInputOpts>(
    "required on input is not there by default",
    ({ props = BASIC_PROPS }) => {
      const { container } = render(
        <Select {...props} onInputChange={vi.fn<() => void>()} />
      );
      const input = container.querySelector<HTMLInputElement>(
        "input.react-select__input"
      );
      expect(input!.required).toBe(false);
    },
    {
      "single select > should not have required attribute": {},
      "multi select > should not have required attribute": { isMulti: true },
    }
  );

  cases(
    "value of hidden input control",
    ({ props, expectedValue }) => {
      const { container } = render(
        <Select<Option | OptionNumberValue | OptionBooleanValue, boolean>
          {...props}
        />
      );
      const hiddenInput = container.querySelector<HTMLInputElement>(
        'input[type="hidden"]'
      );
      expect(hiddenInput!.value).toStrictEqual(expectedValue);
    },
    {
      "single select > should set value of input as value prop": {
        props: {
          ...BASIC_PROPS,
          value: OPTIONS[3],
        },
        expectedValue: "three",
      },
      "single select > options with number values > should set value of input as value prop":
        {
          props: {
            ...BASIC_PROPS,
            options: OPTIONS_NUMBER_VALUE,
            value: OPTIONS_NUMBER_VALUE[3],
          },
          expectedValue: "3",
        },
      "single select > options with boolean values > should set value of input as value prop":
        {
          props: {
            ...BASIC_PROPS,
            options: OPTIONS_BOOLEAN_VALUE,
            value: OPTIONS_BOOLEAN_VALUE[1],
          },
          expectedValue: "false",
        },
      "multi select > should set value of input as value prop": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
          value: OPTIONS[3],
        },
        expectedValue: "three",
      },
      "multi select > with delimiter prop > should set value of input as value prop":
        {
          props: {
            ...BASIC_PROPS,
            delimiter: ", ",
            isMulti: true,
            value: [OPTIONS[3], OPTIONS[5]],
          },
          expectedValue: "three, five",
        },
      "multi select > options with number values > should set value of input as value prop":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            options: OPTIONS_NUMBER_VALUE,
            value: OPTIONS_NUMBER_VALUE[3],
          },
          expectedValue: "3",
        },
      "multi select > with delimiter prop > options with number values > should set value of input as value prop":
        {
          props: {
            ...BASIC_PROPS,
            delimiter: ", ",
            isMulti: true,
            options: OPTIONS_NUMBER_VALUE,
            value: [OPTIONS_NUMBER_VALUE[3], OPTIONS_NUMBER_VALUE[1]],
          },
          expectedValue: "3, 1",
        },
      "multi select > options with boolean values > should set value of input as value prop":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            options: OPTIONS_BOOLEAN_VALUE,
            value: OPTIONS_BOOLEAN_VALUE[1],
          },
          expectedValue: "false",
        },
      "multi select > with delimiter prop > options with boolean values > should set value of input as value prop":
        {
          props: {
            ...BASIC_PROPS,
            delimiter: ", ",
            isMulti: true,
            options: OPTIONS_BOOLEAN_VALUE,
            value: [OPTIONS_BOOLEAN_VALUE[1], OPTIONS_BOOLEAN_VALUE[0]],
          },
          expectedValue: "false, true",
        },
    }
  );

  cases(
    "isOptionDisabled() prop",
    ({ props, expectedEnabledOption, expectedDisabledOption }) => {
      const { container } = render(<Select {...props} />);

      const enabledOptionsValues = [
        ...container.querySelectorAll(".react-select__option"),
      ]
        .filter(
          (n) => !n.classList.contains("react-select__option--is-disabled")
        )
        .map((option) => option.textContent);

      for (const option of enabledOptionsValues) {
        expect(expectedDisabledOption).not.toContain(option);
      }

      const disabledOptionsValues = [
        ...container.querySelectorAll(".react-select__option"),
      ]
        .filter((n) =>
          n.classList.contains("react-select__option--is-disabled")
        )
        .map((option) => option.textContent);

      for (const option of disabledOptionsValues) {
        expect(expectedEnabledOption).not.toContain(option);
      }
    },
    {
      "single select > should add isDisabled as true prop only to options that are disabled":
        {
          props: {
            ...BASIC_PROPS,
            menuIsOpen: true,
            isOptionDisabled: (option: Option) =>
              ["zero", "two", "five", "ten"].includes(option.value),
          },
          expectedEnabledOption: ["1", "3", "11"],
          expectedDisabledOption: ["0", "2", "5"],
        },
      "multi select > should add isDisabled as true prop only to options that are disabled":
        {
          props: {
            ...BASIC_PROPS,
            isMulti: true,
            menuIsOpen: true,
            isOptionDisabled: (option: Option) =>
              ["zero", "two", "five", "ten"].includes(option.value),
          },
          expectedEnabledOption: ["1", "3", "11"],
          expectedDisabledOption: ["0", "2", "5"],
        },
    }
  );

  cases(
    "isDisabled prop",
    ({ props }) => {
      const { container } = render(<Select {...props} />);

      const control = container.querySelector(".react-select__control");
      expect(
        control!.classList.contains("react-select__control--is-disabled")
      ).toBeTruthy();

      const input = container.querySelector<HTMLInputElement>(
        ".react-select__control input"
      );
      expect(input!.disabled).toBeTruthy();
    },
    {
      "single select > should add isDisabled prop to select components": {
        props: {
          ...BASIC_PROPS,
          isDisabled: true,
        },
      },
      "multi select > should add isDisabled prop to select components": {
        props: {
          ...BASIC_PROPS,
          isDisabled: true,
          isMulti: true,
        },
      },
    }
  );

  test("hitting Enter on option should not call onChange if the event comes from IME", () => {
    const spy = vi.fn<() => void>();
    const { container } = render(
      <Select
        className="react-select"
        classNamePrefix="react-select"
        menuIsOpen
        onChange={spy}
        onInputChange={vi.fn<() => void>()}
        onMenuClose={vi.fn<() => void>()}
        onMenuOpen={vi.fn<() => void>()}
        options={OPTIONS}
        tabSelectsValue={false}
        inputValue=""
        value={null}
      />
    );

    const selectOption = container.querySelector("div.react-select__option");
    const menu = container.querySelector(".react-select__menu");
    fireEvent.keyDown(menu!, { keyCode: 40, key: "ArrowDown" });
    fireEvent.keyDown(menu!, { keyCode: 40, key: "ArrowDown" });

    fireEvent.keyDown(selectOption!, { keyCode: 229, key: "Enter" });

    expect(spy).not.toHaveBeenCalled();
  });

  test("hitting tab on option should not call onChange if tabSelectsValue is false", () => {
    const spy = vi.fn<() => void>();
    const { container } = render(
      <Select
        className="react-select"
        classNamePrefix="react-select"
        menuIsOpen
        onChange={spy}
        onInputChange={vi.fn<() => void>()}
        onMenuClose={vi.fn<() => void>()}
        onMenuOpen={vi.fn<() => void>()}
        options={OPTIONS}
        tabSelectsValue={false}
        inputValue=""
        value={null}
      />
    );

    const selectOption = container.querySelector("div.react-select__option");
    const menu = container.querySelector(".react-select__menu");
    fireEvent.keyDown(menu!, { keyCode: 40, key: "ArrowDown" });
    fireEvent.keyDown(menu!, { keyCode: 40, key: "ArrowDown" });

    fireEvent.keyDown(selectOption!, { keyCode: 9, key: "Tab" });
    expect(spy).not.toHaveBeenCalled();
  });

  test("multi select > to not show selected value in options", () => {
    const onInputChangeSpy = vi.fn<() => void>();
    const onMenuCloseSpy = vi.fn<() => void>();
    const { container, rerender } = render(
      <Select
        {...BASIC_PROPS}
        isMulti
        menuIsOpen
        onInputChange={onInputChangeSpy}
        onMenuClose={onMenuCloseSpy}
      />
    );

    let availableOptions = [
      ...container.querySelectorAll(".react-select__option"),
    ].map((option) => option.textContent);
    expect(availableOptions.includes("0")).toBeTruthy();

    rerender(
      <Select
        {...BASIC_PROPS}
        isMulti
        menuIsOpen
        onInputChange={onInputChangeSpy}
        onMenuClose={onMenuCloseSpy}
        value={OPTIONS[0]}
      />
    );

    // Re-open Menu
    fireEvent.mouseDown(
      container.querySelector("div.react-select__dropdown-indicator")!,
      {
        button: 0,
      }
    );
    availableOptions = [
      ...container.querySelectorAll(".react-select__option"),
    ].map((option) => option.textContent);

    expect(availableOptions.includes("0")).toBeFalsy();
  });

  test("multi select > to not hide the selected options from the menu if hideSelectedOptions is false", async () => {
    const { container } = render(
      <Select
        className="react-select"
        classNamePrefix="react-select"
        hideSelectedOptions={false}
        isMulti
        menuIsOpen
        onChange={vi.fn<() => void>()}
        onInputChange={vi.fn<() => void>()}
        onMenuClose={vi.fn<() => void>()}
        onMenuOpen={vi.fn<() => void>()}
        options={OPTIONS}
        inputValue=""
        value={null}
      />
    );
    const [firstOption, secondoption] = container.querySelectorAll(
      ".react-select__option"
    );
    expect(firstOption.textContent).toBe("0");
    expect(secondoption.textContent).toBe("1");

    await userEvent.click(firstOption);

    expect(firstOption.textContent).toBe("0");
    expect(secondoption.textContent).toBe("1");
  });

  test("multi select > call onChange with all values but last selected value and remove event on hitting backspace", () => {
    const onChangeSpy = vi.fn<() => void>();
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        isMulti
        onChange={onChangeSpy}
        value={[OPTIONS[0], OPTIONS[1], OPTIONS[2]]}
      />
    );
    expect(container.querySelector(".react-select__control")!.textContent).toBe(
      "012"
    );

    fireEvent.keyDown(container.querySelector(".react-select__control")!, {
      keyCode: 8,
      key: "Backspace",
    });
    expect(onChangeSpy).toHaveBeenCalledWith(
      [
        { label: "0", value: "zero" },
        { label: "1", value: "one" },
      ],
      {
        action: "pop-value",
        removedValue: { label: "2", value: "two" },
        name: BASIC_PROPS.name,
      }
    );
  });

  test("should not call onChange on hitting backspace when backspaceRemovesValue is false", () => {
    const onChangeSpy = vi.fn<() => void>();
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        backspaceRemovesValue={false}
        onChange={onChangeSpy}
      />
    );
    fireEvent.keyDown(container.querySelector(".react-select__control")!, {
      keyCode: 8,
      key: "Backspace",
    });
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  test("should not call onChange on hitting backspace even when backspaceRemovesValue is true if isClearable is false", () => {
    const onChangeSpy = vi.fn<() => void>();
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        backspaceRemovesValue
        isClearable={false}
        onChange={onChangeSpy}
      />
    );
    fireEvent.keyDown(container.querySelector(".react-select__control")!, {
      keyCode: 8,
      key: "Backspace",
    });
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  test("should call onChange with `null` on hitting backspace when backspaceRemovesValue is true and isMulti is false", () => {
    const onChangeSpy = vi.fn<() => void>();
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        backspaceRemovesValue
        isClearable
        isMulti={false}
        onChange={onChangeSpy}
      />
    );
    fireEvent.keyDown(container.querySelector(".react-select__control")!, {
      keyCode: 8,
      key: "Backspace",
    });
    expect(onChangeSpy).toHaveBeenCalledWith(null, {
      action: "clear",
      name: "test-input-name",
      removedValues: [],
    });
  });

  test("should call onChange with an array on hitting backspace when backspaceRemovesValue is true and isMulti is true", () => {
    const onChangeSpy = vi.fn<() => void>();
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        backspaceRemovesValue
        isClearable
        isMulti
        onChange={onChangeSpy}
        value={[OPTIONS[0]]}
      />
    );
    fireEvent.keyDown(container.querySelector(".react-select__control")!, {
      keyCode: 8,
      key: "Backspace",
    });
    expect(onChangeSpy).toHaveBeenCalledWith([], {
      action: "pop-value",
      name: "test-input-name",
      removedValue: OPTIONS[0],
    });
  });

  test("should call not call onChange on hitting backspace when backspaceRemovesValue is true and isMulti is true and there are no values", () => {
    const onChangeSpy = vi.fn<() => void>();
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        backspaceRemovesValue
        isClearable
        isMulti
        onChange={onChangeSpy}
      />
    );
    fireEvent.keyDown(container.querySelector(".react-select__control")!, {
      keyCode: 8,
      key: "Backspace",
    });
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  test("multi select > clicking on X next to option will call onChange with all options other that the clicked option", async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn<() => void>();
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        isMulti
        onChange={onChangeSpy}
        value={[OPTIONS[0], OPTIONS[2], OPTIONS[4]]}
      />
    );
    // there are 3 values in select
    expect(
      container.querySelectorAll(".react-select__multi-value")
    ).toHaveLength(3);

    const selectValueElement = [
      ...container.querySelectorAll(".react-select__multi-value"),
    ].find((multiValue) => multiValue.textContent === "4");
    // Upstream queries `div.react-select__multi-value__remove`; this package
    // renders the remove element as a <span> (via Chakra's Span component),
    // so the tag-restricted selector returns null. The class is on the right
    // element with the correct handlers — use a tag-agnostic selector.
    await user.click(
      selectValueElement!.querySelector(".react-select__multi-value__remove")!
    );

    expect(onChangeSpy).toHaveBeenCalledWith(
      [
        { label: "0", value: "zero" },
        { label: "2", value: "two" },
      ],
      {
        action: "remove-value",
        removedValue: { label: "4", value: "four" },
        name: BASIC_PROPS.name,
      }
    );
  });

  cases(
    "accessibility > aria-activedescendant for basic options",
    (props: BasicProps) => {
      const renderProps = {
        ...props,
        instanceId: 1000,
        value: BASIC_PROPS.options[2],
        menuIsOpen: true,
        hideSelectedOptions: false,
      };

      const { container, rerender } = render(<Select {...renderProps} />);

      // aria-activedescendant should be set if menu is open initially and selected options are not hidden
      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-2");

      // aria-activedescendant is updated during keyboard navigation
      fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
        keyCode: 40,
        key: "ArrowDown",
      });

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-3");

      fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
        keyCode: 38,
        key: "ArrowUp",
      });

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-2");

      fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
        keyCode: 36,
        key: "Home",
      });

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-0");

      fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
        keyCode: 35,
        key: "End",
      });

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-16");

      rerender(<Select {...renderProps} menuIsOpen={false} />);

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("");

      // searching should update activedescendant
      rerender(<Select {...renderProps} isSearchable />);

      const setInputValue = (val: string) => {
        rerender(<Select {...renderProps} autoFocus inputValue={val} />);
      };

      setInputValue("four");

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-4");

      setInputValue("fourt");

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-14");

      setInputValue("fourt1");

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("");
    },
    {
      "single select > should update aria-activedescendant as per focused option":
        {
          ...BASIC_PROPS,
        },
      "multi select > should update aria-activedescendant as per focused option":
        {
          ...BASIC_PROPS,
          isMulti: true,
        },
    }
  );

  cases(
    "accessibility > aria-activedescendant for grouped options",
    (props: BasicProps) => {
      const renderProps = {
        ...props,
        instanceId: 1000,
        options: OPTIONS_GROUPED,
        value: OPTIONS_GROUPED[0].options[2],
        menuIsOpen: true,
        hideSelectedOptions: false,
      };

      const { container, rerender } = render(
        <Select<OptionNumberValue | OptionBooleanValue, false, GroupedOption>
          {...renderProps}
        />
      );

      // aria-activedescendant should be set if menu is open initially and selected options are not hidden
      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-0-2");

      // aria-activedescendant is updated during keyboard navigation
      fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
        keyCode: 40,
        key: "ArrowDown",
      });

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-0-3");

      fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
        keyCode: 38,
        key: "ArrowUp",
      });

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-0-2");

      fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
        keyCode: 36,
        key: "Home",
      });

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-0-0");

      fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
        keyCode: 35,
        key: "End",
      });

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-1-1");

      rerender(<Select {...renderProps} menuIsOpen={false} />);

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("");

      // searching should update activedescendant
      rerender(<Select {...renderProps} isSearchable />);

      const setInputValue = (val: string) => {
        rerender(<Select {...renderProps} autoFocus inputValue={val} />);
      };

      setInputValue("1");

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-0-1");

      setInputValue("10");

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("react-select-1000-option-0-10");

      setInputValue("102");

      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-activedescendant")
      ).toBe("");
    },
    {
      "single select > should update aria-activedescendant as per focused option":
        {
          ...BASIC_PROPS,
        },
      "multi select > should update aria-activedescendant as per focused option":
        {
          ...BASIC_PROPS,
          isMulti: true,
        },
    }
  );

  test("accessibility > aria-activedescendant should not exist if hideSelectedOptions=true", () => {
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        instanceId="1000"
        value={BASIC_PROPS.options[2]}
        isMulti
        menuIsOpen
      />
    );

    expect(
      container
        .querySelector("input.react-select__input")!
        .getAttribute("aria-activedescendant")
    ).toBe("");
  });

  cases(
    "accessibility > passes through aria-labelledby prop",
    ({ props = { ...BASIC_PROPS, "aria-labelledby": "testing" } }) => {
      const { container } = render(<Select {...props} />);
      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-labelledby")
      ).toBe("testing");
    },
    {
      "single select > should pass aria-labelledby prop down to input": {},
      "multi select > should pass aria-labelledby prop down to input": {
        props: {
          ...BASIC_PROPS,
          "aria-labelledby": "testing",
          isMulti: true,
        },
      },
    }
  );

  cases(
    "accessibility > passes through aria-errormessage prop",
    ({ props = { ...BASIC_PROPS, "aria-errormessage": "error-message" } }) => {
      const { container } = render(<Select {...props} />);
      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-errormessage")
      ).toBe("error-message");
    },
    {
      "single select > should pass aria-errormessage prop down to input": {},
      "multi select > should pass aria-errormessage prop down to input": {
        props: {
          ...BASIC_PROPS,
          "aria-errormessage": "error-message",
          isMulti: true,
        },
      },
    }
  );

  cases(
    "accessibility > passes through aria-invalid prop",
    ({ props = { ...BASIC_PROPS, "aria-invalid": true } }) => {
      const { container } = render(<Select {...props} />);
      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-invalid")
      ).toBe("true");
    },
    {
      "single select > should pass aria-invalid prop down to input": {},
      "multi select > should pass aria-invalid prop down to input": {
        props: {
          ...BASIC_PROPS,
          "aria-invalid": true,
          isMulti: true,
        },
      },
    }
  );

  cases(
    "accessibility > passes through aria-label prop",
    ({ props = { ...BASIC_PROPS, "aria-label": "testing" } }) => {
      const { container } = render(<Select {...props} />);
      expect(
        container
          .querySelector("input.react-select__input")!
          .getAttribute("aria-label")
      ).toBe("testing");
    },
    {
      "single select > should pass aria-labelledby prop down to input": {},
      "multi select > should pass aria-labelledby prop down to input": {
        props: {
          ...BASIC_PROPS,
          "aria-label": "testing",
          isMulti: true,
        },
      },
    }
  );

  test("accessibility > to show the number of options available in A11yText when the menu is Open", () => {
    const { container, rerender } = render(
      <Select {...BASIC_PROPS} inputValue="" autoFocus menuIsOpen />
    );

    const setInputValue = (val: string) => {
      rerender(
        <Select {...BASIC_PROPS} autoFocus menuIsOpen inputValue={val} />
      );
    };

    const liveRegionResultsId = "#aria-results";
    fireEvent.focus(container.querySelector("input.react-select__input")!);

    expect(container.querySelector(liveRegionResultsId)!.textContent).toMatch(
      /17 results available/u
    );

    setInputValue("0");
    expect(container.querySelector(liveRegionResultsId)!.textContent).toMatch(
      /2 results available/u
    );

    setInputValue("10");
    expect(container.querySelector(liveRegionResultsId)!.textContent).toMatch(
      /1 result available/u
    );

    setInputValue("100");
    expect(container.querySelector(liveRegionResultsId)!.textContent).toMatch(
      /0 results available/u
    );
  });

  test("accessibility > interacting with disabled options shows correct A11yText", () => {
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        options={OPTIONS_DISABLED}
        inputValue=""
        menuIsOpen
      />
    );
    const liveRegionEventId = "#aria-selection";
    fireEvent.focus(container.querySelector("input.react-select__input")!);

    // navigate to disabled option
    const menu = container.querySelector(".react-select__menu");
    fireEvent.keyDown(menu!, { keyCode: 40, key: "ArrowDown" });
    fireEvent.keyDown(menu!, { keyCode: 40, key: "ArrowDown" });

    // attempt to select disabled option
    fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
      keyCode: 13,
      key: "Enter",
    });

    expect(container.querySelector(liveRegionEventId)!.textContent).toMatch(
      "option 1 is disabled. Select another option."
    );
  });

  test("accessibility > interacting with multi values options shows correct A11yText", () => {
    const renderProps = {
      ...BASIC_PROPS,
      options: OPTIONS_DISABLED,
      isMulti: true,
      value: [OPTIONS_DISABLED[0], OPTIONS_DISABLED[1]],
      hideSelectedOptions: false,
    };

    const { container, rerender } = render(<Select {...renderProps} />);

    const openMenu = () => {
      rerender(<Select {...renderProps} menuIsOpen />);
    };

    const liveRegionGuidanceId = "#aria-guidance";
    const liveRegionFocusedId = "#aria-focused";
    const input = container.querySelector(
      ".react-select__value-container input"
    )!;

    fireEvent.focus(container.querySelector("input.react-select__input")!);

    expect(container.querySelector(liveRegionGuidanceId)!.textContent).toMatch(
      "Select is focused ,type to refine list, press Down to open the menu,  press left to focus selected values"
    );

    fireEvent.keyDown(input, { keyCode: 37, key: "ArrowLeft" });
    expect(container.querySelector(liveRegionFocusedId)!.textContent).toMatch(
      "value 1 focused, 2 of 2."
    );
    expect(container.querySelector(liveRegionGuidanceId)!.textContent).toMatch(
      "Use left and right to toggle between focused values, press Backspace to remove the currently focused value"
    );

    fireEvent.keyDown(input, { keyCode: 37, key: "ArrowLeft" });
    expect(container.querySelector(liveRegionFocusedId)!.textContent).toMatch(
      "value 0 focused, 1 of 2."
    );
    expect(container.querySelector(liveRegionGuidanceId)!.textContent).toMatch(
      "Use left and right to toggle between focused values, press Backspace to remove the currently focused value"
    );

    openMenu();

    // user will be notified if option is disabled by screen reader because of correct aria-attributes, so this message will be announce only once after menu opens
    expect(container.querySelector(liveRegionGuidanceId)!.textContent).toMatch(
      "Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu, press Tab to select the option and exit the menu."
    );
  });

  test("accessibility > screenReaderStatus function prop > to pass custom text to A11yText", () => {
    const screenReaderStatus = ({ count }: { count: number }) =>
      `There are ${count} options available`;

    const liveRegionResultsId = "#aria-results";
    const { container, rerender } = render(
      <Select
        {...BASIC_PROPS}
        inputValue=""
        screenReaderStatus={screenReaderStatus}
        menuIsOpen
      />
    );

    const setInputValue = (val: string) => {
      rerender(
        <Select
          {...BASIC_PROPS}
          screenReaderStatus={screenReaderStatus}
          menuIsOpen
          inputValue={val}
        />
      );
    };

    fireEvent.focus(container.querySelector("input.react-select__input")!);

    expect(container.querySelector(liveRegionResultsId)!.textContent).toMatch(
      "There are 17 options available"
    );

    setInputValue("0");
    expect(container.querySelector(liveRegionResultsId)!.textContent).toMatch(
      "There are 2 options available"
    );

    setInputValue("10");
    expect(container.querySelector(liveRegionResultsId)!.textContent).toMatch(
      "There are 1 options available"
    );

    setInputValue("100");
    expect(container.querySelector(liveRegionResultsId)!.textContent).toMatch(
      "There are 0 options available"
    );
  });

  test("accessibility > A11yTexts can be provided through ariaLiveMessages prop", () => {
    const ariaLiveMessages: AriaLiveMessages<
      Option,
      boolean,
      GroupBase<Option>
    > = {
      onChange: (props) => {
        const { action, isDisabled, label } = props;
        if (action === "select-option" && !isDisabled) {
          return `CUSTOM: option ${label} is selected.`;
        }
        return "";
      },
    };

    const { container } = render(
      <Select
        {...BASIC_PROPS}
        ariaLiveMessages={ariaLiveMessages}
        options={OPTIONS}
        inputValue=""
        menuIsOpen
      />
    );
    const liveRegionEventId = "#aria-selection";

    expect(container.querySelector(liveRegionEventId)!).toBeNull();

    fireEvent.focus(container.querySelector("input.react-select__input")!);

    const menu = container.querySelector(".react-select__menu")!;
    fireEvent.keyDown(menu, { keyCode: 40, key: "ArrowDown" });
    fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
      keyCode: 13,
      key: "Enter",
    });

    expect(container.querySelector(liveRegionEventId)!.textContent).toMatch(
      "CUSTOM: option 0 is selected."
    );
  });

  test("accessibility > announces already selected values when focused", () => {
    const { container } = render(
      <Select {...BASIC_PROPS} options={OPTIONS} value={OPTIONS[0]} />
    );
    const liveRegionSelectionId = "#aria-selection";
    const liveRegionContextId = "#aria-guidance";

    // the live region should not be mounted yet
    expect(container.querySelector(liveRegionSelectionId)!).toBeNull();

    fireEvent.focus(container.querySelector("input.react-select__input")!);

    expect(container.querySelector(liveRegionContextId)!.textContent).toMatch(
      "Select is focused ,type to refine list, press Down to open the menu, "
    );
    expect(container.querySelector(liveRegionSelectionId)!.textContent).toMatch(
      "option 0, selected."
    );
  });

  test("accessibility > announces cleared values", () => {
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        options={OPTIONS}
        value={OPTIONS[0]}
        isClearable
      />
    );
    const liveRegionSelectionId = "#aria-selection";
    /**
     * announce deselected value
     */
    fireEvent.focus(container.querySelector("input.react-select__input")!);
    fireEvent.mouseDown(
      container.querySelector(".react-select__clear-indicator")!
    );
    expect(container.querySelector(liveRegionSelectionId)!.textContent).toMatch(
      "All selected options have been cleared."
    );
  });

  test("closeMenuOnSelect prop > when passed as false it should not call onMenuClose on selecting option", async () => {
    const onMenuCloseSpy = vi.fn<() => void>();
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        onMenuClose={onMenuCloseSpy}
        menuIsOpen
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
      />
    );
    await userEvent.click(container.querySelector("div.react-select__option")!);
    expect(onMenuCloseSpy).not.toHaveBeenCalled();
  });

  cases(
    "autoFocus",
    ({ props = { ...BASIC_PROPS, autoFocus: true } }) => {
      const { container } = render(<Select {...props} />);
      expect(container.querySelector("input.react-select__input")).toBe(
        document.activeElement
      );
    },
    {
      "single select > should focus select on mount": {},
      "multi select > should focus select on mount": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
          autoFocus: true,
        },
      },
    }
  );

  cases(
    "onFocus prop with autoFocus",
    ({ props = { ...BASIC_PROPS, autoFocus: true } }) => {
      const onFocusSpy = vi.fn<() => void>();
      const { container } = render(<Select {...props} onFocus={onFocusSpy} />);
      expect(container.querySelector("input.react-select__input")).toBe(
        document.activeElement
      );
      expect(onFocusSpy).toHaveBeenCalledOnce();
    },
    {
      "single select > should call auto focus only once when select is autoFocus":
        {
          props: {
            ...BASIC_PROPS,
            autoFocus: true,
          },
        },
      "multi select > should call auto focus only once when select is autoFocus":
        {
          props: {
            ...BASIC_PROPS,
            autoFocus: true,
            isMulti: true,
          },
        },
    }
  );

  cases(
    "onFocus prop is called on on focus of input",
    ({ props = { ...BASIC_PROPS } }) => {
      const onFocusSpy = vi.fn<() => void>();
      const { container } = render(<Select {...props} onFocus={onFocusSpy} />);
      fireEvent.focus(container.querySelector("input.react-select__input")!);
      expect(onFocusSpy).toHaveBeenCalledOnce();
    },
    {
      "single select > should call onFocus handler on focus on input": {},
      "multi select > should call onFocus handler on focus on input": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
        },
      },
    }
  );

  cases(
    "onBlur prop",
    ({ props = { ...BASIC_PROPS } }) => {
      const onBlurSpy = vi.fn<() => void>();
      const { container } = render(
        <Select
          {...props}
          onBlur={onBlurSpy}
          onInputChange={vi.fn<() => void>()}
          onMenuClose={vi.fn<() => void>()}
        />
      );
      fireEvent.blur(container.querySelector("input.react-select__input")!);
      expect(onBlurSpy).toHaveBeenCalledOnce();
    },
    {
      "single select > should call onBlur handler on blur on input": {},
      "multi select > should call onBlur handler on blur on input": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
        },
      },
    }
  );

  test("onInputChange() function prop to be called on blur", () => {
    const onInputChangeSpy = vi.fn<() => void>();
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        onBlur={vi.fn<() => void>()}
        onInputChange={onInputChangeSpy}
        onMenuClose={vi.fn<() => void>()}
      />
    );
    fireEvent.blur(container.querySelector("input.react-select__input")!);
    // Once by blur and other time by menu-close
    expect(onInputChangeSpy).toHaveBeenCalledTimes(2);
  });

  test("onMenuClose() function prop to be called on blur", () => {
    const onMenuCloseSpy = vi.fn<() => void>();
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        onBlur={vi.fn<() => void>()}
        onInputChange={vi.fn<() => void>()}
        onMenuClose={onMenuCloseSpy}
      />
    );
    fireEvent.blur(container.querySelector("input.react-select__input")!);
    expect(onMenuCloseSpy).toHaveBeenCalledOnce();
  });

  cases(
    "placeholder",
    ({ props, expectPlaceholder = "Select..." }) => {
      const { container } = render(<Select {...props} />);
      expect(
        container.querySelector(".react-select__control")!.textContent
      ).toBe(expectPlaceholder);
    },
    {
      'single select > should display default placeholder "Select..."': {
        props: BASIC_PROPS,
      },
      "single select > should display provided string placeholder": {
        props: {
          ...BASIC_PROPS,
          placeholder: "single Select...",
        },
        expectPlaceholder: "single Select...",
      },
      "single select > should display provided node placeholder": {
        props: {
          ...BASIC_PROPS,
          placeholder: <span>single Select...</span>,
        },
        expectPlaceholder: "single Select...",
      },
      'multi select > should display default placeholder "Select..."': {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
        },
      },
      "multi select > should display provided placeholder": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
          placeholder: "multi Select...",
        },
        expectPlaceholder: "multi Select...",
      },
    }
  );

  cases(
    "display placeholder once value is removed",
    ({ props }) => {
      const { container, rerender } = render(<Select {...props} />);
      expect(
        container.querySelector(".react-select__placeholder")
      ).not.toBeInTheDocument();
      rerender(<Select {...props} value={null} />);
      expect(
        container.querySelector(".react-select__placeholder")
      ).toBeInTheDocument();
    },
    {
      "single select > should display placeholder once the value is removed from select":
        {
          props: {
            ...BASIC_PROPS,
            value: OPTIONS[0],
          },
        },
      "multi select > should display placeholder once the value is removed from select":
        {
          props: {
            ...BASIC_PROPS,
            value: OPTIONS[0],
          },
        },
    }
  );

  test('sets inputMode="none" when isSearchable is false', () => {
    const { container } = render(
      <Select
        classNamePrefix="react-select"
        options={OPTIONS}
        isSearchable={false}
        onChange={noop}
        onInputChange={noop}
        onMenuOpen={noop}
        onMenuClose={noop}
        inputValue=""
        value={null}
      />
    );
    const input = container.querySelector<HTMLInputElement>(
      ".react-select__value-container input"
    );
    expect(input!.inputMode).toBe("none");
    // react-select sets `caret-color: transparent` on its internal DummyInput.
    // jsdom 22+ serializes the keyword `transparent` as `rgba(0, 0, 0, 0)`
    // (upstream's test runs on older jsdom where the keyword is preserved).
    expect(
      window.getComputedStyle(input!).getPropertyValue("caret-color")
    ).toStrictEqual("rgba(0, 0, 0, 0)");
  });

  cases(
    "clicking on disabled option",
    async ({ props = BASIC_PROPS, optionsSelected }) => {
      const onChangeSpy = vi.fn<() => void>();
      props = { ...props, onChange: onChangeSpy };
      const { container } = render(<Select {...props} menuIsOpen />);
      const selectOption = [
        ...container.querySelectorAll("div.react-select__option"),
      ].find((n) => n.textContent === optionsSelected);
      await userEvent.click(selectOption!);
      expect(onChangeSpy).not.toHaveBeenCalled();
    },
    {
      "single select > should not select the disabled option": {
        props: {
          ...BASIC_PROPS,
          options: [
            { label: "option 1", value: "opt1" },
            { label: "option 2", value: "opt2", isDisabled: true },
          ],
        },
        optionsSelected: "option 2",
      },
      "multi select > should not select the disabled option": {
        props: {
          ...BASIC_PROPS,
          options: [
            { label: "option 1", value: "opt1" },
            { label: "option 2", value: "opt2", isDisabled: true },
          ],
        },
        optionsSelected: "option 2",
      },
    }
  );

  cases(
    "pressing enter on disabled option",
    ({ props = BASIC_PROPS, optionsSelected }) => {
      const onChangeSpy = vi.fn<() => void>();
      props = { ...props, onChange: onChangeSpy };
      const { container } = render(<Select {...props} menuIsOpen />);
      const selectOption = [
        ...container.querySelectorAll("div.react-select__option"),
      ].find((n) => n.textContent === optionsSelected);
      fireEvent.keyDown(selectOption!, { keyCode: 13, key: "Enter" });
      expect(onChangeSpy).not.toHaveBeenCalled();
    },
    {
      "single select > should not select the disabled option": {
        props: {
          ...BASIC_PROPS,
          options: [
            { label: "option 1", value: "opt1" },
            { label: "option 2", value: "opt2", isDisabled: true },
          ],
        },
        optionsSelected: "option 2",
      },
      "multi select > should not select the disabled option": {
        props: {
          ...BASIC_PROPS,
          options: [
            { label: "option 1", value: "opt1" },
            { label: "option 2", value: "opt2", isDisabled: true },
          ],
        },
        optionsSelected: "option 2",
      },
    }
  );

  test("does not select anything when a disabled option is the only item in the list after a search", () => {
    const onChangeSpy = vi.fn<() => void>();
    const options = [
      { label: "opt", value: "opt1", isDisabled: true },
      ...OPTIONS,
    ];
    const props = { ...BASIC_PROPS, onChange: onChangeSpy, options };
    const { container, rerender } = render(
      <Select {...props} menuIsOpen inputValue="" />
    );
    rerender(<Select {...props} menuIsOpen inputValue="opt" />);

    fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
      keyCode: 13,
      key: "Enter",
    });

    expect(onChangeSpy).not.toHaveBeenCalled();
    // Menu is still open
    expect(container.querySelector(".react-select__option")!.textContent).toBe(
      "opt"
    );
  });

  test("render custom Input Component", () => {
    const InputComponent = () => <div className="my-input-component" />;
    const { container } = render(
      <Select {...BASIC_PROPS} components={{ Input: InputComponent }} />
    );

    expect(
      container.querySelector("input.react-select__input")
    ).not.toBeInTheDocument();
    expect(container.querySelector(".my-input-component")).toBeInTheDocument();
  });

  test("render custom Menu Component", () => {
    const MenuComponent = () => <div className="my-menu-component" />;
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        menuIsOpen
        components={{ Menu: MenuComponent }}
      />
    );

    expect(
      container.querySelector(".react-select__menu")
    ).not.toBeInTheDocument();
    expect(container.querySelector(".my-menu-component")).toBeInTheDocument();
  });

  test("render custom Option Component", () => {
    const OptionComponent = () => <div className="my-option-component" />;
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        components={{ Option: OptionComponent }}
        menuIsOpen
      />
    );

    expect(
      container.querySelector(".react-select__option")
    ).not.toBeInTheDocument();
    expect(container.querySelector(".my-option-component")).toBeInTheDocument();
  });

  cases(
    "isClearable is false",
    ({ props = BASIC_PROPS }) => {
      const { container } = render(<Select {...props} />);
      expect(
        container.querySelector("react-select__clear-indicator")
      ).not.toBeInTheDocument();
    },
    {
      "single select > should not show the X (clear) button": {
        props: {
          ...BASIC_PROPS,
          isClearable: false,
          value: OPTIONS[0],
        },
      },
      "multi select > should not show X (clear) button": {
        ...BASIC_PROPS,
        isMulti: true,
        isClearable: false,
        value: [OPTIONS[0]],
      },
    }
  );

  test("clear select by clicking on clear button > should not call onMenuOpen", () => {
    const onChangeSpy = vi.fn<() => void>();
    const props = { ...BASIC_PROPS, onChange: onChangeSpy };
    const { container } = render(
      <Select {...props} isMulti value={[OPTIONS[0]]} />
    );

    expect(
      container.querySelectorAll(".react-select__multi-value")
    ).toHaveLength(1);
    fireEvent.mouseDown(
      container.querySelector(".react-select__clear-indicator")!,
      { button: 0 }
    );
    expect(onChangeSpy).toHaveBeenCalledWith([], {
      action: "clear",
      name: BASIC_PROPS.name,
      removedValues: [{ label: "0", value: "zero" }],
    });
  });

  test("clearing select using clear button to not call onMenuOpen or onMenuClose", () => {
    const onMenuCloseSpy = vi.fn<() => void>();
    const onMenuOpenSpy = vi.fn<() => void>();
    const props = {
      ...BASIC_PROPS,
      onMenuClose: onMenuCloseSpy,
      onMenuOpen: onMenuOpenSpy,
    };
    const { container } = render(
      <Select {...props} isMulti value={[OPTIONS[0]]} />
    );
    expect(
      container.querySelectorAll(".react-select__multi-value")
    ).toHaveLength(1);
    fireEvent.mouseDown(
      container.querySelector(".react-select__clear-indicator")!,
      { button: 0 }
    );
    expect(onMenuOpenSpy).not.toHaveBeenCalled();
    expect(onMenuCloseSpy).not.toHaveBeenCalled();
  });

  test("multi select >  calls onChange when option is selected and isSearchable is false", async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn<() => void>();
    const props = { ...BASIC_PROPS, onChange: onChangeSpy };
    const { container } = render(
      <Select
        {...props}
        isMulti
        menuIsOpen
        delimiter=","
        isSearchable={false}
      />
    );
    await user.click(container.querySelector(".react-select__option")!);
    const selectedOption = { label: "0", value: "zero" };
    expect(onChangeSpy).toHaveBeenCalledWith([selectedOption], {
      action: "select-option",
      option: selectedOption,
      name: BASIC_PROPS.name,
    });
  });

  test("getOptionLabel() prop > to format the option label", () => {
    const getOptionLabel = (option: Option) =>
      `This a custom option ${option.label} label`;
    const { container } = render(
      <Select {...BASIC_PROPS} menuIsOpen getOptionLabel={getOptionLabel} />
    );
    expect(container.querySelector(".react-select__option")!.textContent).toBe(
      "This a custom option 0 label"
    );
  });

  test("formatGroupLabel function prop > to format Group label", () => {
    const formatGroupLabel = (group: Group) =>
      `This is custom ${group.label} header`;
    interface GroupOption {
      readonly value: number;
      readonly label: string;
    }
    interface Group {
      readonly label: string;
      readonly options: readonly GroupOption[];
    }
    const options = [
      {
        label: "group 1",
        options: [
          { value: 1, label: "1" },
          { value: 2, label: "2" },
        ],
      },
    ];
    const { container } = render(
      <Select<GroupOption, false, Group>
        classNamePrefix="react-select"
        options={options}
        menuIsOpen
        formatGroupLabel={formatGroupLabel}
        onChange={noop}
        onInputChange={noop}
        onMenuOpen={noop}
        onMenuClose={noop}
        inputValue=""
        value={null}
      />
    );
    expect(
      container.querySelector(".react-select__group-heading")!.textContent
    ).toBe("This is custom group 1 header");
  });

  test("to only render groups with at least one match when filtering", () => {
    const options = [
      {
        label: "group 1",
        options: [
          { value: 1, label: "1" },
          { value: 2, label: "2" },
        ],
      },
      {
        label: "group 2",
        options: [
          { value: 3, label: "3" },
          { value: 4, label: "4" },
        ],
      },
    ];
    const { container } = render(
      <Select
        classNamePrefix="react-select"
        options={options}
        menuIsOpen
        inputValue="1"
        onChange={noop}
        onInputChange={noop}
        onMenuOpen={noop}
        onMenuClose={noop}
        value={null}
      />
    );

    expect(container.querySelectorAll(".react-select__group")).toHaveLength(1);
    expect(
      container
        .querySelector(".react-select__group")!
        .querySelectorAll(".react-select__option")
    ).toHaveLength(1);
  });

  test("not render any groups when there is not a single match when filtering", () => {
    const options = [
      {
        label: "group 1",
        options: [
          { value: 1, label: "1" },
          { value: 2, label: "2" },
        ],
      },
      {
        label: "group 2",
        options: [
          { value: 3, label: "3" },
          { value: 4, label: "4" },
        ],
      },
    ];
    const { container } = render(
      <Select
        classNamePrefix="react-select"
        options={options}
        menuIsOpen
        inputValue="5"
        onChange={noop}
        onInputChange={noop}
        onMenuOpen={noop}
        onMenuClose={noop}
        value={null}
      />
    );

    expect(container.querySelectorAll(".react-select__group")).toHaveLength(0);
  });

  test("multi select > have default value delimiter seperated", () => {
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        delimiter=";"
        isMulti
        value={[OPTIONS[0], OPTIONS[1]]}
      />
    );
    expect(
      container.querySelector<HTMLInputElement>('input[type="hidden"]')!.value
    ).toBe("zero;one");
  });

  test("multi select > with multi character delimiter", () => {
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        delimiter="===&==="
        isMulti
        value={[OPTIONS[0], OPTIONS[1]]}
      />
    );
    expect(
      container.querySelector<HTMLInputElement>('input[type="hidden"]')!.value
    ).toBe("zero===&===one");
  });

  test("hitting spacebar should select option if isSearchable is false", () => {
    const onChangeSpy = vi.fn<() => void>();
    const props = { ...BASIC_PROPS, onChange: onChangeSpy };
    const { container } = render(<Select {...props} isSearchable menuIsOpen />);
    // focus the first option
    fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
      keyCode: 40,
      key: "ArrowDown",
    });
    fireEvent.keyDown(container.querySelector(".react-select")!, {
      keyCode: 32,
      key: " ",
    });
    expect(onChangeSpy).toHaveBeenCalledWith(
      { label: "0", value: "zero" },
      { action: "select-option", name: BASIC_PROPS.name }
    );
  });

  test("hitting escape does not call onChange if menu is Open", () => {
    const onChangeSpy = vi.fn<() => void>();
    const props = { ...BASIC_PROPS, onChange: onChangeSpy };
    const { container } = render(
      <Select {...props} menuIsOpen escapeClearsValue isClearable />
    );

    // focus the first option
    fireEvent.keyDown(container.querySelector(".react-select__menu")!, {
      keyCode: 40,
      key: "ArrowDown",
    });
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  test("multi select > removes the selected option from the menu options when isSearchable is false", () => {
    const { container, rerender } = render(
      <Select
        {...BASIC_PROPS}
        delimiter=","
        isMulti
        isSearchable={false}
        menuIsOpen
      />
    );
    expect(container.querySelectorAll(".react-select__option")).toHaveLength(
      17
    );
    rerender(
      <Select
        {...BASIC_PROPS}
        delimiter=","
        isMulti
        isSearchable={false}
        menuIsOpen
        value={OPTIONS[0]}
      />
    );
    // expect '0' to not be options
    for (const option of container.querySelectorAll(".react-select__option")) {
      expect(option.textContent).not.toBe("0");
    }
    expect(container.querySelectorAll(".react-select__option")).toHaveLength(
      16
    );
  });

  test("hitting ArrowUp key on closed select should focus last element", () => {
    const { container } = render(<Select {...BASIC_PROPS} menuIsOpen />);

    fireEvent.keyDown(container.querySelector(".react-select__control")!, {
      keyCode: 38,
      key: "ArrowUp",
    });

    expect(
      container.querySelector(".react-select__option--is-focused")!.textContent
    ).toStrictEqual("16");
  });

  test("close menu on hitting escape and clear input value if menu is open even if escapeClearsValue and isClearable are true", () => {
    const onMenuCloseSpy = vi.fn<() => void>();
    const onInputChangeSpy = vi.fn<() => void>();
    const props = {
      ...BASIC_PROPS,
      onInputChange: onInputChangeSpy,
      onMenuClose: onMenuCloseSpy,
      value: OPTIONS[0],
    };
    const { container } = render(
      <Select {...props} menuIsOpen escapeClearsValue isClearable />
    );
    fireEvent.keyDown(container.querySelector(".react-select")!, {
      keyCode: 27,
      key: "Escape",
    });
    expect(
      container.querySelector(".react-select__single-value")!.textContent
    ).toStrictEqual("0");

    expect(onMenuCloseSpy).toHaveBeenCalled();
    // once by onMenuClose and other is direct
    expect(onInputChangeSpy).toHaveBeenCalledTimes(2);
    expect(onInputChangeSpy).toHaveBeenCalledWith("", {
      action: "menu-close",
      prevInputValue: "",
    });
    expect(onInputChangeSpy).toHaveBeenLastCalledWith("", {
      action: "menu-close",
      prevInputValue: "",
    });
  });

  test("to not clear value when hitting escape if escapeClearsValue is false (default) and isClearable is false", () => {
    const onChangeSpy = vi.fn<() => void>();
    const props = { ...BASIC_PROPS, onChange: onChangeSpy, value: OPTIONS[0] };
    const { container } = render(
      <Select {...props} escapeClearsValue isClearable={false} />
    );

    fireEvent.keyDown(container.querySelector(".react-select")!, {
      keyCode: 27,
      key: "Escape",
    });
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  test("to not clear value when hitting escape if escapeClearsValue is true and isClearable is false", () => {
    const onChangeSpy = vi.fn<() => void>();
    const props = { ...BASIC_PROPS, onChange: onChangeSpy, value: OPTIONS[0] };
    const { container } = render(
      <Select {...props} escapeClearsValue isClearable={false} />
    );

    fireEvent.keyDown(container.querySelector(".react-select")!, {
      keyCode: 27,
      key: "Escape",
    });
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  test("to not clear value when hitting escape if escapeClearsValue is false (default) and isClearable is true", () => {
    const onChangeSpy = vi.fn<() => void>();
    const props = { ...BASIC_PROPS, onChange: onChangeSpy, value: OPTIONS[0] };
    const { container } = render(<Select {...props} isClearable />);

    fireEvent.keyDown(container.querySelector(".react-select")!, {
      keyCode: 27,
      key: "Escape",
    });
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  test("to clear value when hitting escape if escapeClearsValue and isClearable are true", () => {
    const onInputChangeSpy = vi.fn<() => void>();
    const props = {
      ...BASIC_PROPS,
      onChange: onInputChangeSpy,
      value: OPTIONS[0],
    };
    const { container } = render(
      <Select {...props} isClearable escapeClearsValue />
    );

    fireEvent.keyDown(container.querySelector(".react-select")!, {
      keyCode: 27,
      key: "Escape",
    });
    expect(onInputChangeSpy).toHaveBeenCalledWith(null, {
      action: "clear",
      name: BASIC_PROPS.name,
      removedValues: [{ label: "0", value: "zero" }],
    });
  });

  test("hitting spacebar should not select option if isSearchable is true (default)", () => {
    const onChangeSpy = vi.fn<() => void>();
    const props = { ...BASIC_PROPS, onChange: onChangeSpy };
    const { container } = render(<Select {...props} menuIsOpen />);
    // Open Menu
    fireEvent.keyDown(container, { keyCode: 32, key: " " });
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  // TODO(chakra): chakra-react-select intentionally ignores react-select's
  // `theme` prop in favor of Chakra's design tokens (see types.ts deprecation
  // on `theme`). Reimplement using `chakraStyles` in chakra-specific.test.tsx.
  // oxlint-disable-next-line vitest/no-disabled-tests -- intentional, see comment above
  test.skip("renders with custom theme", () => {
    const primary = "rgb(255, 164, 83)";
    const { container } = render(
      <Select
        {...BASIC_PROPS}
        value={OPTIONS[0]}
        menuIsOpen
        // oxlint-disable-next-line typescript/no-deprecated
        theme={(theme) => ({
          ...theme,
          borderRadius: 180,
          colors: {
            ...theme.colors,
            primary,
          },
        })}
      />
    );
    const menu = container.querySelector(".react-select__menu");
    expect(
      window.getComputedStyle(menu!).getPropertyValue("border-radius")
    ).toStrictEqual("180px");
    const firstOption = container.querySelector(".react-select__option");
    expect(
      window.getComputedStyle(firstOption!).getPropertyValue("background-color")
    ).toStrictEqual(primary);
  });

  cases(
    "`required` prop",
    ({ props = BASIC_PROPS }) => {
      const components = (value: Option | null | undefined = null) => (
        <form id="formTest">
          <Select {...props} required value={value} />
        </form>
      );

      const { container, rerender } = render(components());

      expect(
        container.querySelector<HTMLFormElement>("#formTest")?.checkValidity()
      ).toStrictEqual(false);
      rerender(components(props.options[0]));
      expect(
        container.querySelector<HTMLFormElement>("#formTest")?.checkValidity()
      ).toStrictEqual(true);
    },
    {
      "single select > should validate with value": {
        props: {
          ...BASIC_PROPS,
        },
      },
      "single select (isSearchable is false) > should validate with value": {
        props: {
          ...BASIC_PROPS,
          isSearchable: false,
        },
      },
      "multi select > should validate with value": {
        props: {
          ...BASIC_PROPS,
          isMulti: true,
        },
      },
    }
  );
});
