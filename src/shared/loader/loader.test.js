import React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import config from "../constants";
import Loader from "./loader";

const MyThemeProvider = ({ children }) => (
  <ThemeProvider theme={config.theme}>{children}</ThemeProvider>
);

describe.skip("<Loader />", () => {
  it("Renders without crashing", () => {
    mount(<Loader />, {
      wrappingComponent: MyThemeProvider
    });
  });
});
