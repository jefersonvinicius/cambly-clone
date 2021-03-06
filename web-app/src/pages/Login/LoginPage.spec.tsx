import { act, fireEvent, render } from "@testing-library/react";
import TestingRouter from "__tests__/mocks/components/TestingRouter";
import AuthContextProvider, {
  AuthStorage,
  useAuthContext,
} from "contexts/AuthContext";
import { Route } from "react-router-dom";
import { RoutesPath } from "routes";
import { createAxiosErrorWith, sleep } from "__tests__/utils";
import Login from ".";
import {
  AccountNotFoundError,
  AuthService,
  InvalidCredentialsError,
} from "services/auth";

describe("LoginPage", () => {
  const userMock = { name: "Jeferson" };

  beforeEach(() => {
    jest
      .spyOn(AuthService, "logIn")
      .mockResolvedValue({ accessToken: "any", user: userMock });
  });

  it("should render email and password inputs", () => {
    const { getByTestId } = createSut();
    expect(getByTestId("email-input")).toBeInTheDocument();
    expect(getByTestId("password-input")).toBeInTheDocument();
  });

  it("should show message when account is not found", async () => {
    jest
      .spyOn(AuthService, "logIn")
      .mockRejectedValue(new AccountNotFoundError());

    const { getByTestId, findByText } = createSut();

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

    expect(
      await findByText(/Nenhuma conta associada ao email informado!/i)
    ).toBeInTheDocument();
  });

  it("should show message when password is wrong", async () => {
    jest
      .spyOn(AuthService, "logIn")
      .mockRejectedValue(new InvalidCredentialsError());

    const { getByTestId, findByText } = createSut();

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

    expect(await findByText(/Credenciais incorretas!/)).toBeInTheDocument();
  });

  it("should show message when unexpected error is returned", async () => {
    jest
      .spyOn(AuthService, "logIn")
      .mockRejectedValue(createAxiosErrorWith({ statusCode: 500 }));

    const { getByTestId, findByText } = createSut();

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

    expect(await findByText(/Ocorreu um erro inesperado/)).toBeInTheDocument();
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

  it("should navigate to main page", async () => {
    const { getByTestId, findByText } = createSut();

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

    expect(AuthStorage.getToken()).toBe("any");
    expect(await findByText(/Welcome Jeferson/)).toBeInTheDocument();
  });
});

function createSut() {
  return render(<LoginWithRouter />);
}

function LoginWithRouter() {
  return (
    <AuthContextProvider>
      <TestingRouter initialEntries={[RoutesPath.Login]}>
        <Route exact path={RoutesPath.Login} component={Login} />
        <Route exact path={RoutesPath.Main} component={DummyMainPage} />
      </TestingRouter>
    </AuthContextProvider>
  );
}

function DummyMainPage() {
  const { user } = useAuthContext();
  return <div>Welcome {user?.name}</div>;
}
