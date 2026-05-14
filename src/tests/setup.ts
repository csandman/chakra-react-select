import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// `@testing-library/react` only auto-registers `cleanup()` after each test
// when `afterEach` is on the global (i.e. when `globals: true`). With
// explicit imports we wire cleanup up manually so test DOMs don't leak.
afterEach(() => {
  cleanup();
});

// jsdom's CSS parser cannot read modern CSS that Chakra emits (@layer,
// container queries, etc.) and emits a `jsdomError` for every <style> insert.
// Replace the default jsdomError listener (which logs via console.error) with
// one that filters that single noisy message.
const win = window as unknown as {
  _virtualConsole?: {
    removeAllListeners: (event: string) => void;
    on: (event: string, fn: (err: Error) => void) => void;
  };
};
if (win._virtualConsole) {
  win._virtualConsole.removeAllListeners("jsdomError");
  win._virtualConsole.on("jsdomError", (err) => {
    if (err.message?.includes("Could not parse CSS stylesheet")) {
      return;
    }
    console.error(err);
  });
}

// jsdom does not implement matchMedia; some Chakra components query it on
// mount. Provide a minimal stub.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  });
}
