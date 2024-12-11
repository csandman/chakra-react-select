import type { HTMLChakraProps } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";

/**
   
 This file is internal and should not be exported to the consumer.
 
 We only add icons really needed for the component to looks good by default.
 We're not in the business of creating icons.
 
 Please find ideas from https://react-icons.github.io/react-icons/ 

 TODO: Flesh this out: Copied from Chakra UI
 @see {@link https://github.com/chakra-ui/chakra-ui/blob/d0f502f/packages/react/src/components/icons.tsx}

 */

interface SvgProps extends HTMLChakraProps<"svg"> {}

export const CheckIcon = (props: SvgProps) => (
  <chakra.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </chakra.svg>
);

export const ChevronDownIcon = (props: SvgProps) => (
  <chakra.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </chakra.svg>
);

export const CloseIcon = (props: SvgProps) => (
  <chakra.svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711Z"
    />
  </chakra.svg>
);
