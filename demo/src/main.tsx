import { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import App from "./app";
import ColorModeSwitch from "./components/color-mode-switch";
import theme from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
      <ColorModeSwitch />
    </ChakraProvider>
  </StrictMode>
);
