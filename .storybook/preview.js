import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import config from "../src/constants";
import "../src/index.css";

const addTheme = storyFn => (
  <ThemeProvider theme={config.theme}>{storyFn()}</ThemeProvider>
);
addDecorator(addTheme);

const customViewPorts = {
  mobileMenu: {
    name: "mobile menu 100px x 387px",
    styles: {
      height: "387px",
      width: "100px"
    },
    type: "mobile"
  },
  iphone5: {
    name: "iPhone 5 320w x 568h",
    styles: {
      height: "568px",
      width: "320px"
    },
    type: "mobile"
  },
  width640: {
    name: "width 640px",
    styles: {
      height: "640px",
      width: "640px"
    },
    type: "mobile"
  },
  ipad: {
    name: "iPad 768w x 1024h",
    styles: {
      height: "1024px",
      width: "768px"
    },
    type: "tablet"
  },
  desktop: {
    name: "Desktop 1024w x 768h",
    styles: {
      height: "768px",
      width: "1024px"
    },
    type: "desktop"
  }
};

addParameters({
  viewport: {
    viewports: customViewPorts,
    defaultViewport: "desktop"
  }
});
