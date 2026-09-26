import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/issues";

// ==========================================
// JWT AUTHORIZATION HEADER
// ==========================================

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export default function History() {
  const [issueRecords, setIssueRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH HISTORY FROM BACKEND
  // ==========================================

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }

      const data = await response.json();

      setIssueRecords(data);
    } catch (error) {
      console.error(
        "Error fetching history:",
        error
      );

      alert("Unable to load issue and return history.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD HISTORY WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {
    fetchHistory();
  }, []);

  // ==========================================
  // UI
  // ==========================================

  return (
    <div style={{ padding: "30px" }}>
      <h1>Issue & Return History</h1>

      <p>
        View all asset issue and return records here.
      </p>

      {loading ? (
        <p style={{ marginTop: "30px" }}>
          Loading history...
        </p>
      ) : issueRecords.length === 0 ? (
        <p style={{ marginTop: "30px" }}>
          No issue or return records available.
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            marginTop: "30px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                ID
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                Employee
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                Asset
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                Issue Date
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                Return Date
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                Status
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                Remarks
              </th>
            </tr>
          </thead>

          <tbody>
            {issueRecords.map((record) => (
              <tr key={record.id}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {record.id}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {record.employeeName}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {record.assetName}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {record.issueDate}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {record.returnDate || "-"}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {record.status}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {record.returnRemarks ||
                    record.remarks ||
                    "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}