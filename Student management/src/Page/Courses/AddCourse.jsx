import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

function AddCourse() {
  const navigate = useNavigate();
  const { addCourse, faculty } = useData();

  const [formData, setFormData] = useState({
    id: `CRS-${Math.floor(100 + Math.random() * 900)}`,
    name: "",
    department: "Computer Science",
    duration: "4 Months",
    credits: 4,
    description: "",
    assignedFaculty: faculty.length > 0 ? faculty[0].name : "Not Assigned",
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

    if (!formData.id || !formData.name || !formData.department || !formData.duration) {
      setError("Please fill out all required fields.");
      return;
    }

    addCourse(formData);
    navigate("/courses");
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to="/courses" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Courses</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Add New Course</h2>
            <p>Define curriculum, syllabus description, and assign instructor</p>
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
                <label>Course ID *</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="e.g. CSE-101"
                  required
                />
              </div>

              <div className="form-group">
                <label>Course Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Data Structures & Algorithms"
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
                <label>Duration *</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 4 Months / 1 Semester"
                  required
                />
              </div>

              <div className="form-group">
                <label>Credits</label>
                <input
                  type="number"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                  min={1}
                  max={6}
                />
              </div>

              <div className="form-group">
                <label>Assigned Faculty</label>
                <select
                  name="assignedFaculty"
                  value={formData.assignedFaculty}
                  onChange={handleChange}
                >
                  <option value="Not Assigned">Not Assigned</option>
                  {faculty.map((f) => (
                    <option key={f.id} value={f.name}>
                      {f.name} ({f.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group form-grid-full">
                <label>Description & Syllabus Overview</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter detailed description and topics covered in this course..."
                />
              </div>
            </div>

            <div className="form-actions">
              <Link to="/courses" className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="primary-btn" style={{ width: "auto" }}>
                <Save size={16} />
                <span>Save Course</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
