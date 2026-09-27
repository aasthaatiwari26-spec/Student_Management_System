import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

function AddFaculty() {
  const navigate = useNavigate();
  const { addFaculty } = useData();

  const [formData, setFormData] = useState({
    id: `FAC-${Math.floor(100 + Math.random() * 900)}`,
    name: "",
    email: "",
    phone: "",
    department: "Computer Science",
    qualification: "Ph.D. / M.Tech",
    experience: "5 Years",
    assignedCourses: [],
  });

  const [courseInput, setCourseInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleAddCourseTag = (e) => {
    e.preventDefault();
    if (courseInput.trim()) {
      setFormData({
        ...formData,
        assignedCourses: [...formData.assignedCourses, courseInput.trim()],
      });
      setCourseInput("");
    }
  };

  const removeCourseTag = (index) => {
    setFormData({
      ...formData,
      assignedCourses: formData.assignedCourses.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.email || !formData.phone || !formData.department) {
      setError("Please fill out all required fields.");
      return;
    }

    addFaculty(formData);
    navigate("/faculty");
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to="/faculty" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Faculty</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Add Faculty Member</h2>
            <p>Register new professor, instructor, or lecturer credentials</p>
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
              <div className="form-group">
                <label>Faculty ID *</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="e.g. FAC-105"
                  required
                />
              </div>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Rajesh Verma"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. rajesh.verma@college.edu"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98123 45678"
                  required
                />
              </div>

              <div className="form-group">
                <label>Department *</label>
                <select name="department" value={formData.department} onChange={handleChange}>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </select>
              </div>

              <div className="form-group">
                <label>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="e.g. Ph.D. in Computer Science"
                />
              </div>

              <div className="form-group">
                <label>Teaching Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 8 Years"
                />
              </div>

              <div className="form-group form-grid-full">
                <label>Assigned Courses</label>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <input
                    type="text"
                    value={courseInput}
                    onChange={(e) => setCourseInput(e.target.value)}
                    placeholder="e.g. Data Structures & Algorithms"
                  />
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleAddCourseTag}
                  >
                    Add
                  </button>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {formData.assignedCourses.map((c, idx) => (
                    <span
                      key={idx}
                      className="custom-badge badge-neutral"
                      style={{ padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => removeCourseTag(idx)}
                        style={{ color: "var(--danger)", fontWeight: "bold" }}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <Link to="/faculty" className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="primary-btn" style={{ width: "auto" }}>
                <Save size={16} />
                <span>Add Faculty</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFaculty;
