import { useEffect, useState } from "react";

const EMPLOYEE_API = "http://localhost:8080/api/employees";
const ASSET_API = "http://localhost:8080/api/assets";
const ISSUE_API = "http://localhost:8080/api/issues";

// ==========================================
// JWT AUTHORIZATION HEADER
// ==========================================

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export default function IssueAsset() {
  const [employees, setEmployees] = useState([]);
  const [assets, setAssets] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");

  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD EMPLOYEES AND ASSETS
  // ==========================================

  const fetchData = async () => {
    try {
      setLoading(true);

      const [employeeResponse, assetResponse] = await Promise.all([
        fetch(EMPLOYEE_API, {
          headers: getAuthHeaders(),
        }),

        fetch(ASSET_API, {
          headers: getAuthHeaders(),
        }),
      ]);

      if (!employeeResponse.ok) {
        throw new Error("Failed to load employees");
      }

      if (!assetResponse.ok) {
        throw new Error("Failed to load assets");
      }

      const employeeData = await employeeResponse.json();
      const assetData = await assetResponse.json();

      setEmployees(employeeData);
      setAssets(assetData);

    } catch (error) {
      console.error("Error loading data:", error);

      alert("Unable to load employees or assets.");

    } finally {
      setLoading(false);
    }
  };

  // Load data when page opens
  useEffect(() => {
    fetchData();
  }, []);

  // ==========================================
  // GET ONLY AVAILABLE ASSETS
  // ==========================================

  const availableAssets = assets.filter(
    (asset) =>
      asset.status &&
      asset.status.trim().toLowerCase() === "available"
  );

  // ==========================================
  // ISSUE ASSET
  // ==========================================

  const handleIssueAsset = async () => {
    if (!selectedEmployee || !selectedAsset) {
      alert("Please select an employee and an asset.");
      return;
    }

    try {
      const response = await fetch(
        `${ISSUE_API}?employeeId=${selectedEmployee}&assetId=${selectedAsset}`,
        {
          method: "POST",

          headers: {
            ...getAuthHeaders(),
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          errorText || "Failed to issue asset"
        );
      }

      const issuedRecord = await response.json();

      console.log(
        "Issue record created:",
        issuedRecord
      );

      alert("Asset issued successfully!");

      // Clear selections
      setSelectedEmployee("");
      setSelectedAsset("");

      // Reload employees and assets
      await fetchData();

    } catch (error) {
      console.error(
        "Error issuing asset:",
        error
      );

      alert(
        error.message ||
          "Something went wrong while issuing the asset."
      );
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Issue Asset</h1>

      <p>
        Issue an available asset to an employee.
      </p>

      {loading ? (
        <p>Loading employees and assets...</p>
      ) : (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            width: "400px",
          }}
        >
          {/* ======================================
              EMPLOYEE
          ======================================= */}

          <div style={{ marginBottom: "20px" }}>
            <label>
              <strong>Employee</strong>
            </label>

            <br />

            <select
              value={selectedEmployee}
              onChange={(e) =>
                setSelectedEmployee(e.target.value)
              }
              style={{
                marginTop: "5px",
                width: "100%",
                padding: "8px",
              }}
            >
              <option value="">
                Select Employee
              </option>

              {employees.map((employee) => (
                <option
                  key={employee.id}
                  value={employee.id}
                >
                  {employee.name} - {employee.email}
                </option>
              ))}
            </select>
          </div>

          {/* ======================================
              AVAILABLE ASSET
          ======================================= */}

          <div style={{ marginBottom: "20px" }}>
            <label>
              <strong>Available Asset</strong>
            </label>

            <br />

            <select
              value={selectedAsset}
              onChange={(e) =>
                setSelectedAsset(e.target.value)
              }
              style={{
                marginTop: "5px",
                width: "100%",
                padding: "8px",
              }}
            >
              <option value="">
                Select Asset
              </option>

              {availableAssets.map((asset) => (
                <option
                  key={asset.id}
                  value={asset.id}
                >
                  {asset.name} - {asset.category}
                </option>
              ))}
            </select>
          </div>

          {/* ======================================
              ISSUE BUTTON
          ======================================= */}

          <button
            onClick={handleIssueAsset}
            disabled={
              !selectedEmployee ||
              !selectedAsset
            }
          >
            Issue Asset
          </button>
        </div>
      )}
    </div>
  );
}