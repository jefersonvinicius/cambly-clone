import { useAuthContext } from "contexts/AuthContext";
import React from "react";

export default function Main() {
  const { user } = useAuthContext();

  return (
    <div data-testid="main-page">
      <p>Welcome {user?.name}</p>
    </div>
  );
}
