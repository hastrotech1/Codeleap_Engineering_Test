import { useState } from "react";
import { STORAGE_KEY_USER } from "../lib/utils";

/** Hook that manages the logged-in user — stores the username in localStorage and exposes login/logout actions */
export function useAuth() {
  const [username, setUsername] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY_USER) ?? "",
  );
  const isAuthenticated = username.length > 0;

  /** Saves the trimmed username to localStorage and marks the user as logged in */
  const login = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem(STORAGE_KEY_USER, trimmed);
    setUsername(trimmed);
  };

  /** Removes the username from localStorage and clears the logged-in state */
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY_USER);
    setUsername("");
  };

  return { username, isAuthenticated, login, logout };
}
