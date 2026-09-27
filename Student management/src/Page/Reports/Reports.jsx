import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Download,
  Printer,
  Users,
  CalendarCheck,
  Award,
  BookOpen,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { useData } from "../../context/DataContext";

function Reports() {
  const { students, courses, faculty, marks, exams, attendance } = useData();

  const [activeReport, setActiveReport] = useState("student"); // 'student', 'attendance', 'result', 'course', 'faculty'
  const [selectedStudentId, setSelectedStudentId] = useState(
    students.length > 0 ? students[0].id : ""
  );

  const selectedStudent = students.find((s) => s.id === selectedStudentId);
  const studentMarks = marks.filter((m) => m.studentId === selectedStudentId);

  // Compute stats for attendance report
  const totalStudents = students.length;
  const highAttendanceCount = students.filter((s) => (s.attendancePercentage || 0) >= 85).length;
  const standardAttendanceCount = students.filter((s) => (s.attendancePercentage || 0) >= 75 && (s.attendancePercentage || 0) < 85).length;
  const lowAttendanceCount = students.filter((s) => (s.attendancePercentage || 0) < 75).length;
  const avgAttendance = totalStudents
    ? Math.round(students.reduce((acc, s) => acc + (s.attendancePercentage || 0), 0) / totalStudents)
    : 0;

  // Compute stats for result report
  const passedCount = marks.filter((m) => m.resultStatus === "Pass").length;
  const failedCount = marks.filter((m) => m.resultStatus === "Fail").length;
  const overallPassRate = marks.length ? Math.round((passedCount / marks.length) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    if (activeReport === "student") {
      if (!selectedStudent) return;
      csvContent += "Student ID,Full Name,Email,Phone,Course,Admission Date,Attendance %\n";
      csvContent += `"${selectedStudent.id}","${selectedStudent.fullName}","${selectedStudent.email}","${selectedStudent.phone}","${selectedStudent.course}","${selectedStudent.admissionDate}",${selectedStudent.attendancePercentage}%\n\n`;
      csvContent += "Exam,Subject,Marks Obtained,Total Marks,Percentage,Grade,Status\n";
      studentMarks.forEach((m) => {
        csvContent += `"${m.examName}","${m.subject}",${m.marksObtained},${m.totalMarks},${m.percentage}%,"${m.grade}","${m.resultStatus}"\n`;
      });
    } else if (activeReport === "attendance") {
      csvContent += "Student ID,Student Name,Course,Attendance Percentage,Eligibility\n";
      students.forEach((s) => {
        csvContent += `"${s.id}","${s.fullName}","${s.course}",${s.attendancePercentage || 85}%,${(s.attendancePercentage || 85) >= 75 ? "Eligible" : "Shortage"}\n`;
      });
    } else if (activeReport === "result") {
      csvContent += "Student ID,Student Name,Exam,Subject,Marks Obtained,Total Marks,Percentage,Grade,Status\n";
      marks.forEach((m) => {
        csvContent += `"${m.studentId}","${m.studentName}","${m.examName}","${m.subject}",${m.marksObtained},${m.totalMarks},${m.percentage}%,"${m.grade}","${m.resultStatus}"\n`;
      });
    } else if (activeReport === "course") {
      csvContent += "Course ID,Course Name,Department,Duration,Credits,Assigned Faculty,Enrolled Count\n";
      courses.forEach((c) => {
        csvContent += `"${c.id}","${c.name}","${c.department}","${c.duration}",${c.credits || 4},"${c.assignedFaculty}",${c.enrolledCount || 0}\n`;
      });
    } else if (activeReport === "faculty") {
      csvContent += "Faculty ID,Name,Department,Email,Phone,Qualification,Experience,Status\n";
      faculty.forEach((f) => {
        csvContent += `"${f.id}","${f.name}","${f.department}","${f.email}","${f.phone}","${f.qualification || "N/A"}","${f.experience || "N/A"}","${f.status || "Active"}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeReport}_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Institution Reports & Analytics</h2>
            <p>Generate, export, and print comprehensive metrics across all campus departments</p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              className="btn-secondary no-print"
              onClick={handleExportCSV}
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              className="primary-btn no-print"
              style={{ width: "auto" }}
              onClick={handlePrint}
            >
              <Printer size={16} />
              <span>Generate / Download</span>
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Navigation tabs for the 5 reports */}
          <div className="profile-tabs no-print">
            <button
              type="button"
              className={`profile-tab-btn ${activeReport === "student" ? "active" : ""}`}
              onClick={() => setActiveReport("student")}
            >
              👨‍🎓 Student Report
            </button>
            <button
              type="button"
              className={`profile-tab-btn ${activeReport === "attendance" ? "active" : ""}`}
              onClick={() => setActiveReport("attendance")}
            >
              🕐 Attendance Report
            </button>
            <button
              type="button"
              className={`profile-tab-btn ${activeReport === "result" ? "active" : ""}`}
              onClick={() => setActiveReport("result")}
            >
              📝 Result Report
            </button>
            <button
              type="button"
              className={`profile-tab-btn ${activeReport === "course" ? "active" : ""}`}
              onClick={() => setActiveReport("course")}
            >
              📚 Course Report
            </button>
            <button
              type="button"
              className={`profile-tab-btn ${activeReport === "faculty" ? "active" : ""}`}
              onClick={() => setActiveReport("faculty")}
            >
              👨‍🏫 Faculty Report
            </button>
          </div>

          {/* 1. STUDENT REPORT */}
          {activeReport === "student" && (
            <div>
              <div className="toolbar no-print" style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <label style={{ fontWeight: 600, fontSize: "0.9rem" }}>Select Student:</label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    style={{ minWidth: 260 }}
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.fullName} ({s.id}) - {s.course}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedStudent && (
                <div>
                  {/* Student Academic Sheet Header */}
                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "20px 24px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      marginBottom: 20,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                          Student Academic Progress Report
                        </h3>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                          Confidential Transcript & Attendance Dossier
                        </p>
                      </div>
                      <span className="custom-badge badge-success">Official Record</span>
                    </div>

                    <div className="info-grid">
                      <div className="info-item">
                        <label>Student ID</label>
                        <p>{selectedStudent.id}</p>
                      </div>
                      <div className="info-item">
                        <label>Full Name</label>
                        <p>{selectedStudent.fullName}</p>
                      </div>
                      <div className="info-item">
                        <label>Enrolled Program</label>
                        <p>{selectedStudent.course}</p>
                      </div>
                      <div className="info-item">
                        <label>Admission Date</label>
                        <p>{selectedStudent.admissionDate}</p>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <p>{selectedStudent.email}</p>
                      </div>
                      <div className="info-item">
                        <label>Attendance Rate</label>
                        <p>{selectedStudent.attendancePercentage || 85}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Results Table */}
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 12 }}>
                    Academic Exam Scores & Subject Grades
                  </h4>
                  <div className="table-responsive">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Exam Name</th>
                          <th>Subject</th>
                          <th>Marks Scored</th>
                          <th>Total Marks</th>
                          <th>Percentage</th>
                          <th>Letter Grade</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentMarks.length === 0 ? (
                          <tr>
                            <td colSpan={7} style={{ textAlign: "center", padding: 24, color: "var(--text-muted)" }}>
                              No exam scores logged for this student yet.
                            </td>
                          </tr>
                        ) : (
                          studentMarks.map((m) => (
                            <tr key={m.id}>
                              <td><strong>{m.examName}</strong></td>
                              <td>{m.subject}</td>
                              <td>{m.marksObtained}</td>
                              <td>{m.totalMarks}</td>
                              <td>{m.percentage}%</td>
                              <td>
                                <span className="custom-badge badge-info">{m.grade}</span>
                              </td>
                              <td>
                                <span
                                  className={`custom-badge ${
                                    m.resultStatus === "Pass" ? "badge-success" : "badge-danger"
                                  }`}
                                >
                                  {m.resultStatus}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. ATTENDANCE REPORT */}
          {activeReport === "attendance" && (
            <div>
              {/* Summary KPIs */}
              <div className="dashboard-grid" style={{ marginBottom: 20 }}>
                <div className="stat-card">
                  <div className="stat-icon-wrapper blue">
                    <CalendarCheck size={26} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Campus Average</span>
                    <h3>{avgAttendance}%</h3>
                    <span className="stat-trend up">Overall Performance</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper green">
                    <TrendingUp size={26} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">High Attendance (&ge;85%)</span>
                    <h3>{highAttendanceCount}</h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--success)" }}>Optimal Cohort</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper amber">
                    <Users size={26} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Standard (75-84%)</span>
                    <h3>{standardAttendanceCount}</h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--warning)" }}>Eligible</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper rose">
                    <Users size={26} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Critical (&lt;75%)</span>
                    <h3>{lowAttendanceCount}</h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--danger)" }}>Shortage Notice</span>
                  </div>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Student Name</th>
                      <th>Program</th>
                      <th>Attendance Compliance</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.id}>
                        <td><strong>{s.id}</strong></td>
                        <td style={{ fontWeight: 600 }}>{s.fullName}</td>
                        <td>{s.course}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 120, height: 8, background: "#f1f5f9", borderRadius: 4 }}>
                              <div
                                style={{
                                  width: `${s.attendancePercentage || 85}%`,
                                  height: "100%",
                                  background:
                                    (s.attendancePercentage || 85) >= 85
                                      ? "#10b981"
                                      : (s.attendancePercentage || 85) >= 75
                                      ? "#f59e0b"
                                      : "#ef4444",
                                  borderRadius: 4,
                                }}
                              />
                            </div>
                            <span style={{ fontWeight: 700 }}>{s.attendancePercentage || 85}%</span>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`custom-badge ${
                              (s.attendancePercentage || 85) >= 75
                                ? "badge-success"
                                : "badge-danger"
                            }`}
                          >
                            {(s.attendancePercentage || 85) >= 75 ? "Compliant" : "Attendance Shortage"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. RESULT REPORT */}
          {activeReport === "result" && (
            <div>
              <div className="dashboard-grid" style={{ marginBottom: 20 }}>
                <div className="stat-card">
                  <div className="stat-icon-wrapper green">
                    <Award size={26} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Pass Percentage</span>
                    <h3>{overallPassRate}%</h3>
                    <span className="stat-trend up">
                      {passedCount} Passed / {marks.length} Total
                    </span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper blue">
                    <BookOpen size={26} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Total Exam Submissions</span>
                    <h3>{marks.length}</h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Across all exams</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper amber">
                    <TrendingUp size={26} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Scheduled Exams</span>
                    <h3>{exams.length}</h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Current semester</span>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Student Name</th>
                      <th>Exam Name</th>
                      <th>Subject</th>
                      <th>Marks Scored</th>
                      <th>Total Marks</th>
                      <th>Percentage</th>
                      <th>Grade</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((m) => (
                      <tr key={m.id}>
                        <td><strong>{m.studentId}</strong></td>
                        <td style={{ fontWeight: 600 }}>{m.studentName}</td>
                        <td>{m.examName}</td>
                        <td>{m.subject}</td>
                        <td><strong>{m.marksObtained}</strong></td>
                        <td>{m.totalMarks}</td>
                        <td>{m.percentage}%</td>
                        <td>
                          <span className="custom-badge badge-info">{m.grade}</span>
                        </td>
                        <td>
                          <span
                            className={`custom-badge ${
                              m.resultStatus === "Pass" ? "badge-success" : "badge-danger"
                            }`}
                          >
                            {m.resultStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. COURSE REPORT */}
          {activeReport === "course" && (
            <div>
              <div className="dashboard-grid" style={{ marginBottom: 20 }}>
                <div className="stat-card">
                  <div className="stat-icon-wrapper purple">
                    <BookOpen size={26} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Total Active Courses</span>
                    <h3>{courses.length}</h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Active offerings</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper blue">
                    <Users size={26} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Total Enrolled</span>
                    <h3>
                      {courses.reduce((acc, c) => acc + (c.enrolledCount || 25), 0)}
                    </h3>
                    <span className="stat-trend up">Across all departments</span>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Course ID</th>
                      <th>Course Title</th>
                      <th>Department</th>
                      <th>Duration</th>
                      <th>Credits</th>
                      <th>Assigned Faculty</th>
                      <th>Enrolled Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c) => {
                      const actualCount = students.filter((s) => s.course === c.name).length;
                      return (
                        <tr key={c.id}>
                          <td><strong>{c.id}</strong></td>
                          <td style={{ fontWeight: 600 }}>{c.name}</td>
                          <td>
                            <span className="custom-badge badge-info">{c.department}</span>
                          </td>
                          <td>{c.duration}</td>
                          <td>{c.credits || 4}</td>
                          <td>{c.assignedFaculty}</td>
                          <td>
                            <span className="custom-badge badge-neutral">
                              {actualCount > 0 ? actualCount : c.enrolledCount || 20} Students
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. FACULTY REPORT */}
          {activeReport === "faculty" && (
            <div>
              <div className="dashboard-grid" style={{ marginBottom: 20 }}>
                <div className="stat-card">
                  <div className="stat-icon-wrapper purple">
                    <GraduationCap size={26} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Faculty Headcount</span>
                    <h3>{faculty.length}</h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Full-time academic staff</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper green">
                    <BookOpen size={26} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Assigned Teaching Loads</span>
                    <h3>
                      {faculty.reduce((acc, f) => acc + (f.assignedCourses?.length || 1), 0)}
                    </h3>
                    <span className="stat-trend up">Curriculum sections covered</span>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Faculty ID</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Qualification</th>
                      <th>Experience</th>
                      <th>Teaching Load (Courses)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faculty.map((f) => (
                      <tr key={f.id}>
                        <td><strong>{f.id}</strong></td>
                        <td style={{ fontWeight: 600 }}>{f.name}</td>
                        <td>
                          <span className="custom-badge badge-info">{f.department}</span>
                        </td>
                        <td>{f.qualification || "Ph.D."}</td>
                        <td>{f.experience || "8+ Years"}</td>
                        <td>
                          <strong>{f.assignedCourses?.length || 1} Courses</strong>
                        </td>
                        <td>
                          <span className="custom-badge badge-success">{f.status || "Active"}</span>
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

export default Reports;
