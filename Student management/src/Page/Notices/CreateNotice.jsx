import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Send } from "lucide-react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

function CreateNotice() {
  const navigate = useNavigate();
  const { addNotice } = useData();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Academic",
    priority: "Normal",
    date: new Date().toISOString().split("T")[0],
    author: user?.fullName || "Dean of Academics",
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

    if (!formData.title || !formData.description || !formData.date) {
      setError("Please fill in the title, description, and date.");
      return;
    }

    addNotice(formData);
    navigate("/notices");
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to="/notices" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Notices</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Publish New Notice</h2>
            <p>Draft official bulletin circular for students and faculty members</p>
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
                <label>Notice Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Schedule for Mid-Term Examination 2026"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="Academic">Academic</option>
                  <option value="Examination">Examination</option>
                  <option value="Event">Event</option>
                  <option value="Holiday">Holiday</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="form-group">
                <label>Publish Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Priority Level</label>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                  <option value="Normal">Normal</option>
                  <option value="High">High Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div className="form-group">
                <label>Issuing Authority / Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="e.g. Office of the Principal"
                />
              </div>

              <div className="form-group form-grid-full">
                <label>Notice Content & Full Description *</label>
                <textarea
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Type the full announcement content, guidelines, or instructions here..."
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <Link to="/notices" className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="primary-btn" style={{ width: "auto" }}>
                <Send size={16} />
                <span>Publish Notice</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNotice;
