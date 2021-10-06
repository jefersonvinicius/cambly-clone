import { act, render, fireEvent } from "@testing-library/react";
import Login from ".";

describe("LoginPage", () => {
  it("should render email and password inputs", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("email-input")).toBeInTheDocument();
    expect(getByTestId("password-input")).toBeInTheDocument();
  });

  it("should show message when account is not found", () => {
    const { getByTestId, getByText } = render(<Login />);

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
      getByText("Nenhuma conta associada ao email informado!")
    ).toBeInTheDocument();
  });
});
