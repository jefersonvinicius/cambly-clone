import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthContextValue } from "contexts/AuthContext";
import { UserTypes } from "models/User";
import Main from "pages/Main";
import { Route } from "react-router";
import { RoutesPath } from "routes";
import { TeachersService } from "services/teachers";
import TestingAuthContext from "__tests__/mocks/components/TestingAuthContext";
import { TestingReactQueryClient } from "__tests__/mocks/components/TestingReactQueryClient";
import TestingRouter from "__tests__/mocks/components/TestingRouter";
import { createTeacher } from "__tests__/tests-factories";

describe("MainPage", () => {
  let fetchTeachersAvailable = jest
    .spyOn(TeachersService, "fetchAvailable")
    .mockImplementation();

  beforeEach(() => {
    jest.useRealTimers();
  });

  it("should display user name correctly", async () => {
    renderSut();
    expect(await screen.findByText(/Welcome Jeferson/)).toBeInTheDocument();
  });

  it("should a display loading while is fetching the teachers", async () => {
    fetchTeachersAvailable.mockResolvedValue([]);

    renderSut();
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  it("should display the teachers available when logged user is student", async () => {
    fetchTeachersAvailable.mockResolvedValue(teachersSample());

    renderSut();
    expect(await screen.findAllByTestId("user-image")).toHaveLength(5);
  });

  it("should display empty message when has not teachers available", async () => {
    fetchTeachersAvailable.mockResolvedValue([]);

    renderSut();
    expect(
      await screen.findByText("No momento não tem nenhum professor disponível")
    ).toBeInTheDocument();
  });

  it("should go to waiting room after of open to lesson", async () => {
    fetchTeachersAvailable.mockResolvedValue([]);

    const { elements } = renderSut();
    userEvent.click(await elements.openToLessonButton());

    expect(await screen.findByText("Please, wait...")).toBeInTheDocument();
  });
});

type Props = {
  authCtxValue: Partial<AuthContextValue>;
};

function renderSut(props?: Props) {
  render(
    <TestingReactQueryClient>
      <TestingRouter initialEntries={[RoutesPath.Main]}>
        <TestingAuthContext {...authContextWithUser()}>
          <Route path={RoutesPath.Main} component={Main} />
          <Route path={RoutesPath.WaitingRoom} component={DummyWaitingRoom} />
        </TestingAuthContext>
      </TestingRouter>
    </TestingReactQueryClient>
  );

  const elements = {
    openToLessonButton: () => screen.findByTestId("open-to-lesson"),
  };

  return { elements };
}

function DummyWaitingRoom() {
  return <span>Please, wait...</span>;
}

function teachersSample() {
  return [
    createTeacher(),
    createTeacher(),
    createTeacher(),
    createTeacher(),
    createTeacher(),
  ];
}

function authContextWithUser() {
  return {
    user: {
      id: "any_id",
      name: "Jeferson",
      email: "jeferson@gmail.com",
      bio: "any",
      image: "any.png",
      type: UserTypes.Student,
    },
  };
}
