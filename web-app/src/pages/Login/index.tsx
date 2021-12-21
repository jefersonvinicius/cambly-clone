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

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const loginPayload = Object.fromEntries(formData.entries()) as LogInData;

    try {
      setError(null);
      const data = await APIEndpoints.logIn(loginPayload);
      auth.logIn(data);
      history.push(RoutesPath.StudentMain);
    } catch (error: any) {
      if (error.response?.status === 404)
        setError("Nenhuma conta associada ao email informado!");
      else if (error.response?.status === 401)
        setError("Credenciais incorretas!");
      else setError("Ocorreu um erro inesperado. Tente novamente mais tarde!");
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
            {error && <span>{error}</span>}
          </LoginForm>
        </RightSideContent>
      </RightSide>
    </Container>
  );
}
