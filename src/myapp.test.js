// unit tests App component, focused on routing
import React from "react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { mount } from "enzyme";
import mockAxios from "axios";
import App from "./myapp";
import store from "./store";
import config from "./shared/constants";
import Main from "./pages/main/main";
import Detail from "./pages/detail/detail";

/**
 * Return App component as child:
 * - MemoryRouter will allow routing testing.
 * - ThemeProvider provides styled-components global theme.
 * - Provider provides Redux store
 *
 * @param {Object} props - {mockinit Array}
 */
const AppWithProviders = ({ mockInit }) => (
  <Provider store={store}>
    <ThemeProvider theme={config.theme}>
      <MemoryRouter initialEntries={mockInit}>
        <App />
      </MemoryRouter>
    </ThemeProvider>
  </Provider>
);

describe("<App />", () => {
  // Any API GET request will return a mocked response.
  // Response is not used on tests, it is provided to comply the flow.
  beforeAll(() => {
    mockAxios.get.mockResolvedValueOnce({
      data: { data: { total: 0, results: [] } }
    });
  });

  // Test loading main on page 2
  it("Load main page 2", () => {
    const wrapper = mount(<AppWithProviders mockInit={["/characters/2"]} />);
    const wrapMain = wrapper.find(Main);
    expect(wrapMain).toHaveLength(1);
    expect(wrapMain.html()).toMatch("Page 2 of");
  });

  // Test loading detail page for character id 2
  it("Load detail page with id 2", () => {
    const wrapper = mount(<AppWithProviders mockInit={["/character/2"]} />);
    expect(wrapper.find(Detail)).toHaveLength(1);
  });

  // Test redirect to main on page 1 for bad urls
  it("Redirect on bad Url", () => {
    const wrapper = mount(<AppWithProviders mockInit={["/foo"]} />);
    const wrapMain = wrapper.find(Main);
    expect(wrapMain).toHaveLength(1);
    expect(wrapMain.html()).toMatch("Page 1 of");
  });

  // Test redirection if page parameter is invalid
  it("Redirect on bad page id", () => {
    const wrapper = mount(<AppWithProviders mockInit={["/characters/foo"]} />);
    const wrapMain = wrapper.find(Main);
    expect(wrapMain).toHaveLength(1);
    expect(wrapMain.html()).toMatch("Page 1 of");
  });

  // test redirection on Detail page if id is invalid
  it("Redirect on bad character id", () => {
    const wrapper = mount(<AppWithProviders mockInit={["/character/foo"]} />);
    const wrapMain = wrapper.find(Main);
    expect(wrapMain).toHaveLength(1);
    expect(wrapMain.html()).toMatch("Page 1 of");
  });
});
