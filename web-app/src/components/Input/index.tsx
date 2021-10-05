import React, { InputHTMLAttributes, ReactNode } from "react";
import { Container } from "./styles";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  rightIcon?: ReactNode;
};

export default function Input({ label, rightIcon, ...inputProps }: InputProps) {
  return (
    <Container>
      {label && <label htmlFor={inputProps.name}>{label}</label>}
      <input {...inputProps} />
      {rightIcon && rightIcon}
    </Container>
  );
}
