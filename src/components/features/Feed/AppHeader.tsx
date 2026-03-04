import React from "react";
import { LogOut } from "lucide-react";
import { Avatar } from "../../ui/Avatar";

interface AppHeaderProps {
  username: string;
  onLogout: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ username, onLogout }) => (
  <header className="app-header">
    <span className="header-title">CodeLeap Network</span>

    <button
      className="header-user-btn"
      onClick={onLogout}
      title="Logout"
    >
      <Avatar name={username} size={28} />
      <span className="header-user-name">@{username}</span>
      <LogOut size={14} style={{ opacity: 0.8 }} />
    </button>
  </header>
);
