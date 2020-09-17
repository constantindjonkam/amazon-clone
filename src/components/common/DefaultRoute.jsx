import React from "react";
import { Route } from "react-router-dom";

import Header from "../Header";

function DefaultRoute({ Component, ...rest }) {
  return (
    <Route {...rest}>
      <Header />
      <Component />
    </Route>
  );
}

export default DefaultRoute;
