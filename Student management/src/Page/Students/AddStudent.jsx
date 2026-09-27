import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

function AddStudent() {
  const navigate = useNavigate();
  const { addStudent, courses } = useData();

  const [formData, setFormData] = useState({
    id: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    address: "",
    course: courses.length > 0 ? courses[0].name : "Computer Science Engineering",
    admissionDate: new Date().toISOString().split("T")[0],
    academicYear: "1st Year",
    semester: "1st Semester",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.dob) {
      setError("Please fill out all required fields.");
      return;
    }

    addStudent(formData);
    navigate("/students");
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to="/students" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Students List</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Add New Student</h2>
            <p>Enter personal, contact, and academic credentials to register a student</p>
          </div>
        </div>

        <div className="card-body">
          {error && (
            <div className="error-alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Student ID */}
              <div className="form-group">
                <label>Student ID *</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Full Name */}
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Aarav Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. aarav@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="form-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Gender */}
              <div className="form-group">
                <label>Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Course */}
              <div className="form-group">
                <label>Course *</label>
                <select name="course" value={formData.course} onChange={handleChange}>
                  {courses.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.department})
                    </option>
                  ))}
                </select>
              </div>

              {/* Admission Date */}
              <div className="form-group">
                <label>Admission Date *</label>
                <input
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Address */}
              <div className="form-group form-grid-full">
                <label>Residential Address</label>
                <textarea
                  name="address"
                  rows={3}
                  placeholder="Enter complete residential address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <Link to="/students" className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="primary-btn" style={{ width: "auto" }}>
                <Save size={16} />
                <span>Save Student</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
