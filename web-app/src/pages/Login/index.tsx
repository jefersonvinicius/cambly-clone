import Button from "components/Button";
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
  const history = useHistory();

  const [wasNotFound, setWasNotFound] = useState(false);
  const [passwordIsWrong, setPasswordIsWrong] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const loginPayload = Object.fromEntries(formData.entries()) as LogInData;

    console.log(loginPayload);

    try {
      setWasNotFound(false);
      setPasswordIsWrong(false);
      const { data } = await APIEndpoints.logIn(loginPayload);
      console.log(data);
      localStorage.setItem("@token", data.accessToken);
      history.push(RoutesPath.StudentMain);
    } catch (error: any) {
      if (error.response?.status === 404) setWasNotFound(true);
      if (error.response?.status === 401) setPasswordIsWrong(true);
    }
  }

  return (
    <Container>
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
          </LoginForm>
        </RightSideContent>
      </RightSide>
    </Container>
  );
}
