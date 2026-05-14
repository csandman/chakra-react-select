import { Field } from "@chakra-ui/react";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, test, vi } from "vitest";
import chakraComponents from "../chakra-components";
import { Select, useChakraSelectProps } from "../index";
import type { ColorPaletteProp, SizeProp, TagVariant, Variant } from "../types";
import { OPTIONS, type Option } from "./constants";
import { Wrapper, render } from "./render";

describe("chakra-react-select specifics", () => {
  describe("size prop", () => {
    it.each(["sm", "md", "lg"] as const)(
      "forwards size=%s to chakra components via selectProps",
      (size) => {
        let captured: SizeProp | undefined;
        render(
          <Select
            options={OPTIONS}
            size={size}
            chakraStyles={{
              control: (provided, state) => {
                captured = state.selectProps.size;
                return provided;
              },
            }}
          />
        );
        expect(captured).toBe(size);
      }
    );

    it("accepts a responsive size object", () => {
      const responsive = { base: "sm", md: "lg" } as const;
      let captured: SizeProp | undefined;
      render(
        <Select
          options={OPTIONS}
          size={responsive}
          chakraStyles={{
            control: (provided, state) => {
              captured = state.selectProps.size;
              return provided;
            },
          }}
        />
      );
      expect(captured).toEqual(responsive);
    });
  });

  describe("variant prop", () => {
    it.each(["outline", "subtle"] as const)(
      "forwards variant=%s to chakra components via selectProps",
      (variant) => {
        let captured: Variant | undefined;
        render(
          <Select
            options={OPTIONS}
            variant={variant}
            chakraStyles={{
              control: (provided, state) => {
                captured = state.selectProps.variant;
                return provided;
              },
            }}
          />
        );
        expect(captured).toBe(variant);
      }
    );
  });

  describe("invalid prop", () => {
    test("sets data-invalid on the control", () => {
      const { container } = render(
        <Select classNamePrefix="react-select" options={OPTIONS} invalid />
      );
      const control = container.querySelector(".react-select__control");
      expect(control).toHaveAttribute("data-invalid", "true");
    });

    test("sets aria-invalid on the input when invalid is true", () => {
      const { container } = render(
        <Select classNamePrefix="react-select" options={OPTIONS} invalid />
      );
      const input = container.querySelector(".react-select__input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    test("inherits invalid from <Field.Root invalid>", () => {
      const { container } = render(
        <Field.Root invalid>
          <Select classNamePrefix="react-select" options={OPTIONS} />
        </Field.Root>
      );
      const input = container.querySelector(".react-select__input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("disabled prop (chakra alias)", () => {
    test("forwards to react-select isDisabled and disables the input", () => {
      const { container } = render(
        <Select classNamePrefix="react-select" options={OPTIONS} disabled />
      );
      const input = container.querySelector<HTMLInputElement>(
        ".react-select__input"
      );
      expect(input).toBeDisabled();
    });
  });

  describe("readOnly prop", () => {
    test("renders the control with data-readonly and keeps menu closed", () => {
      const { container } = render(
        <Select classNamePrefix="react-select" options={OPTIONS} readOnly />
      );
      const control = container.querySelector(".react-select__control");
      expect(control).toHaveAttribute("data-readonly", "true");
      // readOnly forces menuIsOpen=false in useChakraSelectProps, so the menu
      // should never render even without explicit menuIsOpen=false.
      expect(
        container.querySelector(".react-select__menu")
      ).not.toBeInTheDocument();
    });
  });

  describe("chakraStyles", () => {
    test("calls the slot function with provided defaults and uses the returned object", () => {
      const controlSpy = vi.fn((provided: object) => ({
        ...provided,
        padding: "99px",
      }));
      render(
        <Select
          classNamePrefix="react-select"
          options={OPTIONS}
          chakraStyles={{ control: controlSpy }}
        />
      );
      expect(controlSpy).toHaveBeenCalled();
      const providedArg = controlSpy.mock.calls[0]![0] as Record<
        string,
        unknown
      >;
      // The default initialCss for control includes a minHeight token —
      // verifies that defaults are actually passed in (not an empty {}).
      expect(providedArg).toHaveProperty("minHeight");
    });

    test("falls back to default styles when the slot fn is absent", () => {
      const { container } = render(
        <Select
          classNamePrefix="react-select"
          options={OPTIONS}
          chakraStyles={{}}
        />
      );
      // Smoke: the control still renders with its BEM class even without an
      // override for that slot.
      expect(
        container.querySelector(".react-select__control")
      ).toBeInTheDocument();
    });

    test("receives full state and props for each component slot", () => {
      type OptionState = {
        isSelected: boolean;
        isFocused: boolean;
        data: unknown;
      };
      const optionSpy = vi.fn(
        (provided: object, _state: OptionState) => provided
      );
      render(
        <Select
          classNamePrefix="react-select"
          options={OPTIONS.slice(0, 3)}
          value={OPTIONS[0]}
          menuIsOpen
          chakraStyles={{ option: optionSpy }}
        />
      );
      expect(optionSpy).toHaveBeenCalled();
      const states = optionSpy.mock.calls.map((call) => call[1]);
      expect(states.length).toBeGreaterThan(0);
      expect(states[0]).toMatchObject({
        isSelected: expect.any(Boolean),
        isFocused: expect.any(Boolean),
        data: expect.any(Object),
      });
      // Exactly one of the rendered options should be the selected one.
      expect(states.filter((s) => s.isSelected).length).toBe(1);
    });
  });

  describe("tagColorPalette / tagVariant", () => {
    test("forwards tagColorPalette to MultiValue via selectProps", () => {
      let captured: ColorPaletteProp | undefined;
      render(
        <Select
          classNamePrefix="react-select"
          isMulti
          options={OPTIONS}
          value={[OPTIONS[0]]}
          tagColorPalette="purple"
          chakraStyles={{
            multiValue: (provided, state) => {
              captured = state.selectProps.tagColorPalette;
              return provided;
            },
          }}
        />
      );
      expect(captured).toBe("purple");
    });

    test("forwards tagVariant to MultiValue via selectProps", () => {
      let captured: TagVariant | undefined;
      render(
        <Select
          classNamePrefix="react-select"
          isMulti
          options={OPTIONS}
          value={[OPTIONS[0]]}
          tagVariant="solid"
          chakraStyles={{
            multiValue: (provided, state) => {
              captured = state.selectProps.tagVariant;
              return provided;
            },
          }}
        />
      );
      expect(captured).toBe("solid");
    });
  });

  describe("selectedOptionStyle", () => {
    test("'check' renders a check icon inside the selected option", () => {
      const { container } = render(
        <Select
          classNamePrefix="react-select"
          options={OPTIONS}
          value={OPTIONS[0]}
          menuIsOpen
          selectedOptionStyle="check"
        />
      );
      const selected = container.querySelector(
        ".react-select__option--is-selected"
      );
      expect(selected).not.toBeNull();
      expect(selected!.querySelector("svg")).not.toBeNull();
    });

    test("'color' does not render a check icon on the selected option", () => {
      let captured: string | undefined;
      const { container } = render(
        <Select
          classNamePrefix="react-select"
          options={OPTIONS}
          value={OPTIONS[0]}
          menuIsOpen
          selectedOptionStyle="color"
          chakraStyles={{
            option: (provided, state) => {
              if (state.isSelected) {
                captured = state.selectProps.selectedOptionStyle;
              }
              return provided;
            },
          }}
        />
      );
      const selected = container.querySelector(
        ".react-select__option--is-selected"
      );
      expect(selected).not.toBeNull();
      expect(selected!.querySelector("svg")).toBeNull();
      // The state.selectProps.selectedOptionStyle is observable for the
      // selected option, which confirms the prop reached the Option slot.
      expect(captured).toBe("color");
    });
  });

  describe("selectedOptionColorPalette", () => {
    test("forwards the palette to Option via selectProps", () => {
      let captured: ColorPaletteProp | undefined;
      render(
        <Select
          classNamePrefix="react-select"
          options={OPTIONS}
          value={OPTIONS[0]}
          menuIsOpen
          selectedOptionColorPalette="purple"
          chakraStyles={{
            option: (provided, state) => {
              if (state.isSelected) {
                captured = state.selectProps.selectedOptionColorPalette;
              }
              return provided;
            },
          }}
        />
      );
      expect(captured).toBe("purple");
    });
  });

  describe("focusRingColor", () => {
    test("forwards to the Control via selectProps", () => {
      let captured: string | undefined;
      render(
        <Select
          classNamePrefix="react-select"
          options={OPTIONS}
          focusRingColor="blue.600"
          chakraStyles={{
            control: (provided, state) => {
              captured = state.selectProps.focusRingColor;
              return provided;
            },
          }}
        />
      );
      expect(captured).toBe("blue.600");
    });
  });

  describe("useChakraSelectProps hook", () => {
    test("returns props consumable by an external Select", () => {
      const onChange = vi.fn();
      const { result } = renderHook(
        () =>
          useChakraSelectProps<Option, true>({
            isMulti: true,
            options: OPTIONS,
            value: [OPTIONS[0]],
            onChange,
          }),
        { wrapper: Wrapper }
      );

      const props = result.current;

      // Defaults applied by the hook.
      expect(props.unstyled).toBe(true);
      expect(props.selectedOptionStyle).toBe("color");
      expect(props.selectedOptionColorPalette).toBe("blue");
      expect(props.menuPlacement).toBe("auto");

      // Chakra components attached for every slot.
      expect(props.components).toBeDefined();
      for (const key of Object.keys(chakraComponents)) {
        expect(props.components).toHaveProperty(key);
      }

      // Caller props pass through.
      expect(props.isMulti).toBe(true);
      expect(props.options).toBe(OPTIONS);
      expect(props.value).toEqual([OPTIONS[0]]);
      expect(props.onChange).toBe(onChange);
    });

    test("maps `disabled` to react-select's `isDisabled`", () => {
      const { result } = renderHook(
        () => useChakraSelectProps<Option>({ disabled: true }),
        { wrapper: Wrapper }
      );
      expect(result.current.isDisabled).toBe(true);
    });
  });
});
