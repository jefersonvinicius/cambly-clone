import WaitingRoom from "pages/WatingRoom";
import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Routes } from "./Routes";
import { RoutesPath } from "./RoutesPath";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {Routes.LogIn}
        {Routes.Main}
        <PrivateRoute exact path={RoutesPath.WaitingRoom}>
          <WaitingRoom />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export * from "./Routes";
export * from "./RoutesPath";
