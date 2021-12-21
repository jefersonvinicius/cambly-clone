import { render } from "@testing-library/react";
import TestingRouter from "__tests__/mocks/components/TestingRouter";
import { AuthContextValue } from "contexts/AuthContext";
import Main from "pages/Main";
import { Route } from "react-router";
import { RoutesPath } from "routes";
import { APIEndpoints } from "services/api";
import TestingAuthContext from "__tests__/mocks/components/TestingAuthContext";

describe("MainPage", () => {
  const userMock = { name: "Jeferson" };

  beforeEach(() => {
    jest
      .spyOn(APIEndpoints, "logIn")
      .mockResolvedValue({ accessToken: "any", user: userMock });
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
      bio: "any",
      image: "any.png",
    },
  };
}
