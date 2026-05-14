// Ported from react-select@5.10.2:
//   https://github.com/JedWatson/react-select/blob/react-select%405.10.2/packages/react-select/src/__tests__/AsyncCreatable.test.tsx
// When bumping the react-select dep, diff upstream at the new tag against
// this file and port relevant additions/changes. Wrapper-specific
// adaptations (Chakra render wrapper, userEvent v14 async, jsdom
// workarounds) should remain. Chakra-specific tests live in
// ./chakra-specific.test.tsx.
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { AsyncCreatableSelect as AsyncCreatable } from "../index";
import { Option, OPTIONS } from "./constants";
import { render, waitFor } from "./render";

test("creates an inner Select", () => {
  const { container } = render(
    <AsyncCreatable className="react-select" classNamePrefix="react-select" />
  );
  expect(container.querySelector(".react-select")).toBeInTheDocument();
});

test("render decorated select with props passed", () => {
  const { container } = render(
    <AsyncCreatable className="foo" classNamePrefix="foo" />
  );
  expect(container.querySelector(".foo")).toBeInTheDocument();
});

test("to show the create option in menu", async () => {
  const user = userEvent.setup();
  let { container, rerender } = render(
    <AsyncCreatable className="react-select" classNamePrefix="react-select" />
  );
  let input = container.querySelector("input.react-select__input");
  rerender(
    <AsyncCreatable
      className="react-select"
      classNamePrefix="react-select"
      inputValue="a"
    />
  );
  await user.type(input!, "a");
  expect(container.querySelector(".react-select__option")!.textContent).toBe(
    'Create "a"'
  );
});

test("to show loading and then create option in menu", async () => {
  const user = userEvent.setup();
  let loadOptionsSpy = vi.fn(
    (_inputValue: string, callback: (options: readonly Option[]) => void) => {
      setTimeout(() => callback(OPTIONS), 200);
    }
  );
  let { container } = render(
    <AsyncCreatable
      className="react-select"
      classNamePrefix="react-select"
      loadOptions={loadOptionsSpy}
    />
  );
  let input = container.querySelector("input.react-select__input");
  await user.type(input!, "a");

  // to show a loading message while loading options
  expect(container.querySelector(".react-select__menu")!.textContent).toBe(
    "Loading..."
  );
  await waitFor(() => {
    // show create options once options are loaded
    let options = container.querySelectorAll(".react-select__option");
    expect(options[options.length - 1].textContent).toBe('Create "a"');
  });
});
