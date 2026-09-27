import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

function CreateExam() {
  const navigate = useNavigate();
  const { addExam, courses } = useData();

  const [formData, setFormData] = useState({
    name: "",
    course: courses.length > 0 ? courses[0].name : "Computer Science Engineering",
    subject: "",
    date: new Date().toISOString().split("T")[0],
    totalMarks: 100,
    passingMarks: 40,
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

    if (!formData.name || !formData.course || !formData.subject || !formData.date) {
      setError("Please fill out all required exam details.");
      return;
    }

    addExam(formData);
    navigate("/exams");
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to="/exams" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Exams</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Create Examination</h2>
            <p>Schedule a new academic assessment, mid-term, or practical exam</p>
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
              <div className="form-group form-grid-full">
                <label>Exam Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Mid-Term Assessment 2026 / Final Semester Exam"
                  required
                />
              </div>

              <div className="form-group">
                <label>Course Program *</label>
                <select name="course" value={formData.course} onChange={handleChange}>
                  {courses.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Subject / Module Name *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Data Structures & Algorithms"
                  required
                />
              </div>

              <div className="form-group">
                <label>Exam Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Total Maximum Marks *</label>
                <input
                  type="number"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleChange}
                  min={10}
                  max={500}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <Link to="/exams" className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="primary-btn" style={{ width: "auto" }}>
                <Save size={16} />
                <span>Create Exam</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateExam;
