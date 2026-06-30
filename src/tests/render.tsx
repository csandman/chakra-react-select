import type { ReactElement, ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { render as rtlRender } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";

export const Wrapper = ({ children }: { children: ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

export const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => rtlRender(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
