import React, { ReactNode } from "react";
import { Router, Switch } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";
import ProvidersComposed from "./ProvidersComposed";

type Props = {
  initialEntries?: string[];
  history?: MemoryHistory;
  children: ReactNode;
};

export default function TestingRouter(props: Props) {
  const history = createMemoryHistory({
    initialEntries: props.initialEntries,
  });

  return (
    <ProvidersComposed>
      <Router history={props.history ?? history}>
        <Switch>{props.children}</Switch>
      </Router>
    </ProvidersComposed>
  );
}
