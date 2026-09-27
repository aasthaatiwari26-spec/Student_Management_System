import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  PlusCircle,
  Clock,
  MapPin,
  User,
  BookOpen,
  Edit,
  Trash2,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import ConfirmModal from "../../components/ConfirmModal";

function TimetableView() {
  const { timetable, deleteTimetableEntry, courses } = useData();
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const filteredTimetable = timetable.filter((item) => {
    const matchesDay = selectedDay === "All" || item.day === selectedDay;
    const matchesCourse = selectedCourse === "All" || item.course === selectedCourse;
    return matchesDay && matchesCourse;
  });

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Weekly Timetable & Lecture Schedule</h2>
            <p>Class periods, assigned classrooms, faculty instructors, and timing slots</p>
          </div>
          <Link to="/timetable/add" className="primary-btn" style={{ width: "auto" }}>
            <PlusCircle size={16} />
            <span>Add Schedule Slot</span>
          </Link>
        </div>

        <div className="card-body">
          {/* Filters */}
          <div className="toolbar">
            <div className="filters-group">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="All">All Days</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="All">All Courses</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table List View */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Time Slot</th>
                  <th>Course</th>
                  <th>Subject</th>
                  <th>Faculty Instructor</th>
                  <th>Classroom / Lab</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTimetable.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>
                      No timetable slots scheduled matching the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredTimetable.map((slot) => (
                    <tr key={slot.id}>
                      <td>
                        <span className="custom-badge badge-info">{slot.day}</span>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                          <Clock size={14} style={{ color: "var(--primary)" }} />
                          <span>{slot.time}</span>
                        </div>
                      </td>
                      <td>{slot.course}</td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{slot.subject}</div>
                      </td>
                      <td>{slot.faculty}</td>
                      <td>
                        <span className="custom-badge badge-neutral">
                          <MapPin size={12} style={{ marginRight: 2 }} />
                          {slot.classroom || "Room 101"}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="table-actions" style={{ justifyContent: "flex-end" }}>
                          <button
                            type="button"
                            className="action-btn edit"
                            title="Edit Slot"
                            onClick={() => navigate(`/timetable/edit/${slot.id}`)}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            type="button"
                            className="action-btn delete"
                            title="Delete Slot"
                            onClick={() => setDeleteTarget(slot)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Timetable Slot"
        message={`Remove the schedule slot for ${deleteTarget?.subject} on ${deleteTarget?.day} (${deleteTarget?.time})?`}
        confirmText="Yes, Remove Slot"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            deleteTimetableEntry(deleteTarget.id);
          }
        }}
      />
    </div>
  );
}

export default TimetableView;
