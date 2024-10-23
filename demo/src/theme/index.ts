import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSlotRecipe,
} from "@chakra-ui/react";
import { tagAnatomy } from "@chakra-ui/react/anatomy";

export const inputRecipe = defineRecipe({
  defaultVariants: {
    colorPalette: "blue",
  },
});

export const tagSlotRecipe = defineSlotRecipe({
  slots: tagAnatomy.keys(),
  defaultVariants: {
    colorPalette: "blue",
    // TODO: Figure out how to make this work
    // variant: "subtle",
  },
});

const config = defineConfig({
  theme: {
    slotRecipes: {
      tag: tagSlotRecipe,
    },
  },
});

const crsSystem = createSystem(defaultConfig, config);

export default crsSystem;
