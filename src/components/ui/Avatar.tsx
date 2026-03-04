import React from "react";
import { avatarColor } from "../../lib/utils";

interface AvatarProps {
  name: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 32 }) => {
  const initials = name ? name.slice(0, 2).toUpperCase() : "??";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        background: avatarColor(name),
        color: "white",
        fontWeight: 700,
        fontSize: size * 0.38,
        flexShrink: 0,
        border: "2px solid rgba(255,255,255,0.7)",
      }}
    >
      {initials}
    </span>
  );
};
