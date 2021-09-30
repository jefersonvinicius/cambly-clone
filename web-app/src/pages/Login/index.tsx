import React from 'react';
import {
  Container,
  Illustration,
  LeftSide,
  LoginForm,
  LoginFormTitle,
  RightSide,
  RightSideContent,
  RightSideTitle,
} from './styles';

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
          </LoginForm>
        </RightSideContent>
      </RightSide>
    </Container>
  );
}
