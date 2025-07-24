import React, { ReactNode } from "react";

interface ButtonProps {
  name: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right"; // optional prop, default to "left"
}

const Button: React.FC<ButtonProps> = ({
  name,
  icon,
  iconPosition = "left",
}) => {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.5rem 1rem",
        borderRadius: "1rem",
       
        backgroundColor: "white",
        color: "black",
        fontWeight: 600,
        cursor: "pointer",
        gap: "0.5rem",
      }}
    >
      {icon && iconPosition === "left" && (
        <span style={{ display: "flex" }}>{icon}</span>
      )}
      <span>{name}</span>
      {icon && iconPosition === "right" && (
        <span style={{ display: "flex" }}>{icon}</span>
      )}
    </button>
  );
};

export default Button;
