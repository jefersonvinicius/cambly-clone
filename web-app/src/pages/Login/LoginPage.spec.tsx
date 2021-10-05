import { render } from "@testing-library/react";
import Login from ".";

describe("LoginPage", () => {
  it("should render email and password inputs", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("email-input")).toBeInTheDocument();
    expect(getByTestId("password-input")).toBeInTheDocument();
  });
});
