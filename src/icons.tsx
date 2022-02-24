/* eslint-disable max-len */
import * as React from "react";
import { Icon, IconProps, createIcon } from "@chakra-ui/icon";

export const CaretDownIcon = createIcon({
  displayName: "CaretDownIcon",
  viewBox: "0 0 14 24",
  d: "M7.707 15.293a1 1 0 01-1.414 0l-4.586-4.586C1.077 10.077 1.523 9 2.414 9h9.172c.89 0 1.337 1.077.707 1.707l-4.586 4.586z",
});

export const CaretUpIcon = createIcon({
  displayName: "CaretUpIcon",
  viewBox: "0 0 14 24",
  d: "M6.293 8.707a1 1 0 011.414 0l4.586 4.586c.63.63.184 1.707-.707 1.707H2.414c-.89 0-1.337-1.077-.707-1.707l4.586-4.586z",
});

export const CloseIcon: React.FC<IconProps> = (props) => (
  <Icon
    aria-hidden
    color="gray.700"
    focusable="false"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M6.5 6.5C10.7958 10.7958 17.5 17.5 17.5 17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
    />
    <path
      d="M17.5 6.5C13.2042 10.7958 6.5 17.5 6.5 17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
    />
  </Icon>
);

export const CheckIcon = createIcon({
  displayName: "CheckIcon",
  viewBox: "0 0 12 10",
  path: (
    <path
      d="M1 5L4 8L11 1"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  ),
});
