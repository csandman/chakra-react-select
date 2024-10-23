import { StrictMode } from "react";
import { ChakraProvider, EnvironmentProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import crsSystem from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EnvironmentProvider>
      <ChakraProvider value={crsSystem}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <App />
        </ThemeProvider>
      </ChakraProvider>
    </EnvironmentProvider>
  </StrictMode>
);
