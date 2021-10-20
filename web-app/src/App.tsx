import AuthContextProvider from "contexts/AuthContext";
import React from "react";
import Routes from "routes";

export default function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}
