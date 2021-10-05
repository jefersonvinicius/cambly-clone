import { render } from "@testing-library/react";
import { Colors } from "config/theme";
import Button from ".";

describe("Button", () => {
  it("should render with label and default color as background color", () => {
    const { getByTestId, getByText } = render(
      <Button data-testid="btn" label="Any" />
    );
    expect(getByText("Any")).toBeInTheDocument();
    expect(getByTestId("btn")).toHaveStyle({
      "background-color": Colors.Primary,
    });
  });
});
