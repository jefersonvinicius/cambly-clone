import { render, screen } from "@testing-library/react";
import React from "react";
import { Route } from "react-router";
import { RoutesPath } from "routes";
import { SocketServer } from "services/socket-server";

import TestingRouter from "__tests__/mocks/components/TestingRouter";
import WaitingRoom from ".";

describe("<WaitingRoom />", () => {
  let connectTeacherSpy = jest
    .spyOn(SocketServer, "connectTeacher")
    .mockImplementation();

  let teacherOpenToLessonSpy = jest
    .spyOn(SocketServer, "openTeacherToLesson")
    .mockImplementation();

  it("should display a loading indicator while is waiting", () => {
    const { elements } = renderSut();

    expect(elements.loadingIndicator).toBeInTheDocument();
  });

  it("should connect to socket server", () => {
    renderSut();

    expect(connectTeacherSpy).toHaveBeenCalledTimes(1);
    expect(teacherOpenToLessonSpy).toHaveBeenCalledTimes(1);
  });
});

function renderSut() {
  render(
    <TestingRouter initialEntries={[RoutesPath.WaitingRoom]}>
      <Route path={RoutesPath.WaitingRoom} component={WaitingRoom} />
    </TestingRouter>
  );

  const elements = {
    loadingIndicator: screen.getByTestId("loading-indicator"),
  };

  return { elements };
}
