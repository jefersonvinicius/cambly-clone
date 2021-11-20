import { AuthContextValue } from "contexts/AuthContext";
import { createMemoryHistory, MemoryHistory } from "history";
import React, { ReactNode } from "react";
import { Router, Switch } from "react-router-dom";

type Props = {
  initialEntries?: string[];
  history?: MemoryHistory;
  children: ReactNode;
  contextsValues?: {
    auth?: Partial<AuthContextValue>;
  };
};

export default function TestingRouter(props: Props) {
  const history = createMemoryHistory({
    initialEntries: props.initialEntries,
  });

  return (
    <Router history={props.history ?? history}>
      <Switch>{props.children}</Switch>
    </Router>
  );
}
