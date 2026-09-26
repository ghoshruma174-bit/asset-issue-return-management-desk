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

export default function ReturnAsset() {
  const [issueList, setIssueList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedIssue, setSelectedIssue] = useState(null);

  const [remarks, setRemarks] = useState("");

  // =====================================================
  // GET ALL ISSUE RECORDS
  // =====================================================

  const fetchIssues = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch issue records");
      }

      const data = await response.json();

      setIssueList(data);
    } catch (error) {
      console.error(
        "Error fetching issue records:",
        error
      );

      alert("Unable to load issue records.");
    } finally {
      setLoading(false);
    }
  };

  // Load data when page opens
  useEffect(() => {
    fetchIssues();
  }, []);

  // =====================================================
  // OPEN RETURN FORM
  // =====================================================

  const handleReturnClick = (issue) => {
    setSelectedIssue(issue);
    setRemarks("");
  };

  // =====================================================
  // RETURN ASSET
  // =====================================================

  const handleReturnAsset = async () => {
    if (!selectedIssue) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${selectedIssue.id}/return`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },

          body: JSON.stringify({
            remarks: remarks,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          errorText || "Failed to return asset"
        );
      }

      alert("Asset returned successfully.");

      // Close form
      setSelectedIssue(null);

      setRemarks("");

      // Refresh data
      await fetchIssues();
    } catch (error) {
      console.error(
        "Error returning asset:",
        error
      );

      alert(
        "Unable to return asset. " +
          error.message
      );
    }
  };

  // =====================================================
  // CANCEL RETURN
  // =====================================================

  const handleCancel = () => {
    setSelectedIssue(null);
    setRemarks("");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div style={{ padding: "30px" }}>
      <h1>Return Asset</h1>

      <p>
        Manage issued assets and return them here.
      </p>

      {/* =============================================
          RETURN FORM
      ============================================= */}

      {selectedIssue && (
        <div
          style={{
            marginTop: "20px",
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            width: "400px",
          }}
        >
          <h2>Return Asset</h2>

          <p>
            <strong>Employee:</strong>{" "}
            {selectedIssue.employeeName}
          </p>

          <p>
            <strong>Asset:</strong>{" "}
            {selectedIssue.assetName}
          </p>

          <p>
            <strong>Issue Date:</strong>{" "}
            {selectedIssue.issueDate}
          </p>

          {/* Remarks */}

          <div
            style={{
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <label>
              <strong>Return Remarks</strong>
            </label>

            <br />

            <textarea
              placeholder="Enter return remarks"
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
              rows="4"
              style={{
                width: "100%",
                marginTop: "5px",
                padding: "8px",
                resize: "vertical",
              }}
            />
          </div>

          {/* Return Button */}

          <button onClick={handleReturnAsset}>
            Confirm Return
          </button>

          {/* Cancel Button */}

          <button
            onClick={handleCancel}
            style={{
              marginLeft: "10px",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* =============================================
          TABLE
      ============================================= */}

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
              Status
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
              Remarks
            </th>

            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                Loading issue records...
              </td>
            </tr>
          ) : issueList.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No issue records found.
              </td>
            </tr>
          ) : (
            issueList.map((issue) => (
              <tr key={issue.id}>
                {/* ID */}

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {issue.id}
                </td>

                {/* Employee */}

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {issue.employeeName}
                </td>

                {/* Asset */}

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {issue.assetName}
                </td>

                {/* Issue Date */}

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {issue.issueDate}
                </td>

                {/* Status */}

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  <strong>
                    {issue.status}
                  </strong>
                </td>

                {/* Return Date */}

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {issue.returnDate || "-"}
                </td>

                {/* Remarks */}

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {issue.returnRemarks || "-"}
                </td>

                {/* Action */}

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {issue.status === "Issued" ? (
                    <button
                      onClick={() =>
                        handleReturnClick(issue)
                      }
                    >
                      Return
                    </button>
                  ) : (
                    <span>Returned</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}