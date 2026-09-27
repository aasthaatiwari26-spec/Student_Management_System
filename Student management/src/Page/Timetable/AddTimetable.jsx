import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

function AddTimetable() {
  const navigate = useNavigate();
  const { addTimetableEntry, courses, faculty } = useData();

  const [formData, setFormData] = useState({
    day: "Monday",
    time: "09:00 AM - 10:00 AM",
    course: courses.length > 0 ? courses[0].name : "Computer Science Engineering",
    subject: "",
    faculty: faculty.length > 0 ? faculty[0].name : "Dr. Rajesh Verma",
    classroom: "Lecture Hall 1",
  });

  const [error, setError] = useState("");

  const timeSlots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.day || !formData.time || !formData.course || !formData.subject || !formData.faculty) {
      setError("Please fill out all required fields.");
      return;
    }

    addTimetableEntry(formData);
    navigate("/timetable");
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to="/timetable" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Timetable</span>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Add Timetable Schedule Slot</h2>
            <p>Assign a lecture hour, classroom, subject, and instructor</p>
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
                <label>Day of the Week *</label>
                <select name="day" value={formData.day} onChange={handleChange}>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Time Slot *</label>
                <select name="time" value={formData.time} onChange={handleChange}>
                  {timeSlots.map((ts) => (
                    <option key={ts} value={ts}>
                      {ts}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Course *</label>
                <select name="course" value={formData.course} onChange={handleChange}>
                  {courses.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Operating Systems / Algorithms"
                  required
                />
              </div>

              <div className="form-group">
                <label>Faculty Instructor *</label>
                <select name="faculty" value={formData.faculty} onChange={handleChange}>
                  {faculty.map((f) => (
                    <option key={f.id} value={f.name}>
                      {f.name} ({f.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Classroom / Lab *</label>
                <input
                  type="text"
                  name="classroom"
                  value={formData.classroom}
                  onChange={handleChange}
                  placeholder="e.g. Lab 3 / Room 402"
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <Link to="/timetable" className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="primary-btn" style={{ width: "auto" }}>
                <Save size={16} />
                <span>Save Timetable Slot</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTimetable;
