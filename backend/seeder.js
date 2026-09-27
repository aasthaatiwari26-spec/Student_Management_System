import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";

import User from "./models/User.js";
import Student from "./models/Student.js";
import Course from "./models/Course.js";
import Faculty from "./models/Faculty.js";
import Attendance from "./models/Attendance.js";
import Exam from "./models/Exam.js";
import Mark from "./models/Mark.js";
import Timetable from "./models/Timetable.js";
import Notice from "./models/Notice.js";

const sampleStudents = [
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

const sampleCourses = [
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
    description: "Hands-on engineering using React, Node.js, MongoDB, REST APIs, authentication, and cloud deployment.",
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

const sampleFaculty = [
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

const sampleExams = [
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

const sampleMarks = [
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

const sampleAttendance = [
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

const sampleTimetable = [
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

const sampleNotices = [
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

export async function seedDatabase() {
  try {
    await connectDB();

    console.log("Seeding MongoDB collections...");

    // Check / Seed Admin & Student Users
    const adminExists = await User.findOne({ email: "admin@college.edu" });
    if (!adminExists) {
      const hashedAdminPassword = await bcrypt.hash("password123", 10);
      await User.create({
        fullName: "Prof. Anamika Vishwakarma",
        email: "admin@college.edu",
        phone: "+91 98765 00123",
        role: "Admin",
        password: hashedAdminPassword,
      });
      console.log(" -> Created Admin user: admin@college.edu");
    }

    const studentUserExists = await User.findOne({ email: "pooja@college.edu" });
    if (!studentUserExists) {
      const hashedStudentPassword = await bcrypt.hash("password123", 10);
      await User.create({
        fullName: "Pooja Sharma",
        email: "pooja@college.edu",
        phone: "+91 98765 43210",
        role: "Student",
        password: hashedStudentPassword,
      });
      console.log(" -> Created Student user: pooja@college.edu");
    }

    const facultyUserExists = await User.findOne({ email: "faculty@college.edu" });
    if (!facultyUserExists) {
      const hashedFacultyPassword = await bcrypt.hash("password123", 10);
      await User.create({
        fullName: "Dr. Rajesh Verma",
        email: "faculty@college.edu",
        phone: "+91 98123 45678",
        role: "Faculty",
        password: hashedFacultyPassword,
      });
      console.log(" -> Created Faculty user: faculty@college.edu");
    }

    // Students
    const studentCount = await Student.countDocuments();
    if (studentCount === 0) {
      await Student.insertMany(sampleStudents);
      console.log(` -> Seeded ${sampleStudents.length} Students`);
    }

    // Courses
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      await Course.insertMany(sampleCourses);
      console.log(` -> Seeded ${sampleCourses.length} Courses`);
    }

    // Faculty
    const facultyCount = await Faculty.countDocuments();
    if (facultyCount === 0) {
      await Faculty.insertMany(sampleFaculty);
      console.log(` -> Seeded ${sampleFaculty.length} Faculty`);
    }

    // Exams
    const examCount = await Exam.countDocuments();
    if (examCount === 0) {
      await Exam.insertMany(sampleExams);
      console.log(` -> Seeded ${sampleExams.length} Exams`);
    }

    // Marks
    const markCount = await Mark.countDocuments();
    if (markCount === 0) {
      await Mark.insertMany(sampleMarks);
      console.log(` -> Seeded ${sampleMarks.length} Marks`);
    }

    // Attendance
    const attendanceCount = await Attendance.countDocuments();
    if (attendanceCount === 0) {
      await Attendance.insertMany(sampleAttendance);
      console.log(` -> Seeded ${sampleAttendance.length} Attendance sessions`);
    }

    // Timetable
    const timetableCount = await Timetable.countDocuments();
    if (timetableCount === 0) {
      await Timetable.insertMany(sampleTimetable);
      console.log(` -> Seeded ${sampleTimetable.length} Timetable slots`);
    }

    // Notices
    const noticeCount = await Notice.countDocuments();
    if (noticeCount === 0) {
      await Notice.insertMany(sampleNotices);
      console.log(` -> Seeded ${sampleNotices.length} Notices`);
    }

    console.log("✅ MongoDB Seeding Complete!");
  } catch (error) {
    console.error("❌ Seeding Error:", error);
  }
}

// If run directly from terminal via `node seeder.js`
if (process.argv[1]?.endsWith("seeder.js")) {
  seedDatabase().then(() => {
    mongoose.connection.close();
    process.exit(0);
  });
}
