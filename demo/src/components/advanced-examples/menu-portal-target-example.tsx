import { useState } from "react";
import { Stack } from "@chakra-ui/react";
import type { Props as SelectProps } from "chakra-react-select";
import { Select } from "chakra-react-select";
import { colorOptions } from "../../data/options";
import { Button } from "../ui/button";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field } from "../ui/field";
import { Switch } from "../ui/switch";

const MenuPortalTargetExample = () => {
  const [isPortalEnabled, setIsPortalEnabled] = useState(false);

  const portalProps: SelectProps = {
    menuPortalTarget: document.body,
    styles: {
      menuPortal: (base) => ({
        ...base,
        // This could be --chakra-z-index-dropdown, to match the built-in Select component,
        // but we need to make sure it's above the Dialog component for this use case.
        zIndex: "var(--chakra-z-index-popover)",
        // By default, the Chakra Dialog component will set pointer-events to none on the body element.
        // We need to override this behavior to allow the menu to be interacted with.
        // This isn't necessary if you pass modal={false} to the Dialog component.
        pointerEvents: "auto",
      }),
    },
  };

  return (
    <DialogRoot closeOnInteractOutside={false}>
      <DialogBackdrop />
      <DialogTrigger asChild>
        <Button colorPalette="blue">Open Modal</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Menu Portal Target Example</DialogTitle>
        </DialogHeader>
        <DialogBody overflow="hidden">
          <Stack gap={4}>
            <Select
              focusRingColor="blue.600"
              options={colorOptions}
              defaultValue={colorOptions[0]}
              menuShouldScrollIntoView={false}
              {...(isPortalEnabled ? portalProps : {})}
            />

            <Field>
              <Switch
                colorPalette="blue"
                name="enable-portal"
                checked={isPortalEnabled}
                onCheckedChange={({ checked }) => {
                  setIsPortalEnabled(checked);
                }}
                inputProps={{ onBlur: () => {} }}
              >
                Enable Portal
              </Switch>
            </Field>
          </Stack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default MenuPortalTargetExample;
