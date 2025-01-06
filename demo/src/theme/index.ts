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
    },
  },
});

const crsSystem = createSystem(defaultConfig, config);

export default crsSystem;
