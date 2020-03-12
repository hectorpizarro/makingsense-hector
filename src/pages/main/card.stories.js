// Storybook tests for Card component
import React from "react";
import Card from "./card";

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
export const Desktop1024x768 = () => <Card character={character} />;
Desktop1024x768.story = {
  parameters: {
    viewport: { defaultViewport: "desktop" }
  }
};

// Test on mobile
export const Mobile320x568 = () => <Card character={character} />;
Mobile320x568.story = {
  parameters: {
    viewport: { defaultViewport: "iphone5" }
  }
};
