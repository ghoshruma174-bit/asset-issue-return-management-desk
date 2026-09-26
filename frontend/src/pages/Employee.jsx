import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/employees";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export default function Employee() {
  const [employeeList, setEmployeeList] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  const [loading, setLoading] = useState(true);

  // ==========================================
  // GET ALL EMPLOYEES
  // ==========================================
  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();

      setEmployeeList(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Unable to load employees from backend.");
    } finally {
      setLoading(false);
    }
  };

  // Load employees when page opens
  useEffect(() => {
    fetchEmployees();
  }, []);

  // ==========================================
  // OPEN ADD EMPLOYEE FORM
  // ==========================================
  const handleAddEmployee = () => {
    setEditingId(null);

    setName("");
    setEmail("");
    setDepartment("");
    setDesignation("");

    setShowForm(true);
  };

  // ==========================================
  // SAVE / UPDATE EMPLOYEE
  // ==========================================
  const handleSaveEmployee = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !department.trim() ||
      !designation.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    const employeeData = {
      name: name,
      email: email,
      department: department,
      designation: designation,
    };

    try {
      // ======================================
      // UPDATE EMPLOYEE
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
            body: JSON.stringify(employeeData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update employee");
        }

        alert("Employee updated successfully.");
      }

      // ======================================
      // CREATE EMPLOYEE
      // ======================================
      else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
          throw new Error("Failed to create employee");
        }

        alert("Employee added successfully.");
      }

      // Refresh employee list
      await fetchEmployees();

      handleCancel();
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Something went wrong while saving the employee.");
    }
  };

  // ==========================================
  // EDIT EMPLOYEE
  // ==========================================
  const handleEditEmployee = (employee) => {
    setEditingId(employee.id);

    setName(employee.name);
    setEmail(employee.email);
    setDepartment(employee.department);
    setDesignation(employee.designation);

    setShowForm(true);
  };

  // ==========================================
  // DELETE EMPLOYEE
  // ==========================================
  const handleDeleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
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
        throw new Error("Failed to delete employee");
      }

      alert("Employee deleted successfully.");

      // Refresh employee list
      await fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Unable to delete employee.");
    }
  };

  // ==========================================
  // CANCEL FORM
  // ==========================================
  const handleCancel = () => {
    setName("");
    setEmail("");
    setDepartment("");
    setDesignation("");

    setEditingId(null);
    setShowForm(false);
  };

  // ==========================================
  // UI
  // ==========================================
  return (
    <div style={{ padding: "30px" }}>
      <h1>Employee Management</h1>

      <p>Manage all employees here.</p>

      {/* Add Employee Button */}
      <button onClick={handleAddEmployee}>
        + Add Employee
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
              ? "Edit Employee"
              : "Add New Employee"}
          </h2>

          {/* Name */}
          <div style={{ marginBottom: "15px" }}>
            <label>Full Name</label>
            <br />

            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>
            <br />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Department */}
          <div style={{ marginBottom: "15px" }}>
            <label>Department</label>
            <br />

            <input
              type="text"
              placeholder="Enter Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {/* Designation */}
          <div style={{ marginBottom: "15px" }}>
            <label>Designation</label>
            <br />

            <input
              type="text"
              placeholder="Enter Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>

          {/* Save / Update */}
          <button onClick={handleSaveEmployee}>
            {editingId !== null
              ? "Update Employee"
              : "Save Employee"}
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

      {/* Employee Table */}
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
              Name
            </th>

            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Email
            </th>

            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Department
            </th>

            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Designation
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
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                Loading employees...
              </td>
            </tr>
          ) : employeeList.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No employees found.
              </td>
            </tr>
          ) : (
            employeeList.map((employee) => (
              <tr key={employee.id}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {employee.id}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {employee.name}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {employee.email}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {employee.department}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {employee.designation}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      handleEditEmployee(employee)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteEmployee(employee.id)
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