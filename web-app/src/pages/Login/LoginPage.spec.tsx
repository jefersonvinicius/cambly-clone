import { act, render, fireEvent } from "@testing-library/react";
import { APIEndpoints } from "services/api";
import {
  createAxiosErrorWith,
  createAxiosResponseWith,
  sleep,
} from "utils/tests";
import Login from ".";
import Main from "pages/Main";
import { MemoryRouter, Route, Switch } from "react-router-dom";

describe("LoginPage", () => {
  beforeEach(() => {
    jest
      .spyOn(APIEndpoints, "logIn")
      .mockResolvedValue(
        createAxiosResponseWith({ data: { accessToken: "any" } })
      );
  });

  it("should render email and password inputs", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("email-input")).toBeInTheDocument();
    expect(getByTestId("password-input")).toBeInTheDocument();
  });

  it("should show message when account is not found", async () => {
    jest
      .spyOn(APIEndpoints, "logIn")
      .mockRejectedValue(createAxiosErrorWith({ statusCode: 404 }));

    const { getByTestId, findByTestId } = render(<Login />);

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

    const { getByTestId, findByTestId } = render(<Login />);

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
    const { getByTestId } = render(<Login />);

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
    const { getByTestId } = render(<LoginWithRouter />);

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

    expect(getByTestId("main-page")).toBeInTheDocument();
  });
});

function LoginWithRouter() {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/student">
          <Main />
        </Route>
      </Switch>
    </MemoryRouter>
  );
}
