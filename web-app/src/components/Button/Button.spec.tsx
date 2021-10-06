import { render } from "@testing-library/react";
import { Colors } from "config/theme";
import Button from ".";

describe("Button", () => {
  it("should render the children inner span when is text", () => {
    const { getByText } = render(<Button data-testid="btn">Any</Button>);

    const element = getByText("Any");

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("SPAN");
  });

  it('should render with default color when isn"t provided', () => {
    const { getByTestId } = render(<Button data-testid="btn">Any</Button>);
    expect(getByTestId("btn")).toHaveStyle({
      "background-color": Colors.Primary,
    });
  });

  it("should render custom color when is provided", () => {
    const { getByTestId } = render(
      <Button data-testid="btn" color="#991">
        Any
      </Button>
    );
    expect(getByTestId("btn")).toHaveStyle({
      "background-color": "#991",
    });
  });

  it("should render children out of span when it different of text", () => {
    const { getByText } = render(
      <Button data-testid="btn">
        <div>
          <strong>Any</strong>
        </div>
      </Button>
    );

    const element = getByText("Any");

    expect(element).toBeInTheDocument();
    expect(element.tagName).not.toBe("SPAN");
  });
});
