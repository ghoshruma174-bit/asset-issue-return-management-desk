import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Registration.css";

export default function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    email: "",
    password: "",
    gender: "",
    role: "",
    dateOfBirth: "",
    age: "",
    designation: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handles normal input fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles registration
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setMessage("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
    }
  };

  // Calculate age when DOB changes
  const handleDateOfBirthChange = (event) => {
    const dob = event.target.value;

    if (!dob) {
      setFormData({
        ...formData,
        dateOfBirth: "",
        age: "",
      });
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    let calculatedAge =
      today.getFullYear() - birthDate.getFullYear();

    const monthDifference =
      today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    setFormData({
      ...formData,
      dateOfBirth: dob,
      age: calculatedAge,
    });
  };

  return (
    <div className="background">

      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <div className="circle circle4"></div>

      <div className="page-heading">
        <h1>Asset Issue & Return Management</h1>

        <p className="page-subtitle">
          Create Your Account
        </p>
      </div>

      <div className="register-card">

        <form onSubmit={handleSubmit}>

          {/* USER ID */}
          <div className="form-group">
            <label>User ID</label>

            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="Enter User ID"
              required
              minLength={3}
            />
          </div>

          {/* FULL NAME */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
              minLength={3}
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              minLength={6}
            />
          </div>

          {/* GENDER */}
          <div className="form-group">
            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* ROLE */}
          <div className="form-group">
            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Role
              </option>

              <option value="Admin">
                Admin
              </option>

              <option value="Employee">
                Employee
              </option>
            </select>
          </div>

          {/* DATE OF BIRTH */}
          <div className="form-group">
            <label>Date Of Birth</label>

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              max={new Date().toISOString().split("T")[0]}
              onChange={handleDateOfBirthChange}
              required
            />
          </div>

          {/* AGE */}
          <div className="form-group">
            <label>Age</label>

            <input
              type="text"
              name="age"
              value={formData.age}
              placeholder="Auto Calculate"
              readOnly
            />
          </div>

          {/* DESIGNATION */}
          <div className="form-group">
            <label>Designation</label>

            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter Designation"
              required
            />
          </div>

          {/* MESSAGE */}
          {message && (
            <p className="success-message">
              {message}
            </p>
          )}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {/* REGISTER */}
          <button
            className="register-btn"
            type="submit"
          >
            Register
          </button>

          {/* LOGIN */}
          <p className="login-text">
            Already have an account?

            <span
              className="link-button"
              onClick={() => navigate("/login")}
            >
              {" "}Login
            </span>
          </p>

        </form>

      </div>

    </div>
  );
}