import React from "react";
import { Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
// import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
// import sinon from "sinon";
import { mount } from "enzyme";
import App from "./app";
import store from "./store";
import config from "./shared/constants";
import Main from "./pages/main/main";
import Detail from "./pages/detail/detail";

describe("<App />", () => {
  beforeAll(function() {
    // sinon.stub(Main, "default").returns(<div>A stub</div>);
  });

  it("Load main page 2", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={config.theme}>
          <MemoryRouter initialEntries={["/characters/2"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const wrapMain = wrapper.find(Main);
    expect(wrapMain).toHaveLength(1);
    expect(wrapMain.html()).toMatch("Page 2 of");
  });

  it("Load detail page with id 2", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={config.theme}>
          <MemoryRouter initialEntries={["/character/2"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find(Detail)).toHaveLength(1);
  });
});
