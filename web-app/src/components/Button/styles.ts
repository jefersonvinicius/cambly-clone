import styled from "styled-components";

export const Container = styled.button`
  font-size: 1rem;
  padding: 0.6rem 1rem;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  transition: 600ms;
  font-weight: bold;

  &:hover {
    transition: 600ms;
    filter: brightness(90%);
    cursor: pointer;
  }
`;

export const Label = styled.span``;
