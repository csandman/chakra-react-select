import type { ReactElement, ReactNode } from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import {
  render as rtlRender,
  type RenderOptions,
} from "@testing-library/react";

export const Wrapper = ({ children }: { children: ReactNode }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
);

export const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => rtlRender(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
