import { act, render, fireEvent } from "@testing-library/react";
import { APIEndpoints } from "services/api";
import { createAxiosErrorWith } from "utils/tests";
import Login from ".";

describe("LoginPage", () => {
  it("should render email and password inputs", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("email-input")).toBeInTheDocument();
    expect(getByTestId("password-input")).toBeInTheDocument();
  });

  it("should show message when account is not found", async () => {
    const notFoundError = createAxiosErrorWith({ statusCode: 404 });
    jest.spyOn(APIEndpoints, "logIn").mockRejectedValue(notFoundError);

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
    const notFoundError = createAxiosErrorWith({ statusCode: 401 });
    jest.spyOn(APIEndpoints, "logIn").mockRejectedValue(notFoundError);

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
});
