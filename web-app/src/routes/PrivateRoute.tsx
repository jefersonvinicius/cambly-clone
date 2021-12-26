import { useAuthContext } from "contexts/AuthContext";
import { RouteProps, Route, Redirect } from "react-router-dom";
import { RoutesPath } from "routes";

export default function PrivateRoute({ children, ...props }: RouteProps) {
  const auth = useAuthContext();

  return (
    <Route
      {...props}
      render={({ location }) =>
        auth.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: RoutesPath.Login,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
