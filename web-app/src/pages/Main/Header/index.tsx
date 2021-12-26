import React from "react";
import { useHistory } from "react-router-dom";
import { RoutesPath } from "routes";

export default function Header() {
  const history = useHistory();

  function handleOpenToLesson() {
    history.push(RoutesPath.WaitingRoom);
  }

  return (
    <button data-testid="open-to-lesson" onClick={handleOpenToLesson}>
      Praticar
    </button>
  );
}
