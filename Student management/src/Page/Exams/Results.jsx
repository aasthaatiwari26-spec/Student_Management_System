import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Award, Download, Printer, Edit, PlusCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

function Results() {
  const { marks, exams } = useData();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterExam, setFilterExam] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredMarks = marks.filter((m) => {
    const matchesSearch =
      m.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExam = filterExam === "All" || m.examName === filterExam;
    const matchesStatus = filterStatus === "All" || m.resultStatus === filterStatus;

    return matchesSearch && matchesExam && matchesStatus;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Student ID,Student Name,Exam,Subject,Marks Obtained,Total Marks,Percentage,Grade,Status\n";
    filteredMarks.forEach((m) => {
      csvContent += `"${m.studentId}","${m.studentName}","${m.examName}","${m.subject}",${m.marksObtained},${m.totalMarks},${m.percentage}%,"${m.grade}","${m.resultStatus}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Examination_Results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Examination Results & Grades ({filteredMarks.length})</h2>
            <p>Official report cards, grades, percentages, and performance rankings</p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Link to="/exams/enter-marks" className="btn-secondary no-print">
              <PlusCircle size={16} />
              <span>Enter New Marks</span>
            </Link>
            <Link to="/exams/update-marks" className="btn-secondary no-print">
              <Edit size={16} />
              <span>Update Marks</span>
            </Link>
            <button type="button" className="btn-secondary no-print" onClick={handleExportCSV}>
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button type="button" className="primary-btn no-print" style={{ width: "auto" }} onClick={handlePrint}>
              <Printer size={16} />
              <span>Print Results</span>
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Toolbar */}
          <div className="toolbar no-print">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by student name, ID or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filters-group">
              <select
                value={filterExam}
                onChange={(e) => setFilterExam(e.target.value)}
              >
                <option value="All">All Exams</option>
                {exams.map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
              </select>
            </div>
          </div>

          {/* Results Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Details</th>
                  <th>Exam Title</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Total Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Result Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMarks.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>
                      No results found. Select "Enter Marks" to add exam results.
                    </td>
                  </tr>
                ) : (
                  filteredMarks.map((result) => (
                    <tr key={result.id}>
                      <td><strong>{result.studentId}</strong></td>
                      <td>
                        <Link to={`/students/${result.studentId}`} className="forgot-link" style={{ fontWeight: 600 }}>
                          {result.studentName}
                        </Link>
                      </td>
                      <td>{result.examName}</td>
                      <td>{result.subject}</td>
                      <td>
                        <strong style={{ fontSize: "0.95rem" }}>{result.marksObtained}</strong>
                      </td>
                      <td>{result.totalMarks}</td>
                      <td>{result.percentage}%</td>
                      <td>
                        <span className="custom-badge badge-info">{result.grade}</span>
                      </td>
                      <td>
                        <span
                          className={`custom-badge ${
                            result.resultStatus === "Pass" ? "badge-success" : "badge-danger"
                          }`}
                        >
                          {result.resultStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
