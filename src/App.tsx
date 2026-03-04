import React from "react";
import { useAuth } from "./hooks/useAuth";
import SignInPage from "./pages/SignInPage";
import MainPage from "./pages/MainPage";
import "./styles/globals.css";

const App: React.FC = () => {
  const { username, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <SignInPage onLogin={login} />;
  }

  return <MainPage username={username} onLogout={logout} />;
};

export default App;
