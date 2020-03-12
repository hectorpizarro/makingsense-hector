// Storybook tests for Card component
import React from "react";
import Card from "./card";
import { Provider } from "react-redux";
import store from "../../store";
import { ThemeProvider } from "styled-components";
import config from "../../shared/constants";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Main / Card",
  component: Card,
  parameters: {
    notes: "Main - card component."
  }
};

const character = {
  id: 1009146,
  name: "Abomination (Emil Blonsky)",
  image: "/testimages/4ce18691cbf04.jpg",
  nComics: 53,
  nSeries: 26,
  nStories: 0,
  nEvents: 1
};

// Test on Desktop
export const Desktop1024x768 = () => (
  <Provider store={store}>
    <ThemeProvider theme={config.theme}>
      <MemoryRouter>
        <Card character={character} />
      </MemoryRouter>
    </ThemeProvider>
  </Provider>
);
Desktop1024x768.story = {
  parameters: {
    viewport: { defaultViewport: "desktop" }
  }
};

// Test on mobile
export const Mobile320x568 = () => (
  <Provider store={store}>
    <ThemeProvider theme={config.theme}>
      <MemoryRouter>
        <Card character={character} />
      </MemoryRouter>
    </ThemeProvider>
  </Provider>
);
Mobile320x568.story = {
  parameters: {
    viewport: { defaultViewport: "iphone5" }
  }
};
