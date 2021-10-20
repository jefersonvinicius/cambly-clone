import { act, fireEvent, render } from "@testing-library/react";
import TestingRouter from "components/TestingRouter";
import Main from "pages/Main";
import { Route } from "react-router-dom";
import { RoutesPath } from "routes";
import { APIEndpoints } from "services/api";
import {
  createAxiosErrorWith,
  createAxiosResponseWith,
  sleep,
} from "utils/tests";
import Login from ".";

describe("LoginPage", () => {
  const userMock = { name: "Jeferson" };

  beforeEach(() => {
    jest.spyOn(APIEndpoints, "logIn").mockResolvedValue(
      createAxiosResponseWith({
        data: { accessToken: "any", user: userMock },
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

  it("should show message when unexpected error is returned", async () => {
    jest
      .spyOn(APIEndpoints, "logIn")
      .mockRejectedValue(createAxiosErrorWith({ statusCode: 500 }));

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

    const messageElement = await findByTestId("unexpected-message");

    expect(messageElement).toBeInTheDocument();
  });

  it("should save access token and user data on sessionStorage after log in successfully", async () => {
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

    expect(sessionStorage.getItem("@token")).toBe("any");
    expect(JSON.parse(sessionStorage.getItem("@user") ?? "")).toEqual(userMock);
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
    <TestingRouter initialEntries={[RoutesPath.StudentLogin]}>
      <Route exact path={RoutesPath.StudentLogin} component={Login} />
      <Route exact path={RoutesPath.StudentMain} component={Main} />
    </TestingRouter>
  );
}
