import Button from "components/Button";
import React, { FormEvent, FormHTMLAttributes } from "react";
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
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    new FormData(event.target as HTMLFormElement);
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
            <span>Nenhuma conta associada ao email informado!</span>
          </LoginForm>
        </RightSideContent>
      </RightSide>
    </Container>
  );
}
