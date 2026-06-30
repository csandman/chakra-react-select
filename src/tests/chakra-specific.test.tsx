import { FormControl } from "@chakra-ui/react";
import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import chakraComponents from "../chakra-components";
import { Select, useChakraSelectProps } from "../index";
import type { ColorScheme, SizeProp, TagVariant, Variant } from "../types";
import { OPTIONS } from "./constants";
import type { Option } from "./constants";
import { Wrapper, render } from "./render";

describe("chakra-react-select specifics", () => {
  describe("size prop", () => {
    test.each(["sm", "md", "lg"] as const)(
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

    test("accepts a responsive size object", () => {
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
      expect(captured).toStrictEqual(responsive);
    });
  });

  describe("variant prop", () => {
    test.each(["outline", "filled"] as const)(
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

  describe("isInvalid prop", () => {
    test("sets data-invalid on the control", () => {
      const { container } = render(
        <Select classNamePrefix="react-select" options={OPTIONS} isInvalid />
      );
      const control = container.querySelector(".react-select__control");
      expect(control).toHaveAttribute("data-invalid", "true");
    });

    test("sets aria-invalid on the input when isInvalid is true", () => {
      const { container } = render(
        <Select classNamePrefix="react-select" options={OPTIONS} isInvalid />
      );
      const input = container.querySelector(".react-select__input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    test("inherits isInvalid from <FormControl isInvalid>", () => {
      const { container } = render(
        <FormControl isInvalid>
          <Select classNamePrefix="react-select" options={OPTIONS} />
        </FormControl>
      );
      const input = container.querySelector(".react-select__input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("isDisabled prop", () => {
    test("forwards isDisabled to react-select and disables the input", () => {
      const { container } = render(
        <Select classNamePrefix="react-select" options={OPTIONS} isDisabled />
      );
      const input = container.querySelector<HTMLInputElement>(
        ".react-select__input"
      );
      expect(input).toBeDisabled();
    });
  });

  describe("isReadOnly prop", () => {
    test("renders the control with data-readonly and keeps menu closed", () => {
      const { container } = render(
        <Select classNamePrefix="react-select" options={OPTIONS} isReadOnly />
      );
      const control = container.querySelector(".react-select__control");
      expect(control).toHaveAttribute("data-readonly", "true");
      // isReadOnly forces menuIsOpen=false in useChakraSelectProps, so the
      // menu should never render even without explicit menuIsOpen=false.
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
      const providedArg = controlSpy.mock.calls[0][0] as Record<
        string,
        unknown
      >;
      // The default initialCss for control includes a minH token (Chakra v2
      // shorthand for min-height) — verifies defaults are passed in.
      expect(providedArg).toHaveProperty("minH");
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

    test("can customize menu and option styles (chakraStyles replaces react-select theme)", () => {
      const primary = "rgb(255, 164, 83)";
      const menuSpy = vi.fn((provided: object) => ({
        ...provided,
        borderRadius: "180px",
      }));
      const optionSpy = vi.fn((provided: object) => ({
        ...provided,
        backgroundColor: primary,
      }));
      render(
        <Select
          classNamePrefix="react-select"
          options={OPTIONS}
          value={OPTIONS[0]}
          menuIsOpen
          chakraStyles={{ menu: menuSpy, option: optionSpy }}
        />
      );
      expect(menuSpy).toHaveBeenCalled();
      const menuResult = menuSpy.mock.results[0].value as Record<
        string,
        unknown
      >;
      expect(menuResult).toMatchObject({ borderRadius: "180px" });

      expect(optionSpy).toHaveBeenCalled();
      const optionResults = optionSpy.mock.results.map(
        (r) => (r.value as Record<string, unknown>).backgroundColor
      );
      expect(optionResults.every((bg) => bg === primary)).toBe(true);
    });

    test("receives full state and props for each component slot", () => {
      interface OptionState {
        isSelected: boolean;
        isFocused: boolean;
        data: unknown;
      }
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
      // Exactly one distinct option value should be selected (the spy may be
      // called multiple times per option due to React render cycles).
      const uniqueSelectedData = new Set(
        states.filter((s) => s.isSelected).map((s) => JSON.stringify(s.data))
      );
      expect(uniqueSelectedData.size).toBe(1);
    });
  });

  describe("tagColorScheme / tagVariant", () => {
    test("forwards tagColorScheme to MultiValue via selectProps", () => {
      let captured: ColorScheme | undefined;
      render(
        <Select
          classNamePrefix="react-select"
          isMulti
          options={OPTIONS}
          value={[OPTIONS[0]]}
          tagColorScheme="purple"
          chakraStyles={{
            multiValue: (provided, state) => {
              captured = state.selectProps.tagColorScheme;
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
      expect(captured).toBe("color");
    });
  });

  describe("selectedOptionColorScheme", () => {
    test("forwards the color scheme to Option via selectProps", () => {
      let captured: ColorScheme | undefined;
      render(
        <Select
          classNamePrefix="react-select"
          options={OPTIONS}
          value={OPTIONS[0]}
          menuIsOpen
          selectedOptionColorScheme="purple"
          chakraStyles={{
            option: (provided, state) => {
              if (state.isSelected) {
                captured = state.selectProps.selectedOptionColorScheme;
              }
              return provided;
            },
          }}
        />
      );
      expect(captured).toBe("purple");
    });
  });

  describe("focusBorderColor", () => {
    test("forwards to the Control via selectProps", () => {
      let captured: string | undefined;
      render(
        <Select
          classNamePrefix="react-select"
          options={OPTIONS}
          focusBorderColor="blue.600"
          chakraStyles={{
            control: (provided, state) => {
              captured = state.selectProps.focusBorderColor;
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
      const onChange = vi.fn<() => void>();
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
      expect(props.selectedOptionColorScheme).toBe("blue");
      expect(props.menuPlacement).toBe("auto");

      // Chakra components attached for every slot.
      expect(props.components).toBeDefined();
      for (const key of Object.keys(chakraComponents)) {
        expect(props.components).toHaveProperty(key);
      }

      // Caller props pass through.
      expect(props.isMulti).toBe(true);
      expect(props.options).toBe(OPTIONS);
      expect(props.value).toStrictEqual([OPTIONS[0]]);
      expect(props.onChange).toBe(onChange);
    });

    test("forwards isDisabled to the output props", () => {
      const { result } = renderHook(
        () => useChakraSelectProps<Option>({ isDisabled: true }),
        { wrapper: Wrapper }
      );
      expect(result.current.isDisabled).toBe(true);
    });
  });
});
