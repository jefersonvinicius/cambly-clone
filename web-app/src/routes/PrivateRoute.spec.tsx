import { render } from "@testing-library/react";
import TestingRouter from "components/tests-helpers/TestingRouter";
import TestingAuthContext from "contexts/TestingAuthContext";
import { Route } from "react-router";
import { RoutesPath } from "routes";
import PrivateRoute from "./PrivateRoute";

describe("PrivateRoute", () => {
  it("should redirect to login page when user is not logged in", () => {
    const { getByText } = createSut({ isLoggedIn: false });
    expect(getByText("LoginPage")).toBeInTheDocument();
  });

  it("should show the page when user is logged in", () => {
    const { getByText } = createSut({ isLoggedIn: true });
    expect(getByText("PrivatePage")).toBeInTheDocument();
  });
});

function createSut(props: { isLoggedIn: boolean }) {
  return render(
    <TestingAuthContext isLoggedIn={props.isLoggedIn}>
      <TestingRouter initialEntries={["/any"]}>
        <PrivateRoute path="/any">
          <DummyPrivatePage />
        </PrivateRoute>
        <Route path={RoutesPath.StudentLogin}>
          <DummyLoginPage />
        </Route>
      </TestingRouter>
    </TestingAuthContext>
  );
}

function DummyPrivatePage() {
  return <div>PrivatePage</div>;
}

function DummyLoginPage() {
  return <div>LoginPage</div>;
}
