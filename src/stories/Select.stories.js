/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Container } from "@chakra-ui/react";
import Select from "../select";

export default {
  component: Select,
  title: "Select",
};

export const DefaultSelect = () => (
  <Container>
    <Select
      isMulti
      options={[
        {
          label: "I can't be removed",
          value: "fixed",
          isFixed: true,
        },
        {
          label: "I can be removed",
          value: "not-fixed",
        },
      ]}
    />
  </Container>
);
