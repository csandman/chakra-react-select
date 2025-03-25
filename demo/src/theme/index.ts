import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineSlotRecipe,
} from "@chakra-ui/react";
import { selectAnatomy, tagAnatomy } from "@chakra-ui/react/anatomy";

const tagSlotRecipe = defineSlotRecipe({
  slots: tagAnatomy.keys(),
  base: {
    closeTrigger: {
      cursor: "pointer",
    },
  },
  defaultVariants: {
    // Uncomment to modify the default colorPalette
    // colorPalette: "blue",
    // TODO: Figure out how to make this work
    // variant: "subtle",
  },
});

const selectSlotRecipe = defineSlotRecipe({
  slots: selectAnatomy.keys(),
  defaultVariants: {
    // Uncomment to modify the default size of the select
    // size: "sm",
  },
  // Uncomment this and run `npm run typegen` to generate the new variant, usable as the main variant prop
  // variants: {
  //   variant: {
  //     flushed: {},
  //   },
  // },
});

const config = defineConfig({
  theme: {
    slotRecipes: {
      tag: tagSlotRecipe,
      select: selectSlotRecipe,
    },
    tokens: {
      cursor: {
        button: { value: "pointer" },
        option: { value: "pointer" },
      },
      colors: {
        brand: {
          50: { value: "#f3f8fd" },
          100: { value: "#d1e2f8" },
          200: { value: "#a9c8f2" },
          300: { value: "#77a8eb" },
          400: { value: "#5a96e7" },
          500: { value: "#327ce1" },
          600: { value: "#0b63dc" },
          700: { value: "#004eb9" },
          800: { value: "#00429d" },
          900: { value: "#003072" },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "white" },
          fg: { value: "{colors.brand.700}" },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.200}" },
          emphasized: { value: "{colors.brand.300}" },
          focusRing: { value: "{colors.brand.500}" },
        },
      },
    },
  },
});

const crsSystem = createSystem(defaultConfig, config);

export default crsSystem;
