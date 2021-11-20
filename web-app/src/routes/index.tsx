import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Routes } from "./Routes";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {Routes.LogIn}
        {Routes.Main}
      </Switch>
    </BrowserRouter>
  );
}

export * from "./Routes";
export * from "./RoutesPath";
