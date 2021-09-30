import React, { InputHTMLAttributes, ReactNode } from 'react';
import { Container } from './styles';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  rightIcon?: ReactNode;
};

export default function Input({ label, rightIcon, ...inputProps }: Props) {
  return (
    <Container>
      {label && <label>{label}</label>}
      <input {...inputProps} />
      {rightIcon && rightIcon}
    </Container>
  );
}
