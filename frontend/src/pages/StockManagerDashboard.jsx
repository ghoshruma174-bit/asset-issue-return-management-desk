import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StockManagerDashboard.css";

const ASSET_API = "http://localhost:8080/api/assets";
const EMPLOYEE_API = "http://localhost:8080/api/employees";
const ISSUE_API = "http://localhost:8080/api/issues";

const StockManagerDashboard = () => {
  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [assetResponse, employeeResponse, issueResponse] =
        await Promise.all([
          fetch(ASSET_API, { headers }),
          fetch(EMPLOYEE_API, { headers }),
          fetch(ISSUE_API, { headers }),
        ]);

      if (
        assetResponse.status === 401 ||
        employeeResponse.status === 401 ||
        issueResponse.status === 401
      ) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const assetData = await assetResponse.json();
      const employeeData = await employeeResponse.json();
      const issueData = await issueResponse.json();

      setAssets(Array.isArray(assetData) ? assetData : []);
      setEmployees(Array.isArray(employeeData) ? employeeData : []);
      setIssues(Array.isArray(issueData) ? issueData : []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* =========================
     DASHBOARD CALCULATIONS
     ========================= */

  const totalAssets = assets.length;

  const availableAssets = assets.filter(
    (asset) =>
      asset.status &&
      asset.status.trim().toLowerCase() === "available"
  ).length;

  const issuedAssets = assets.filter(
    (asset) =>
      asset.status &&
      asset.status.trim().toLowerCase() === "issued"
  ).length;

  const totalEmployees = employees.length;

  const returnedAssets = issues.filter(
    (issue) =>
      issue.status &&
      issue.status.trim().toLowerCase() === "returned"
  ).length;

  const pendingReturns = issues.filter(
    (issue) =>
      issue.status &&
      issue.status.trim().toLowerCase() === "issued"
  ).length;

  const availablePercentage =
    totalAssets > 0 ? (availableAssets / totalAssets) * 100 : 0;

  const issuedPercentage =
    totalAssets > 0 ? (issuedAssets / totalAssets) * 100 : 0;

  /* =========================
     RECENT ACTIVITY
     ========================= */

  const recentIssues = issues.slice(-5).reverse();

  /* =========================
     LOADING
     ========================= */

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-container">
          <h2>Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}

      <div className="dashboard-header">

        <div>
          <p className="dashboard-label">ASSET MANAGEMENT</p>
          <h1>Dashboard</h1>
        </div>

        <div className="manager-profile">
          <div className="profile-circle">
            SM
          </div>

          <div>
            <strong>Stock Manager</strong>
            <span>Administrator</span>
          </div>
        </div>

      </div>

      {/* ================= WELCOME BANNER ================= */}

      <div className="welcome-banner">

        <div>
          <h2>Welcome back, Stock Manager 👋</h2>
          <p>
            Manage your assets, employees, issues and returns from one place.
          </p>
        </div>

        <div className="date-box">
          <span>Today</span>
          <strong>
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </strong>
        </div>

      </div>

      {/* ================= STAT CARDS ================= */}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon blue">
            📦
          </div>

          <div>
            <span>Total Assets</span>
            <h3>{totalAssets}</h3>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon green">
            ✓
          </div>

          <div>
            <span>Available</span>
            <h3>{availableAssets}</h3>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon orange">
            ↗
          </div>

          <div>
            <span>Issued</span>
            <h3>{issuedAssets}</h3>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon purple">
            👥
          </div>

          <div>
            <span>Employees</span>
            <h3>{totalEmployees}</h3>
          </div>

        </div>

      </div>

      {/* ================= LOWER DASHBOARD ================= */}

      <div className="dashboard-lower">

        {/* ================= ASSET AVAILABILITY ================= */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>Asset Availability</h2>
              <p>Current asset distribution</p>
            </div>

            <button
              className="view-button"
              onClick={() => navigate("/assets")}
            >
              View Assets →
            </button>

          </div>


          {/* Available */}

          <div className="availability-row">

            <div className="availability-info">

              <span>Available Assets</span>

              <strong>
                {availableAssets} / {totalAssets}
              </strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill available"
                style={{
                  width: `${availablePercentage}%`,
                }}
              ></div>

            </div>

          </div>


          {/* Issued */}

          <div className="availability-row">

            <div className="availability-info">

              <span>Issued Assets</span>

              <strong>
                {issuedAssets} / {totalAssets}
              </strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill issued"
                style={{
                  width: `${issuedPercentage}%`,
                }}
              ></div>

            </div>

          </div>


          {/* ================= QUICK ACTIONS ================= */}

          <div className="quick-actions">

            <h3>Quick Actions</h3>

            <div className="quick-action-grid">

              <button onClick={() => navigate("/assets")}>
                <span>📦</span>
                Manage Assets
              </button>

              <button onClick={() => navigate("/employees")}>
                <span>👥</span>
                Manage Employees
              </button>

              <button onClick={() => navigate("/issue-asset")}>
                <span>↗</span>
                Issue Asset
              </button>

              <button onClick={() => navigate("/return-asset")}>
                <span>↩</span>
                Return Asset
              </button>

            </div>

          </div>

        </div>


        {/* ================= RECENT ACTIVITY ================= */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>Recent Issue & Return Activity</h2>
              <p>Latest asset transactions</p>
            </div>

            {/* FIXED: History route */}

            <button
              className="view-button"
              onClick={() => navigate("/history")}
            >
              View History →
            </button>

          </div>


          {/* ================= ACTIVITY SUMMARY ================= */}

          <div className="activity-summary">

            <div>
              <span>Issued</span>
              <strong>{issuedAssets}</strong>
            </div>

            <div>
              <span>Returned</span>
              <strong>{returnedAssets}</strong>
            </div>

            <div>
              <span>Pending</span>
              <strong>{pendingReturns}</strong>
            </div>

          </div>


          {/* ================= ACTIVITY TABLE ================= */}

          <div className="activity-table-wrapper">

            {recentIssues.length === 0 ? (

              <div className="empty-activity">
                <p>No issue or return activity available.</p>
              </div>

            ) : (

              <table className="activity-table">

                <thead>

                  <tr>
                    <th>Employee</th>
                    <th>Asset</th>
                    <th>Issue Date</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {recentIssues.map((issue) => (

                    <tr key={issue.id}>

                      <td>
                        {issue.employee?.name ||
                          issue.employeeName ||
                          issue.employee?.fullName ||
                          "-"}
                      </td>

                      <td>
                        {issue.asset?.name ||
                          issue.assetName ||
                          "-"}
                      </td>

                      <td>
                        {issue.issueDate
                          ? new Date(
                              issue.issueDate
                            ).toLocaleDateString("en-IN")
                          : "-"}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${
                            issue.status
                              ? issue.status
                                  .trim()
                                  .toLowerCase()
                              : ""
                          }`}
                        >
                          {issue.status || "-"}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default StockManagerDashboard;