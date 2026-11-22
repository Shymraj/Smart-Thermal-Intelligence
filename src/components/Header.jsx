
import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  Command
} from "lucide-react";

export default function Header({ setMobileOpen }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="menu-trigger"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <div className="breadcrumb">
          <span>Workspace</span>
          <span className="breadcrumb-separator">/</span>
          <strong>Overview</strong>
        </div>
      </div>

      <div className="header-actions">
        <button
          className={`search-box ${searchFocused ? "search-focused" : ""}`}
          onClick={() => setSearchFocused(!searchFocused)}
        >
          <Search size={17} />
          <span>Search system...</span>
          <kbd><Command size={11} /> K</kbd>
        </button>

        <button
          className="notification-btn"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="notification-indicator" />
        </button>

        <div className="header-divider" />

        <button className="profile-button">
          <div className="avatar">CC</div>
          <div className="profile-info">
            <strong>Control Room</strong>
            <span>Operator</span>
          </div>
          <ChevronDown size={15} className="profile-chevron" />
        </button>
      </div>
    </header>
  );
}
