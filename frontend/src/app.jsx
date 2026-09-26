import { Routes, Route, Navigate } from "react-router-dom";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import StockManagerDashboard from "./pages/StockManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Asset from "./pages/Asset";
import Employee from "./pages/Employee";
import IssueAsset from "./pages/IssueAsset";
import ReturnAsset from "./pages/ReturnAsset";
import History from "./pages/History";


function RoleRoute({ children, allowedRoles }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Compare roles without case problems
  const normalizedRole = role?.trim().toLowerCase();

  const normalizedAllowedRoles = allowedRoles.map(
    (allowedRole) => allowedRole.trim().toLowerCase()
  );

  if (!normalizedAllowedRoles.includes(normalizedRole)) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontFamily: "Arial",
        }}
      >
        <h1>Access Denied</h1>

        <p>
          You do not have permission to access this page.
        </p>

        <p>
          Your role: <strong>{role}</strong>
        </p>

        <button
          onClick={() => window.history.back()}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return children;
}


function App() {

  return (
    <Routes>

      {/* Registration */}
      <Route
        path="/"
        element={<Registration />}
      />

      <Route
        path="/register"
        element={<Registration />}
      />


      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />


      {/* Stock Manager Dashboard */}
      <Route
        path="/dashboard"
        element={
          <RoleRoute
            allowedRoles={[
              "Admin",
              "Stock Manager",
            ]}
          >
            <StockManagerDashboard />
          </RoleRoute>
        }
      />


      {/* Employee Dashboard */}
      <Route
        path="/employee-dashboard"
        element={
          <RoleRoute
            allowedRoles={[
              "Employee",
            ]}
          >
            <EmployeeDashboard />
          </RoleRoute>
        }
      />


      {/* Assets */}
      <Route
        path="/assets"
        element={
          <RoleRoute
            allowedRoles={[
              "Admin",
              "Stock Manager",
            ]}
          >
            <Asset />
          </RoleRoute>
        }
      />


      {/* Employees */}
      <Route
        path="/employees"
        element={
          <RoleRoute
            allowedRoles={[
              "Admin",
              "Stock Manager",
            ]}
          >
            <Employee />
          </RoleRoute>
        }
      />


      {/* Issue Asset */}
      <Route
        path="/issue-asset"
        element={
          <RoleRoute
            allowedRoles={[
              "Admin",
              "Stock Manager",
            ]}
          >
            <IssueAsset />
          </RoleRoute>
        }
      />


      {/* Return Asset */}
      <Route
        path="/return-asset"
        element={
          <RoleRoute
            allowedRoles={[
              "Admin",
              "Stock Manager",
            ]}
          >
            <ReturnAsset />
          </RoleRoute>
        }
      />


      {/* History */}
      <Route
        path="/history"
        element={
          <RoleRoute
            allowedRoles={[
              "Admin",
              "Stock Manager",
            ]}
          >
            <History />
          </RoleRoute>
        }
      />


      {/* Unknown URL */}
      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

    </Routes>
  );
}


export default App;