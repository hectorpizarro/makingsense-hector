/**
 * First component loaded in the application, used for:
 * - Initializes libraries: react-toastify, Axios.
 * - Provides routing using react-router-dom.
 */
import React from "react";
import Axios from "axios";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Analytics from "react-router-ga";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./pages/main/main";
import config from "./shared/constants";
import Detail from "./pages/detail/detail";

// Toast setup.
toast.configure({
  autoClose: 3000,
  hideProgressBar: true,
  newestOnTop: true,
  draggable: false
});

/**
 * Axios setup. Set function to transform request data into url encoded string.
 */
Axios.defaults.baseURL = config.baseUrl;
Axios.defaults.maxContentLength = config.maxContentLength;

/**
 * Returns true if provided 'param' is a numeric int string and:
 * - If 'max' is provided, value should be between [1, max].
 * - If no 'max' defined value should be between [1 ... ].
 * @param {String} param - Value to test as numeric
 * @param {Number} max - Hard limit, max value allowed for param
 * @returns {Boolean}
 */
const isNumericParam = (param, max) => {
  if (/^\d+$/.test(param)) {
    // Param is numeric string
    const n = parseInt(param, 10);
    if (max) {
      // Return TRUE if n is in [1, 9999]
      if (n >= 1 && n <= max) {
        return true;
      }
    } else if (n >= 1) {
      return true;
    }
  }
  return false;
};

const App = () => {
  const renderRouter = () => (
    <Switch>
      <Route
        path="/characters/:page"
        render={routeProps => {
          if (routeProps.match) {
            if (isNumericParam(routeProps.match.params.page, config.maxPage)) {
              // Render Main if page is valid
              return <Main page={parseInt(routeProps.match.params.page, 10)} />;
            } else {
              // page invalid, redirect to first page
              return <Redirect to="/characters/1" />;
            }
          }
        }}
      />
      <Route
        path="/character/:id"
        render={routeProps => {
          if (routeProps.match) {
            if (isNumericParam(routeProps.match.params.id)) {
              // Render Detail if id is valid
              return <Detail id={parseInt(routeProps.match.params.id, 10)} />;
            } else {
              // id invalid, redirect to Main on first page
              return <Redirect to="/characters/1" />;
            }
          }
        }}
      />
      {/* Unknown routes redirect to Main on first page */}
      <Route path="*">
        <Redirect to="/characters/1" />
      </Route>
    </Switch>
  );

  return (
    <BrowserRouter>
      {/* If Google API provided use Analytics */}
      {config.googleApiKey ? (
        <Analytics id={config.googleApiKey}>{renderRouter()}</Analytics>
      ) : (
        renderRouter()
      )}
    </BrowserRouter>
  );
};

export default App;
