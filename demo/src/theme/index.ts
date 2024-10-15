import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";
import { tagAnatomy } from "@chakra-ui/anatomy";

const tagHelpers = createMultiStyleConfigHelpers(tagAnatomy.keys);

const tagTheme = tagHelpers.defineMultiStyleConfig({
  defaultProps: {
    // Note: Uncomment this to show the solid variant as the default
    // variant: "solid",
  },
});

const theme = extendTheme({
  colors: {},
  components: {
    Tag: tagTheme,
  },
});

export default theme;