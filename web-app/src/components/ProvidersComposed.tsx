import AuthContextProvider from "contexts/AuthContext";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ProvidersComposed(props: Props) {
  return <AuthContextProvider>{props.children}</AuthContextProvider>;
}
