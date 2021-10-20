import { act, render, fireEvent } from "@testing-library/react";
import { APIEndpoints } from "services/api";
import {
  createAxiosErrorWith,
  createAxiosResponseWith,
  sleep,
} from "utils/tests";
import Login from ".";
import Main from "pages/Main";
import { Route, Switch, Router } from "react-router-dom";
import { RoutesPath } from "routes";
import { createMemoryHistory } from "history";
import AuthContextProvider from "contexts/AuthContext";

describe("LoginPage", () => {
  beforeEach(() => {
    jest.spyOn(APIEndpoints, "logIn").mockResolvedValue(
      createAxiosResponseWith({
        data: { accessToken: "any", user: { name: "Jeferson" } },
      })
    );
  });

  it("should render email and password inputs", () => {
    const { getByTestId } = createSut();
    expect(getByTestId("email-input")).toBeInTheDocument();
    expect(getByTestId("password-input")).toBeInTheDocument();
  });

  it("should show message when account is not found", async () => {
    jest
      .spyOn(APIEndpoints, "logIn")
      .mockRejectedValue(createAxiosErrorWith({ statusCode: 404 }));

    const { getByTestId, findByTestId } = createSut();

    const loginForm = getByTestId("login-form");
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "not_exists@gmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "any_123" } });
      fireEvent.submit(loginForm);
    });

    const messageElement = await findByTestId("not-found-message");

    expect(messageElement).toBeInTheDocument();
  });

  it("should show message when password is wrong", async () => {
    jest
      .spyOn(APIEndpoints, "logIn")
      .mockRejectedValue(createAxiosErrorWith({ statusCode: 401 }));

    const { getByTestId, findByTestId } = createSut();

    const loginForm = getByTestId("login-form");
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "valid@gmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "wrong" } });
      fireEvent.submit(loginForm);
    });

    const messageElement = await findByTestId("wrong-password-message");

    expect(messageElement).toBeInTheDocument();
  });

  it("should save access token when log in successfully", async () => {
    const { getByTestId } = createSut();

    const loginForm = getByTestId("login-form");
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "valid@gmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "any" } });
      fireEvent.submit(loginForm);
    });

    await act(() => sleep(300));

    expect(localStorage.getItem("@token")).toBe("any");
  });

  it("should navigate to student main page", async () => {
    const { getByTestId, getByText, findByTestId } = createSut();

    const loginForm = getByTestId("login-form");
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "valid@gmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "any" } });
      fireEvent.submit(loginForm);
    });

    expect(await findByTestId("main-page")).toBeInTheDocument();
    expect(getByText(/Welcome Jeferson/)).toBeInTheDocument();
  });
});

function createSut() {
  return render(<LoginWithRouter />);
}

function LoginWithRouter() {
  return (
    <AuthContextProvider>
      <Router
        history={createMemoryHistory({
          initialEntries: [RoutesPath.StudentLogin],
        })}
      >
        <Switch>
          <Route exact path={RoutesPath.StudentLogin} component={Login} />
          <Route exact path={RoutesPath.StudentMain} component={Main} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}
