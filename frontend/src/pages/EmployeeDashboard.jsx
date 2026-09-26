import { useEffect, useState } from "react";

function EmployeeDashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyIssues();
  }, []);

  const fetchMyIssues = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/issues/my",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch your issued assets");
      }

      const data = await response.json();

      setIssues(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load your asset information.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  const issuedCount = issues.filter(
    (issue) => issue.status?.toLowerCase() === "issued"
  ).length;

  const returnedCount = issues.filter(
    (issue) => issue.status?.toLowerCase() === "returned"
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#ffffff",
          padding: "20px 35px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: "#243b53" }}>
            Employee Dashboard
          </h1>

          <p style={{ margin: "6px 0 0", color: "#718096" }}>
            View your issued and returned assets
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "6px",
            background: "#e53e3e",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main style={{ padding: "30px 35px" }}>
        {/* Summary cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3>Total Records</h3>
            <h2>{issues.length}</h2>
          </div>

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3>Currently Issued</h3>
            <h2>{issuedCount}</h2>
          </div>

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3>Returned</h3>
            <h2>{returnedCount}</h2>
          </div>
        </div>

        {/* Asset table */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>My Asset History</h2>

          {loading && <p>Loading your assets...</p>}

          {error && (
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}

          {!loading && !error && issues.length === 0 && (
            <p>No asset records found.</p>
          )}

          {!loading && !error && issues.length > 0 && (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th style={tableHeader}>Asset</th>
                    <th style={tableHeader}>Issue Date</th>
                    <th style={tableHeader}>Status</th>
                    <th style={tableHeader}>Return Date</th>
                    <th style={tableHeader}>Remarks</th>
                  </tr>
                </thead>

                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue.id}>
                      <td style={tableCell}>
                        {issue.assetName}
                      </td>

                      <td style={tableCell}>
                        {issue.issueDate}
                      </td>

                      <td style={tableCell}>
                        <span
                          style={{
                            padding: "5px 10px",
                            borderRadius: "15px",
                            background:
                              issue.status?.toLowerCase() === "issued"
                                ? "#fff3cd"
                                : "#d4edda",
                            color:
                              issue.status?.toLowerCase() === "issued"
                                ? "#856404"
                                : "#155724",
                          }}
                        >
                          {issue.status}
                        </span>
                      </td>

                      <td style={tableCell}>
                        {issue.returnDate || "-"}
                      </td>

                      <td style={tableCell}>
                        {issue.returnRemarks || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const tableHeader = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "2px solid #e2e8f0",
  color: "#4a5568",
};

const tableCell = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
};

export default EmployeeDashboard;