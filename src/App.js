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
Axios.defaults.transformRequest = obj => {
  if (obj) {
    return Object.keys(obj)
      .map(p => `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
      .join("&");
  }
  return [];
};

const App = () => {
  const renderRouter = () => (
    <Switch>
      <Route exact path="/characters">
        <Main />
      </Route>
      <Route path="/characters/:id">
        <Detail />
      </Route>
      {/* Unknown routes redirect to main page */}
      <Route path="*">
        <Redirect to={{ pathname: "/characters" }} />
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
