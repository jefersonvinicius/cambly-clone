import { User } from "models/User";
import React, { ReactNode, useCallback, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type AuthContextData = {
  user: User | null;
  logIn: (data: any) => void;
};

const AuthContext = React.createContext({} as AuthContextData);

export default function AuthContextProvider(props: Props) {
  const [user, setUser] = useState<User | null>(null);

  const logIn = useCallback((data: any) => {
    localStorage.setItem("@token", data.accessToken);
    setUser(new User(data.user));
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
