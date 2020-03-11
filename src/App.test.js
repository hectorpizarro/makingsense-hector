import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import sinon from "sinon";
import App from "./app";
import store from "./store";
import config from "./shared/constants";
import * as Main from "./pages/main/main";

describe("<App />", () => {
  it.skip("Invalid URL redirects to main", () => {
    const history = createMemoryHistory({ initialEntries: ["/foo"] });
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={config.theme}>
          <Router history={history}>
            <App />
          </Router>
        </ThemeProvider>
      </Provider>
    );
    expect(container.innerHTML).toMatch("Page 1 of");
  });

  it.skip("Invalid page redirects to main on page 1", () => {
    const history = createMemoryHistory({
      initialEntries: ["/characters/aaa"]
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={config.theme}>
          <Router history={history}>
            <App />
          </Router>
        </ThemeProvider>
      </Provider>
    );
    expect(container.innerHTML).toMatch("Page 1 of");
  });

  beforeAll(function() {
    sinon.stub(Main, "default").returns(<div>A stub</div>);
  });

  it("Load main page 2", () => {
    const history = createMemoryHistory({
      initialEntries: ["/characters/2"]
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={config.theme}>
          <Router history={history}>
            <App />
          </Router>
        </ThemeProvider>
      </Provider>
    );
    expect(container.innerHTML).toMatch("A stub");
  });

  it.skip("Character detail with invalid id redirects to main on page 1", () => {
    sinon.stub(ToStubComponent, "default").returns(<div>A stub</div>);
    const history = createMemoryHistory({
      initialEntries: ["/character/aaa"]
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={config.theme}>
          <Router history={history}>
            <App />
          </Router>
        </ThemeProvider>
      </Provider>
    );
    expect(container.innerHTML).toMatch("Page 1 of");
  });

  // it("Character detail with valid id", () => {
  //   const history = createMemoryHistory({
  //     initialEntries: ["/character/1"]
  //   });
  //   const { container } = render(
  //     <Provider store={store}>
  //       <ThemeProvider theme={config.theme}>
  //         <Router history={history}>
  //           <App />
  //         </Router>
  //       </ThemeProvider>
  //     </Provider>
  //   );
  //   expect(container.innerHTML).toMatch("Character Detail");
  // });
});
