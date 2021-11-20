import { render } from "@testing-library/react";
import TestingRouter from "components/tests-helpers/TestingRouter";
import { AuthContextValue } from "contexts/AuthContext";
import TestingAuthContext from "contexts/TestingAuthContext";
import Main from "pages/Main";
import { Route } from "react-router";
import { RoutesPath } from "routes";
import { APIEndpoints } from "services/api";
import { createAxiosResponseWith } from "utils/tests";

describe("MainPage", () => {
  const userMock = { name: "Jeferson" };

  beforeEach(() => {
    jest.spyOn(APIEndpoints, "logIn").mockResolvedValue(
      createAxiosResponseWith({
        data: { accessToken: "any", user: userMock },
      })
    );
  });

  describe("when user is logged", () => {
    it("should display user name", async () => {
      const { findByText } = createSut({
        authCtxValue: authContextWithUser(),
      });
      expect(await findByText(/Welcome Jeferson/)).toBeInTheDocument();
    });
  });
});

type Props = {
  authCtxValue: Partial<AuthContextValue>;
};

function createSut(props?: Props) {
  return render(
    <TestingRouter initialEntries={[RoutesPath.StudentMain]}>
      <TestingAuthContext {...(props?.authCtxValue ?? {})}>
        <Route path={RoutesPath.StudentMain} component={Main} />
      </TestingAuthContext>
    </TestingRouter>
  );
}

function authContextWithUser() {
  return {
    user: {
      name: "Jeferson",
      email: "jeferson@gmail.com",
    },
  };
}
