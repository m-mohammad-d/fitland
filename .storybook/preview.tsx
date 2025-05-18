import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import React from "react";
import ApolloClientProvider from "../src/provider/ApolloClientProvider";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ApolloClientProvider>
        <Story />
      </ApolloClientProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
