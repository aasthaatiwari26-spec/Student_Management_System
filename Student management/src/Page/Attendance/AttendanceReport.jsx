import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Printer, Download, CalendarCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useData } from "../../context/DataContext";

function AttendanceReport() {
  const { students, courses } = useData();

  const [activeTab, setActiveTab] = useState("student"); // 'student' or 'course'
  const [reportGenerated, setReportGenerated] = useState(false);

  // Student-wise stats
  const studentReports = students.map((s) => ({
    id: s.id,
    name: s.fullName,
    course: s.course,
    percentage: s.attendancePercentage || 85,
    status: (s.attendancePercentage || 85) >= 75 ? "Eligible" : "Shortage Warning",
  }));

  // Course-wise stats
  const courseReports = courses.map((c) => {
    const courseStudents = students.filter((s) => s.course === c.name);
    const avg = courseStudents.length
      ? Math.round(
          courseStudents.reduce((acc, curr) => acc + (curr.attendancePercentage || 80), 0) /
            courseStudents.length
        )
      : 84;
    return {
      id: c.id,
      name: c.name,
      department: c.department,
      studentCount: courseStudents.length,
      averageAttendance: avg,
    };
  });

  const handleGenerate = () => {
    setReportGenerated(true);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (activeTab === "student") {
      csvContent += "Student ID,Full Name,Course,Attendance Percentage,Eligibility\n";
      studentReports.forEach((r) => {
        csvContent += `"${r.id}","${r.name}","${r.course}",${r.percentage}%,"${r.status}"\n`;
      });
    } else {
      csvContent += "Course ID,Course Name,Department,Total Students,Average Attendance\n";
      courseReports.forEach((r) => {
        csvContent += `"${r.id}","${r.name}","${r.department}",${r.studentCount},${r.averageAttendance}%\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Attendance_Report_${activeTab}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Attendance Report</h2>
            <p>Generate, review, and print compliance reports for semester examinations</p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleExportCSV}
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              className="primary-btn"
              style={{ width: "auto" }}
              onClick={handleGenerate}
            >
              <Printer size={16} />
              <span>Generate / Print Report</span>
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Tab Selector */}
          <div className="profile-tabs no-print">
            <button
              type="button"
              className={`profile-tab-btn ${activeTab === "student" ? "active" : ""}`}
              onClick={() => setActiveTab("student")}
            >
              Student-wise Attendance
            </button>
            <button
              type="button"
              className={`profile-tab-btn ${activeTab === "course" ? "active" : ""}`}
              onClick={() => setActiveTab("course")}
            >
              Course-wise Attendance
            </button>
          </div>

          {/* Student-wise Report */}
          {activeTab === "student" && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>
                  Student Attendance Compliance Roster
                </h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Requirement: Min 75% for exam hall ticket
                </span>
              </div>

              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Student Name</th>
                      <th>Course Program</th>
                      <th>Attendance %</th>
                      <th>Status & Eligibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentReports.map((s) => (
                      <tr key={s.id}>
                        <td><strong>{s.id}</strong></td>
                        <td style={{ fontWeight: 600 }}>{s.name}</td>
                        <td>{s.course}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 100, height: 8, background: "#f1f5f9", borderRadius: 4 }}>
                              <div
                                style={{
                                  width: `${s.percentage}%`,
                                  height: "100%",
                                  background: s.percentage >= 75 ? "#10b981" : "#ef4444",
                                  borderRadius: 4,
                                }}
                              />
                            </div>
                            <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>{s.percentage}%</span>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`custom-badge ${
                              s.status === "Eligible" ? "badge-success" : "badge-danger"
                            }`}
                          >
                            {s.status === "Eligible" ? "Eligible for Exams" : "Attendance Shortage"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Course-wise Report */}
          {activeTab === "course" && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>
                  Departmental & Course Aggregate Attendance
                </h3>
              </div>

              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Course ID</th>
                      <th>Course Title</th>
                      <th>Department</th>
                      <th>Enrolled Students</th>
                      <th>Batch Average</th>
                      <th>Compliance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseReports.map((c) => (
                      <tr key={c.id}>
                        <td><strong>{c.id}</strong></td>
                        <td style={{ fontWeight: 600 }}>{c.name}</td>
                        <td>
                          <span className="custom-badge badge-info">{c.department}</span>
                        </td>
                        <td>{c.studentCount}</td>
                        <td>
                          <strong>{c.averageAttendance}%</strong>
                        </td>
                        <td>
                          <span
                            className={`custom-badge ${
                              c.averageAttendance >= 75 ? "badge-success" : "badge-warning"
                            }`}
                          >
                            {c.averageAttendance >= 75 ? "High Compliance" : "Average Compliance"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttendanceReport;
