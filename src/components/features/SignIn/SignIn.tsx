import React, { useState } from "react";

interface SignInProps {
  onLogin: (username: string) => void;
}

export const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [input, setInput] = useState("");
  const canSubmit = input.trim().length > 0;

  const handleSubmit = () => {
    if (canSubmit) onLogin(input.trim());
  };

  return (
    <div
      className="card fade-up"
      style={{ width: "100%", maxWidth: 500, padding: "32px 28px" }}
    >
      <h2
        style={{
          fontWeight: 700,
          fontSize: 22,
          marginBottom: 28,
          color: "var(--text-primary)",
        }}
      >
        Welcome to CodeLeap network!
      </h2>

      <label className="field-label" htmlFor="signin-username">
        Please enter your username
      </label>
      <input
        id="signin-username"
        className="field-input"
        style={{ marginBottom: 24 }}
        placeholder="John doe"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        autoFocus
      />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          className="btn btn-primary"
          style={{ letterSpacing: 0.5, textTransform: "uppercase" }}
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          Enter
        </button>
      </div>
    </div>
  );
};
