import React, { ReactNode } from "react";
import { AuthContext, AuthContextValue } from "../../../contexts/AuthContext";

type Props = Partial<AuthContextValue> & {
  children: ReactNode;
};

const defaultAuthContextValue: AuthContextValue = {
  user: null,
  isLoggedIn: false,
  logIn: jest.fn(),
};

export default function TestingAuthContext({ children, ...rest }: Props) {
  return (
    <AuthContext.Provider value={{ ...defaultAuthContextValue, ...rest }}>
      {children}
    </AuthContext.Provider>
  );
}
