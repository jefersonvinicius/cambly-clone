import { Colors } from "config/theme";
import React, { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string;
};

export default function Button({ color = Colors.Primary, ...props }: Props) {
  return (
    <button {...props} style={{ backgroundColor: color, ...props.style }}>
      {typeof props.children === "string" && <span>{props.children}</span>}
      {typeof props.children === "object" && props.children}
    </button>
  );
}
