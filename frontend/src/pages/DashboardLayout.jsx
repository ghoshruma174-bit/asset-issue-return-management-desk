import { useState } from "react";

import StockManagerDashboard from "./StockManagerDashboard";
import Asset from "./Asset";
import Employee from "./Employee";
import IssueAsset from "./IssueAsset";
import ReturnAsset from "./ReturnAsset";
import History from "./History";

import "./DashboardLayout.css";

export default function DashboardLayout({ onNavigate }) {
  const [activePage, setActivePage] = useState("dashboard");

  const handleNavigate = (page) => {
    setActivePage(page);
  };

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">

        <div className="sidebar-logo">
          <div className="logo-icon">A</div>

          <div>
            <h2>AssetDesk</h2>
            <span>Management System</span>
          </div>
        </div>

        <p className="menu-title">MAIN MENU</p>

        <button
          className={`sidebar-item ${
            activePage === "dashboard" ? "active" : ""
          }`}
          onClick={() => handleNavigate("dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          className={`sidebar-item ${
            activePage === "asset" ? "active" : ""
          }`}
          onClick={() => handleNavigate("asset")}
        >
          💻 Assets
        </button>

        <button
          className={`sidebar-item ${
            activePage === "employee" ? "active" : ""
          }`}
          onClick={() => handleNavigate("employee")}
        >
          👤 Employees
        </button>

        <button
          className={`sidebar-item ${
            activePage === "issueAsset" ? "active" : ""
          }`}
          onClick={() => handleNavigate("issueAsset")}
        >
          📤 Issue Asset
        </button>

        <button
          className={`sidebar-item ${
            activePage === "returnAsset" ? "active" : ""
          }`}
          onClick={() => handleNavigate("returnAsset")}
        >
          📥 Return Asset
        </button>

        <button
          className={`sidebar-item ${
            activePage === "history" ? "active" : ""
          }`}
          onClick={() => handleNavigate("history")}
        >
          🕘 History
        </button>

        <div className="sidebar-bottom">

          <button
            className="sidebar-item logout"
            onClick={() => onNavigate("login")}
          >
            🚪 Logout
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main className="dashboard-content">

        {activePage === "dashboard" && (
          <StockManagerDashboard
            onNavigate={handleNavigate}
          />
        )}

        {activePage === "asset" && <Asset />}

        {activePage === "employee" && <Employee />}

        {activePage === "issueAsset" && <IssueAsset />}

        {activePage === "returnAsset" && <ReturnAsset />}

        {activePage === "history" && <History />}

      </main>

    </div>
  );
}