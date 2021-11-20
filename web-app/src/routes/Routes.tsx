import React from "react";
import Login from "pages/Login";
import Main from "pages/Main";
import { Route } from "react-router-dom";
import { RoutesPath } from "./RoutesPath";
import PrivateRoute from "./PrivateRoute";

const LogInRoute = (
  <Route exact path={RoutesPath.StudentLogin}>
    <Login />
  </Route>
);

const MainRoute = (
  <PrivateRoute exact path={RoutesPath.StudentMain}>
    <Main />
  </PrivateRoute>
);

const Routes = {
  LogIn: LogInRoute,
  Main: MainRoute,
};

export { Routes };
