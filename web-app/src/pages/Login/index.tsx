import React from "react";
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
  return (
    <Container>
      <LeftSide>
        <Illustration src="/assets/login_illustration.png" />
      </LeftSide>
      <RightSide>
        <RightSideContent>
          <RightSideTitle>Welcome back to Cambly</RightSideTitle>
          <LoginForm>
            <LoginFormTitle>Log in with your email:</LoginFormTitle>
            <Input type="email" label="Email" data-testid="email-input" />
            <Input
              type="password"
              label="Password"
              data-testid="password-input"
            />
          </LoginForm>
        </RightSideContent>
      </RightSide>
    </Container>
  );
}
