import React from "react";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 18,
  color = "var(--brand)",
}) => (
  <Loader2
    size={size}
    className="spin"
    style={{ color, flexShrink: 0 }}
  />
);
