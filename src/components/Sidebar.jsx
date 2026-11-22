
import { useState } from "react";
import { navigation } from "../data/navigation";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Thermometer,
} from "lucide-react";
import "../styles/layout.css";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const [collapsed, setCollapsed] = useState(false);

  // Identify the currently selected page
  const currentPath = window.location.pathname;

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar
          ${collapsed ? "sidebar-collapsed" : ""}
          ${mobileOpen ? "sidebar-mobile-open" : ""}
        `}
      >
        {/* Brand */}
        <div className="brand-area">
          <div className="brand-icon">
            <Thermometer size={22} />
          </div>

          {!collapsed && (
            <div className="brand-text">
              <h2>SmartShell</h2>
              <span>THERMAL INTELLIGENCE</span>
            </div>
          )}

          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Workspace */}
        <div className="workspace-label">
          {!collapsed && "MONITORING WORKSPACE"}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navigation.map((group) => (
            <div className="nav-group" key={group.label}>
              {!collapsed && (
                <p className="nav-group-label">
                  {group.label}
                </p>
              )}

              {group.items.map(({ name, icon: Icon, path }) => {
                const isActive = currentPath === path;

                return (
                  <a
                    href={path}
                    key={name}
                    className={`nav-item ${
                      isActive ? "nav-active" : ""
                    }`}
                    title={collapsed ? name : ""}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon size={18} strokeWidth={1.8} />

                    {!collapsed && <span>{name}</span>}

                    {name === "Alert Center" && !collapsed && (
                      <span className="nav-count">0</span>
                    )}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Bottom */}
        <div className="sidebar-bottom">
          {!collapsed && (
            <div className="system-card">
              <div className="system-card-top">
                <span className="system-dot" />
                <span>System status</span>
              </div>

              <strong>Awaiting connection</strong>
              <p>Hardware integration pending</p>
            </div>
          )}

          {/* Collapse */}
          <button
            className="collapse-btn"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}

            {!collapsed && <span>Collapse sidebar</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
