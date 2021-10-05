import { Colors } from "config/theme";
import React, { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  color?: string;
};

export default function Button({
  label,
  color = Colors.Primary,
  ...props
}: Props) {
  return (
    <button {...props} style={{ backgroundColor: color, ...props.style }}>
      <span>{label}</span>
    </button>
  );
}
