import React from "react";

interface FieldInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  autoFocus?: boolean;
  rows?: number;
}

export const FieldInput: React.FC<FieldInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  autoFocus = false,
  rows = 4,
}) => (
  <div className="field">
    <label className="field-label">{label}</label>
    {multiline ? (
      <textarea
        className="field-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows={rows}
      />
    ) : (
      <input
        className="field-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    )}
  </div>
);
