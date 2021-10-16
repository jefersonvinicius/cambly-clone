import React from "react";
import Login from "pages/Login";
import Main from "pages/Main";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

export enum RoutesPath {
  StudentLogin = "/student/login",
  StudentMain = "/student",
}

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path={RoutesPath.StudentLogin} component={Login} />
        <Route exact path={RoutesPath.StudentMain} component={Main} />
      </Switch>
    </Router>
  );
}
