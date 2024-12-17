import { StrictMode } from "react";
import {
  Box,
  ChakraProvider,
  Container,
  EnvironmentProvider,
  Text,
} from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import { ColorModeButton } from "./components/ui/color-mode";
import "./styles.css";
import crsSystem from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EnvironmentProvider>
      <ChakraProvider value={crsSystem}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Box
            borderBottomWidth={1}
            position="sticky"
            top={0}
            zIndex={1}
            bg="background"
            py={2}
          >
            <Container maxWidth="lg" display="flex" alignItems="center" gap={2}>
              <ColorModeButton />
              <Text fontWeight="medium">Color Mode</Text>
            </Container>
          </Box>
          <App />
        </ThemeProvider>
      </ChakraProvider>
    </EnvironmentProvider>
  </StrictMode>
);
