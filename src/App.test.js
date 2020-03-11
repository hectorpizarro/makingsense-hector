import React from "react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { mount } from "enzyme";
import App from "./app";
import store from "./store";
import config from "./shared/constants";
import Main from "./pages/main/main";
import Detail from "./pages/detail/detail";

describe("<App />", () => {
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

  it("Redirect on bad Url", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={config.theme}>
          <MemoryRouter initialEntries={["/foo"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const wrapMain = wrapper.find(Main);
    expect(wrapMain).toHaveLength(1);
    expect(wrapMain.html()).toMatch("Page 1 of");
  });

  it("Redirect on bad page id", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={config.theme}>
          <MemoryRouter initialEntries={["/characters/foo"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const wrapMain = wrapper.find(Main);
    expect(wrapMain).toHaveLength(1);
    expect(wrapMain.html()).toMatch("Page 1 of");
  });

  it("Redirect on bad character id", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={config.theme}>
          <MemoryRouter initialEntries={["/character/foo"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const wrapMain = wrapper.find(Main);
    expect(wrapMain).toHaveLength(1);
    expect(wrapMain.html()).toMatch("Page 1 of");
  });
});
