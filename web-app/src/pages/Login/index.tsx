import Button from "components/Button";
import { useAuthContext } from "contexts/AuthContext";
import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router";
import { RoutesPath } from "routes";
import { APIEndpoints, LogInData } from "services/api";
import Input from "../../components/Input";
import {
  Container,
  Illustration,
  LeftSide,
  LoginForm,
  LoginFormTitle,
  RightSide,
  RightSideContent,
  RightSideTitle,
} from "./styles";

export default function Login() {
  const auth = useAuthContext();
  const history = useHistory();

  const [wasNotFound, setWasNotFound] = useState(false);
  const [passwordIsWrong, setPasswordIsWrong] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const loginPayload = Object.fromEntries(formData.entries()) as LogInData;

    try {
      setWasNotFound(false);
      setPasswordIsWrong(false);
      setUnexpectedError(false);
      const { data } = await APIEndpoints.logIn(loginPayload);
      auth.logIn(data);
      history.push(RoutesPath.StudentMain);
    } catch (error: any) {
      if (error.response?.status === 404) setWasNotFound(true);
      else if (error.response?.status === 401) setPasswordIsWrong(true);
      else setUnexpectedError(true);
    }
  }

  return (
    <Container data-testid="login-page">
      <LeftSide>
        <Illustration src="/assets/login_illustration.png" />
      </LeftSide>
      <RightSide>
        <RightSideContent>
          <RightSideTitle>Welcome back to Cambly</RightSideTitle>
          <LoginForm data-testid="login-form" onSubmit={handleSubmit}>
            <LoginFormTitle>Log in with your email:</LoginFormTitle>
            <Input
              type="email"
              name="email"
              label="Email"
              data-testid="email-input"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              data-testid="password-input"
            />
            <Button>Log In</Button>
            {wasNotFound && (
              <span data-testid="not-found-message">
                Nenhuma conta associada ao email informado!
              </span>
            )}
            {passwordIsWrong && (
              <span data-testid="wrong-password-message">
                Credenciais incorretas!
              </span>
            )}
            {unexpectedError && (
              <span data-testid="unexpected-message">
                Ocorreu um erro inesperado. Tente novamente mais tarde!
              </span>
            )}
          </LoginForm>
        </RightSideContent>
      </RightSide>
    </Container>
  );
}
