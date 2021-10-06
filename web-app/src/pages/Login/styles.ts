import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-top: 5px;
  }

  & > *:last-child {
    margin-top: 10px;
  }
`;

export const LoginFormTitle = styled.h3``;

export const LeftSide = styled.section``;

export const RightSide = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Illustration = styled.img`
  height: 100vh;
`;

export const RightSideContent = styled.main`
  width: 80%;
`;

export const RightSideTitle = styled.h3``;
