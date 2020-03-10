import React from "react";
import Axios from "axios";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Analytics from "react-router-ga";
import Main from "./pages/main/main";
import config from "./constants";
import Detail from "./pages/detail/detail";

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
  console.log("Url param is invalid.");
  return false;
};

const App = () => {
  const renderRouter = () => (
    <Switch>
      <Route
        path="/characters/:page"
        render={routeProps =>
          routeProps.match &&
          isNumericParam(routeProps.match.params.page, config.maxPage) ? (
            <Main page={parseInt(routeProps.match.params.page, 10)} />
          ) : (
            <Redirect to={{ pathname: "/characters/1" }} />
          )
        }
      />
      <Route
        path="/character/:id"
        render={routeProps =>
          routeProps.match && isNumericParam(routeProps.match.params.id) ? (
            <Detail id={parseInt(routeProps.match.params.id, 10)} />
          ) : (
            <Redirect to={{ pathname: "/characters/1" }} />
          )
        }
      />
      {/* Unknown routes redirect to main page */}
      <Route path="*">
        <Redirect to={{ pathname: "/characters/1" }} />
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
