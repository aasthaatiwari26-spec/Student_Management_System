import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

const INITIAL_STUDENTS = [
  {
    id: "STU-1001",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    dob: "2004-05-14",
    gender: "Male",
    address: "42 MG Road, Indiranagar, Bangalore, Karnataka",
    course: "Computer Science Engineering",
    admissionDate: "2022-08-01",
    status: "Active",
    academicYear: "3rd Year",
    semester: "6th Semester",
    attendancePercentage: 92,
  },
  {
    id: "STU-1002",
    fullName: "Ananya Patel",
    email: "ananya.patel@example.com",
    phone: "+91 98234 56789",
    dob: "2004-09-22",
    gender: "Female",
    address: "15 CG Road, Navrangpura, Ahmedabad, Gujarat",
    course: "Information Technology",
    admissionDate: "2022-08-05",
    status: "Active",
    academicYear: "3rd Year",
    semester: "6th Semester",
    attendancePercentage: 88,
  },
  {
    id: "STU-1003",
    fullName: "Rohan Verma",
    email: "rohan.verma@example.com",
    phone: "+91 97112 34567",
    dob: "2003-11-03",
    gender: "Male",
    address: "78 Park Street, Kolkata, West Bengal",
    course: "Electronics & Communication",
    admissionDate: "2021-08-10",
    status: "Active",
    academicYear: "4th Year",
    semester: "8th Semester",
    attendancePercentage: 74,
  },
  {
    id: "STU-1004",
    fullName: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+91 99456 78123",
    dob: "2005-01-18",
    gender: "Female",
    address: "22 Marine Drive, Kochi, Kerala",
    course: "Mechanical Engineering",
    admissionDate: "2023-08-12",
    status: "Active",
    academicYear: "2nd Year",
    semester: "4th Semester",
    attendancePercentage: 95,
  },
  {
    id: "STU-1005",
    fullName: "Kavya Iyer",
    email: "kavya.iyer@example.com",
    phone: "+91 91234 56780",
    dob: "2004-03-30",
    gender: "Female",
    address: "10 T-Nagar, Chennai, Tamil Nadu",
    course: "Computer Science Engineering",
    admissionDate: "2022-08-01",
    status: "Active",
    academicYear: "3rd Year",
    semester: "6th Semester",
    attendancePercentage: 81,
  },
  {
    id: "STU-1006",
    fullName: "Devendra Singh",
    email: "devendra.singh@example.com",
    phone: "+91 94567 89012",
    dob: "2003-07-12",
    gender: "Male",
    address: "88 Civil Lines, Jaipur, Rajasthan",
    course: "Civil Engineering",
    admissionDate: "2021-08-15",
    status: "Active",
    academicYear: "4th Year",
    semester: "8th Semester",
    attendancePercentage: 68,
  }
];

const INITIAL_COURSES = [
  {
    id: "CSE-101",
    name: "Data Structures & Algorithms",
    department: "Computer Science",
    duration: "4 Months",
    credits: 4,
    description: "Core computer science fundamentals, algorithm efficiency, graph theory, trees, and dynamic programming.",
    assignedFaculty: "Dr. Rajesh Verma",
    enrolledCount: 65,
  },
  {
    id: "IT-202",
    name: "Full Stack Web Development",
    department: "Information Technology",
    duration: "4 Months",
    credits: 4,
    description: "Hands-on engineering using React, Node.js, REST APIs, databases, authentication, and cloud deployment.",
    assignedFaculty: "Prof. Meera Sen",
    enrolledCount: 54,
  },
  {
    id: "ECE-303",
    name: "Signals and Systems",
    department: "Electronics & Communication",
    duration: "4 Months",
    credits: 3,
    description: "Continuous and discrete-time signals, Fourier analysis, Laplace transforms, and digital filtering.",
    assignedFaculty: "Dr. Arvind Kulkarni",
    enrolledCount: 42,
  },
  {
    id: "ME-404",
    name: "Thermodynamics & Fluid Mechanics",
    department: "Mechanical Engineering",
    duration: "4 Months",
    credits: 4,
    description: "First and second laws of thermodynamics, enthalpy, fluid dynamics, and heat transfer mechanisms.",
    assignedFaculty: "Prof. Sunita Rao",
    enrolledCount: 38,
  },
  {
    id: "CE-505",
    name: "Structural Analysis & Design",
    department: "Civil Engineering",
    duration: "4 Months",
    credits: 3,
    description: "Analysis of determinate and indeterminate structures, load calculations, and concrete design.",
    assignedFaculty: "Dr. Vikram Malhotra",
    enrolledCount: 30,
  }
];

const INITIAL_FACULTY = [
  {
    id: "FAC-001",
    name: "Dr. Rajesh Verma",
    email: "rajesh.verma@college.edu",
    phone: "+91 98123 45678",
    department: "Computer Science",
    qualification: "Ph.D. in Computer Science (IIT Bombay)",
    experience: "12 Years",
    assignedCourses: ["Data Structures & Algorithms", "Operating Systems"],
    status: "Active"
  },
  {
    id: "FAC-002",
    name: "Prof. Meera Sen",
    email: "meera.sen@college.edu",
    phone: "+91 98765 12345",
    department: "Information Technology",
    qualification: "M.Tech in Software Engineering",
    experience: "8 Years",
    assignedCourses: ["Full Stack Web Development", "Cloud Computing"],
    status: "Active"
  },
  {
    id: "FAC-003",
    name: "Dr. Arvind Kulkarni",
    email: "arvind.kulkarni@college.edu",
    phone: "+91 99012 34567",
    department: "Electronics & Communication",
    qualification: "Ph.D. in VLSI & Signal Processing",
    experience: "15 Years",
    assignedCourses: ["Signals and Systems", "Microprocessors"],
    status: "Active"
  },
  {
    id: "FAC-004",
    name: "Prof. Sunita Rao",
    email: "sunita.rao@college.edu",
    phone: "+91 94455 66778",
    department: "Mechanical Engineering",
    qualification: "M.Tech in Thermal Engineering",
    experience: "10 Years",
    assignedCourses: ["Thermodynamics & Fluid Mechanics"],
    status: "Active"
  },
  {
    id: "FAC-005",
    name: "Dr. Vikram Malhotra",
    email: "vikram.malhotra@college.edu",
    phone: "+91 93344 55667",
    department: "Civil Engineering",
    qualification: "Ph.D. in Structural Engineering",
    experience: "14 Years",
    assignedCourses: ["Structural Analysis & Design"],
    status: "Active"
  }
];

const INITIAL_EXAMS = [
  {
    id: "EXM-001",
    name: "Mid-Term Examination 2026",
    course: "Computer Science Engineering",
    subject: "Data Structures & Algorithms",
    date: "2026-10-15",
    totalMarks: 100,
    passingMarks: 40,
  },
  {
    id: "EXM-002",
    name: "Semester Practical Assessment",
    course: "Information Technology",
    subject: "Full Stack Web Development",
    date: "2026-10-18",
    totalMarks: 100,
    passingMarks: 50,
  },
  {
    id: "EXM-003",
    name: "Unit Test II",
    course: "Electronics & Communication",
    subject: "Signals and Systems",
    date: "2026-10-22",
    totalMarks: 50,
    passingMarks: 20,
  }
];

const INITIAL_MARKS = [
  {
    id: "RES-001",
    examId: "EXM-001",
    examName: "Mid-Term Examination 2026",
    studentId: "STU-1001",
    studentName: "Aarav Sharma",
    course: "Computer Science Engineering",
    subject: "Data Structures & Algorithms",
    marksObtained: 88,
    totalMarks: 100,
    percentage: 88,
    grade: "A+",
    resultStatus: "Pass",
  },
  {
    id: "RES-002",
    examId: "EXM-001",
    examName: "Mid-Term Examination 2026",
    studentId: "STU-1005",
    studentName: "Kavya Iyer",
    course: "Computer Science Engineering",
    subject: "Data Structures & Algorithms",
    marksObtained: 76,
    totalMarks: 100,
    percentage: 76,
    grade: "B+",
    resultStatus: "Pass",
  },
  {
    id: "RES-003",
    examId: "EXM-002",
    examName: "Semester Practical Assessment",
    studentId: "STU-1002",
    studentName: "Ananya Patel",
    course: "Information Technology",
    subject: "Full Stack Web Development",
    marksObtained: 92,
    totalMarks: 100,
    percentage: 92,
    grade: "A+",
    resultStatus: "Pass",
  },
  {
    id: "RES-004",
    examId: "EXM-003",
    examName: "Unit Test II",
    studentId: "STU-1003",
    studentName: "Rohan Verma",
    course: "Electronics & Communication",
    subject: "Signals and Systems",
    marksObtained: 34,
    totalMarks: 50,
    percentage: 68,
    grade: "B",
    resultStatus: "Pass",
  }
];

const INITIAL_ATTENDANCE = [
  {
    id: "ATT-001",
    date: "2026-09-10",
    course: "Computer Science Engineering",
    subject: "Data Structures & Algorithms",
    records: [
      { studentId: "STU-1001", studentName: "Aarav Sharma", status: "Present" },
      { studentId: "STU-1005", studentName: "Kavya Iyer", status: "Present" }
    ]
  },
  {
    id: "ATT-002",
    date: "2026-09-09",
    course: "Information Technology",
    subject: "Full Stack Web Development",
    records: [
      { studentId: "STU-1002", studentName: "Ananya Patel", status: "Present" }
    ]
  },
  {
    id: "ATT-003",
    date: "2026-09-08",
    course: "Electronics & Communication",
    subject: "Signals and Systems",
    records: [
      { studentId: "STU-1003", studentName: "Rohan Verma", status: "Absent" }
    ]
  }
];

const INITIAL_TIMETABLE = [
  {
    id: "TT-001",
    day: "Monday",
    time: "09:00 AM - 10:00 AM",
    course: "Computer Science Engineering",
    subject: "Data Structures & Algorithms",
    faculty: "Dr. Rajesh Verma",
    classroom: "Lab 3"
  },
  {
    id: "TT-002",
    day: "Monday",
    time: "11:00 AM - 12:00 PM",
    course: "Information Technology",
    subject: "Full Stack Web Development",
    faculty: "Prof. Meera Sen",
    classroom: "Seminar Hall A"
  },
  {
    id: "TT-003",
    day: "Tuesday",
    time: "10:00 AM - 11:00 AM",
    course: "Electronics & Communication",
    subject: "Signals and Systems",
    faculty: "Dr. Arvind Kulkarni",
    classroom: "Room 204"
  },
  {
    id: "TT-004",
    day: "Wednesday",
    time: "09:00 AM - 10:00 AM",
    course: "Mechanical Engineering",
    subject: "Thermodynamics & Fluid Mechanics",
    faculty: "Prof. Sunita Rao",
    classroom: "Mechanical Workshop"
  },
  {
    id: "TT-005",
    day: "Thursday",
    time: "02:00 PM - 03:00 PM",
    course: "Civil Engineering",
    subject: "Structural Analysis & Design",
    faculty: "Dr. Vikram Malhotra",
    classroom: "Civil Lab 1"
  }
];

const INITIAL_NOTICES = [
  {
    id: "NOT-001",
    title: "Mid-Term Examination Schedule Announced",
    description: "The official timetable for Mid-Term Examination 2026 has been published. All students are advised to check subject slots and seating arrangements.",
    category: "Examination",
    priority: "High",
    date: "2026-09-08",
    author: "Controller of Examinations"
  },
  {
    id: "NOT-002",
    title: "Annual Tech Symposium - InnoTech 2026",
    description: "Registrations are now open for project presentations, coding hackathon, and robotics competitions. Exciting cash prizes and internship offers.",
    category: "Event",
    priority: "Normal",
    date: "2026-09-05",
    author: "Student Affairs Council"
  },
  {
    id: "NOT-003",
    title: "Library Timings Extended for Exam Season",
    description: "The Central Library will remain open until 11:00 PM on all working days and weekends throughout the examination period.",
    category: "Academic",
    priority: "Low",
    date: "2026-09-02",
    author: "Chief Librarian"
  }
];

// Backend API base URL (uses /api by default for same-origin production and Vite dev proxy)
const API_BASE = (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) || "/api";

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("sms_students");
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("sms_courses");
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem("sms_faculty");
    return saved ? JSON.parse(saved) : INITIAL_FACULTY;
  });

  const [exams, setExams] = useState(() => {
    const saved = localStorage.getItem("sms_exams");
    return saved ? JSON.parse(saved) : INITIAL_EXAMS;
  });

  const [marks, setMarks] = useState(() => {
    const saved = localStorage.getItem("sms_marks");
    return saved ? JSON.parse(saved) : INITIAL_MARKS;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("sms_attendance");
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem("sms_timetable");
    return saved ? JSON.parse(saved) : INITIAL_TIMETABLE;
  });

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem("sms_notices");
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  // Initial fetch from MongoDB backend on mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          resStudents,
          resCourses,
          resFaculty,
          resExams,
          resMarks,
          resAttendance,
          resTimetable,
          resNotices,
        ] = await Promise.all([
          fetch(`${API_BASE}/students`),
          fetch(`${API_BASE}/courses`),
          fetch(`${API_BASE}/faculty`),
          fetch(`${API_BASE}/exams`),
          fetch(`${API_BASE}/exams/marks/all`),
          fetch(`${API_BASE}/attendance`),
          fetch(`${API_BASE}/timetable`),
          fetch(`${API_BASE}/notices`),
        ]);

        if (resStudents.ok) {
          const data = await resStudents.json();
          if (Array.isArray(data)) setStudents(data);
        }
        if (resCourses.ok) {
          const data = await resCourses.json();
          if (Array.isArray(data)) setCourses(data);
        }
        if (resFaculty.ok) {
          const data = await resFaculty.json();
          if (Array.isArray(data)) setFaculty(data);
        }
        if (resExams.ok) {
          const data = await resExams.json();
          if (Array.isArray(data)) setExams(data);
        }
        if (resMarks.ok) {
          const data = await resMarks.json();
          if (Array.isArray(data)) setMarks(data);
        }
        if (resAttendance.ok) {
          const data = await resAttendance.json();
          if (Array.isArray(data)) setAttendance(data);
        }
        if (resTimetable.ok) {
          const data = await resTimetable.json();
          if (Array.isArray(data)) setTimetable(data);
        }
        if (resNotices.ok) {
          const data = await resNotices.json();
          if (Array.isArray(data)) setNotices(data);
        }
      } catch (err) {
        console.warn("Backend server not reachable, using local fallback:", err);
      }
    };

    fetchAllData();
  }, []);

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("sms_students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("sms_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("sms_faculty", JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem("sms_exams", JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem("sms_marks", JSON.stringify(marks));
  }, [marks]);

  useEffect(() => {
    localStorage.setItem("sms_attendance", JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem("sms_timetable", JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem("sms_notices", JSON.stringify(notices));
  }, [notices]);

  // STUDENT CRUD
  const addStudent = (newStudent) => {
    const studentWithId = {
      ...newStudent,
      id: newStudent.id || `STU-${Math.floor(1000 + Math.random() * 9000)}`,
      status: newStudent.status || "Active",
      attendancePercentage: newStudent.attendancePercentage || 100,
    };
    setStudents((prev) => [studentWithId, ...prev]);

    fetch(`${API_BASE}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentWithId),
    }).catch((err) => console.error("Failed to sync student to MongoDB:", err));

    return studentWithId;
  };

  const updateStudent = (id, updatedData) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s))
    );

    fetch(`${API_BASE}/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    }).catch((err) => console.error("Failed to update student in MongoDB:", err));
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));

    fetch(`${API_BASE}/students/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete student from MongoDB:", err));
  };

  const getStudentById = (id) => students.find((s) => s.id === id);

  // COURSE CRUD
  const addCourse = (newCourse) => {
    const courseWithId = {
      ...newCourse,
      id: newCourse.id || `CRS-${Math.floor(100 + Math.random() * 900)}`,
      enrolledCount: 0,
    };
    setCourses((prev) => [courseWithId, ...prev]);

    fetch(`${API_BASE}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseWithId),
    }).catch((err) => console.error("Failed to sync course to MongoDB:", err));

    return courseWithId;
  };

  const updateCourse = (id, updatedData) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );

    fetch(`${API_BASE}/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    }).catch((err) => console.error("Failed to update course in MongoDB:", err));
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));

    fetch(`${API_BASE}/courses/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete course from MongoDB:", err));
  };

  const getCourseById = (id) => courses.find((c) => c.id === id);

  // FACULTY CRUD
  const addFaculty = (newFaculty) => {
    const facultyWithId = {
      ...newFaculty,
      id: newFaculty.id || `FAC-${Math.floor(100 + Math.random() * 900)}`,
      status: "Active",
      assignedCourses: newFaculty.assignedCourses || [],
    };
    setFaculty((prev) => [facultyWithId, ...prev]);

    fetch(`${API_BASE}/faculty`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(facultyWithId),
    }).catch((err) => console.error("Failed to sync faculty to MongoDB:", err));

    return facultyWithId;
  };

  const updateFaculty = (id, updatedData) => {
    setFaculty((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updatedData } : f))
    );

    fetch(`${API_BASE}/faculty/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    }).catch((err) => console.error("Failed to update faculty in MongoDB:", err));
  };

  const deleteFaculty = (id) => {
    setFaculty((prev) => prev.filter((f) => f.id !== id));

    fetch(`${API_BASE}/faculty/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete faculty from MongoDB:", err));
  };

  const getFacultyById = (id) => faculty.find((f) => f.id === id);

  // ATTENDANCE
  const saveAttendance = (newAttendanceRecord) => {
    const recordWithId = {
      ...newAttendanceRecord,
      id: `ATT-${Date.now()}`,
    };
    setAttendance((prev) => [recordWithId, ...prev]);

    fetch(`${API_BASE}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recordWithId),
    }).catch((err) => console.error("Failed to save attendance to MongoDB:", err));

    return recordWithId;
  };

  // EXAMS CRUD
  const addExam = (newExam) => {
    const examWithId = {
      ...newExam,
      id: newExam.id || `EXM-${Math.floor(100 + Math.random() * 900)}`,
    };
    setExams((prev) => [examWithId, ...prev]);

    fetch(`${API_BASE}/exams`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(examWithId),
    }).catch((err) => console.error("Failed to create exam in MongoDB:", err));

    return examWithId;
  };

  const updateExam = (id, updatedData) => {
    setExams((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedData } : e))
    );

    fetch(`${API_BASE}/exams/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    }).catch((err) => console.error("Failed to update exam in MongoDB:", err));
  };

  const deleteExam = (id) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
    setMarks((prev) => prev.filter((m) => m.examId !== id));

    fetch(`${API_BASE}/exams/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete exam from MongoDB:", err));
  };

  const getExamById = (id) => exams.find((e) => e.id === id);

  // MARKS
  const calculateGrade = (pct) => {
    if (pct >= 90) return "A+";
    if (pct >= 80) return "A";
    if (pct >= 70) return "B+";
    if (pct >= 60) return "B";
    if (pct >= 50) return "C";
    if (pct >= 40) return "D";
    return "F";
  };

  const saveExamMarks = (examId, studentMarksList) => {
    const exam = getExamById(examId);
    const newRecords = studentMarksList.map((item) => {
      const percentage = Math.round((item.marksObtained / (exam ? exam.totalMarks : 100)) * 100);
      const grade = calculateGrade(percentage);
      const resultStatus = percentage >= 40 ? "Pass" : "Fail";

      return {
        id: `RES-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        examId,
        examName: exam ? exam.name : "Exam",
        studentId: item.studentId,
        studentName: item.studentName,
        course: exam ? exam.course : "",
        subject: exam ? exam.subject : "",
        marksObtained: Number(item.marksObtained),
        totalMarks: exam ? exam.totalMarks : 100,
        percentage,
        grade,
        resultStatus,
      };
    });

    setMarks((prev) => {
      // Remove any existing marks for this exam + student pair
      const filtered = prev.filter(
        (p) => !(p.examId === examId && studentMarksList.some((s) => s.studentId === p.studentId))
      );
      return [...newRecords, ...filtered];
    });

    fetch(`${API_BASE}/exams/marks/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examId, studentMarksList }),
    }).catch((err) => console.error("Failed to save marks to MongoDB:", err));
  };

  const updateSingleMark = (markId, updatedData) => {
    setMarks((prev) =>
      prev.map((m) => {
        if (m.id === markId) {
          const marksObtained = updatedData.marksObtained !== undefined ? Number(updatedData.marksObtained) : m.marksObtained;
          const totalMarks = updatedData.totalMarks !== undefined ? Number(updatedData.totalMarks) : m.totalMarks;
          const percentage = Math.round((marksObtained / totalMarks) * 100);
          const grade = calculateGrade(percentage);
          const resultStatus = percentage >= 40 ? "Pass" : "Fail";
          return {
            ...m,
            ...updatedData,
            marksObtained,
            totalMarks,
            percentage,
            grade,
            resultStatus,
          };
        }
        return m;
      })
    );

    fetch(`${API_BASE}/exams/marks/${markId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    }).catch((err) => console.error("Failed to update mark in MongoDB:", err));
  };

  // TIMETABLE CRUD
  const addTimetableEntry = (entry) => {
    const entryWithId = {
      ...entry,
      id: `TT-${Date.now()}`,
    };
    setTimetable((prev) => [...prev, entryWithId]);

    fetch(`${API_BASE}/timetable`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entryWithId),
    }).catch((err) => console.error("Failed to save timetable slot to MongoDB:", err));

    return entryWithId;
  };

  const updateTimetableEntry = (id, updatedData) => {
    setTimetable((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );

    fetch(`${API_BASE}/timetable/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    }).catch((err) => console.error("Failed to update timetable slot in MongoDB:", err));
  };

  const deleteTimetableEntry = (id) => {
    setTimetable((prev) => prev.filter((t) => t.id !== id));

    fetch(`${API_BASE}/timetable/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete timetable slot from MongoDB:", err));
  };

  // NOTICES CRUD
  const addNotice = (notice) => {
    const noticeWithId = {
      ...notice,
      id: `NOT-${Date.now()}`,
      date: notice.date || new Date().toISOString().split("T")[0],
    };
    setNotices((prev) => [noticeWithId, ...prev]);

    fetch(`${API_BASE}/notices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noticeWithId),
    }).catch((err) => console.error("Failed to create notice in MongoDB:", err));

    return noticeWithId;
  };

  const updateNotice = (id, updatedData) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updatedData } : n))
    );

    fetch(`${API_BASE}/notices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    }).catch((err) => console.error("Failed to update notice in MongoDB:", err));
  };

  const deleteNotice = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));

    fetch(`${API_BASE}/notices/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete notice from MongoDB:", err));
  };

  return (
    <DataContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudentById,

        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        getCourseById,

        faculty,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        getFacultyById,

        attendance,
        saveAttendance,

        exams,
        addExam,
        updateExam,
        deleteExam,
        getExamById,

        marks,
        saveExamMarks,
        updateSingleMark,

        timetable,
        addTimetableEntry,
        updateTimetableEntry,
        deleteTimetableEntry,

        notices,
        addNotice,
        updateNotice,
        deleteNotice,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
