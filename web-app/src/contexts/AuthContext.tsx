import { User } from "models/User";
import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

export type AuthContextValue = {
  user: User | null;
  isLoggedIn: boolean;
  logIn: (data: any) => void;
};

export const AuthContext = React.createContext({} as AuthContextValue);

export default function AuthContextProvider(props: Props) {
  const [user, setUser] = useState<User | null>(AuthStorage.getUser());

  const logIn = useCallback((data: any) => {
    const newUser = new User(data.user);
    AuthStorage.setToken(data.accessToken);
    AuthStorage.setUser(newUser);
    setUser(newUser);
  }, []);

  const isLoggedIn = useMemo(() => {
    return !!user;
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, logIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export class AuthStorage {
  static setToken(token: string) {
    sessionStorage.setItem("@token", token);
  }

  static setUser(user: User) {
    sessionStorage.setItem("@user", JSON.stringify(user));
  }

  static getToken() {
    return sessionStorage.getItem("@token");
  }

  static getUser(): User | null {
    const userStored = sessionStorage.getItem("@user");
    return userStored ? new User(JSON.parse(userStored)) : null;
  }
}
