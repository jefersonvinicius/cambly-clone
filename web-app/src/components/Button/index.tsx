import { Colors } from "config/theme";
import React, { ButtonHTMLAttributes } from "react";
import { Container, Label } from "./styles";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string;
};

export default function Button({
  color = Colors.Primary,
  ...props
}: ButtonProps) {
  return (
    <Container {...props} style={{ backgroundColor: color, ...props.style }}>
      {typeof props.children === "string" && <Label>{props.children}</Label>}
      {typeof props.children === "object" && props.children}
    </Container>
  );
}
