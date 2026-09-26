import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/assets";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export default function Asset() {
  const [assetList, setAssetList] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Available");

  const [loading, setLoading] = useState(true);

  // ==========================================
  // GET ALL ASSETS
  // ==========================================
  const fetchAssets = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch assets");
      }

      const data = await response.json();
      setAssetList(data);
    } catch (error) {
      console.error("Error fetching assets:", error);
      alert("Unable to load assets from backend.");
    } finally {
      setLoading(false);
    }
  };

  // Load assets when page opens
  useEffect(() => {
    fetchAssets();
  }, []);

  // ==========================================
  // OPEN ADD FORM
  // ==========================================
  const handleAddAsset = () => {
    setEditingId(null);
    setAssetName("");
    setCategory("");
    setStatus("Available");
    setShowForm(true);
  };

  // ==========================================
  // SAVE / UPDATE ASSET
  // ==========================================
  const handleSaveAsset = async () => {
    if (!assetName.trim() || !category.trim()) {
      alert("Please enter Asset Name and Category.");
      return;
    }

    const assetData = {
      name: assetName,
      category: category,
      status: status,
    };

    try {
      // ======================================
      // UPDATE
      // ======================================
      if (editingId !== null) {
        const response = await fetch(
          `${API_URL}/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...getAuthHeaders(),
            },
            body: JSON.stringify(assetData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update asset");
        }

        alert("Asset updated successfully.");
      }

      // ======================================
      // CREATE
      // ======================================
      else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(assetData),
        });

        if (!response.ok) {
          throw new Error("Failed to create asset");
        }

        alert("Asset added successfully.");
      }

      // Get latest data from PostgreSQL
      await fetchAssets();

      handleCancel();
    } catch (error) {
      console.error("Error saving asset:", error);
      alert("Something went wrong while saving the asset.");
    }
  };

  // ==========================================
  // EDIT ASSET
  // ==========================================
  const handleEditAsset = (asset) => {
    setEditingId(asset.id);
    setAssetName(asset.name);
    setCategory(asset.category);
    setStatus(asset.status);
    setShowForm(true);
  };

  // ==========================================
  // DELETE ASSET
  // ==========================================
  const handleDeleteAsset = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to delete asset");
      }

      alert("Asset deleted successfully.");

      // Refresh from PostgreSQL
      await fetchAssets();
    } catch (error) {
      console.error("Error deleting asset:", error);
      alert("Unable to delete asset.");
    }
  };

  // ==========================================
  // CANCEL FORM
  // ==========================================
  const handleCancel = () => {
    setAssetName("");
    setCategory("");
    setStatus("Available");
    setEditingId(null);
    setShowForm(false);
  };

  // ==========================================
  // UI
  // ==========================================
  return (
    <div style={{ padding: "30px" }}>
      <h1>Asset Management</h1>

      <p>Manage all organisation assets here.</p>

      {/* Add Asset Button */}
      <button onClick={handleAddAsset}>
        + Add Asset
      </button>

      {/* Add / Edit Form */}
      {showForm && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            width: "350px",
          }}
        >
          <h2>
            {editingId !== null
              ? "Edit Asset"
              : "Add New Asset"}
          </h2>

          {/* Asset Name */}
          <div style={{ marginBottom: "15px" }}>
            <label>Asset Name</label>
            <br />

            <input
              type="text"
              placeholder="Enter Asset Name"
              value={assetName}
              onChange={(e) =>
                setAssetName(e.target.value)
              }
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: "15px" }}>
            <label>Category</label>
            <br />

            <input
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            />
          </div>

          {/* Status */}
          <div style={{ marginBottom: "15px" }}>
            <label>Status</label>
            <br />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option value="Available">
                Available
              </option>

              <option value="Issued">
                Issued
              </option>

              <option value="Returned">
                Returned
              </option>
            </select>
          </div>

          {/* Save / Update */}
          <button onClick={handleSaveAsset}>
            {editingId !== null
              ? "Update Asset"
              : "Save Asset"}
          </button>

          {/* Cancel */}
          <button
            onClick={handleCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Asset Table */}
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
              Asset Name
            </th>

            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Category
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
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                Loading assets...
              </td>
            </tr>
          ) : assetList.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No assets found.
              </td>
            </tr>
          ) : (
            assetList.map((asset) => (
              <tr key={asset.id}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {asset.id}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {asset.name}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {asset.category}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  <strong>{asset.status}</strong>
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      handleEditAsset(asset)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteAsset(asset.id)
                    }
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}