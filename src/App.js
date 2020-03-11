import React from "react";
import Axios from "axios";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Analytics from "react-router-ga";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./pages/main/main";
import config from "./shared/constants";
import Detail from "./pages/detail/detail";

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
Axios.defaults.transformRequest = (obj = {}) => {
  obj.apiKey = config.marvelApiKey;
  return Object.keys(obj)
    .map(p => `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    .join("&");
};

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
              return <Main page={parseInt(routeProps.match.params.page, 10)} />;
            } else {
              toast.error("Invalid page, redirect to main page.");
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
              return <Detail id={parseInt(routeProps.match.params.id, 10)} />;
            } else {
              console.log(
                "Invalid character id, redirect to main page.",
                routeProps.match.params
              );
              toast.error("Invalid character id, redirect to main page.");
              return <Redirect to="/characters/1" />;
            }
          }
        }}
      />
      {/* Unknown routes redirect to main page */}
      <Route path="*">
        <Redirect to="/characters/1" />
      </Route>
    </Switch>
  );

  return (
    <BrowserRouter>
      {config.googleApiKey ? (
        <Analytics id={config.googleApiKey}>{renderRouter()}</Analytics>
      ) : (
        renderRouter()
      )}
    </BrowserRouter>
  );
};

export default App;
