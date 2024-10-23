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
    // @ts-expect-error - This is a bug in the types?
    cursor: {
      button: { value: "pointer" },
    },
  },
});

const crsSystem = createSystem(defaultConfig, config);

export default crsSystem;
