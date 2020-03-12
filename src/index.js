import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
import config from "./shared/constants";
import store from "./store";
import "./index.css";

/**
 * The start of the whole app. Mounts the app in the 'root' DOM node and provides:
 * - Redux store
 * - styled-components theme
 */
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={config.theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
