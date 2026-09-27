import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import Login from "./Page/Login";
import SignUp from "./Page/SignUp";
import ForgotPassword from "./Page/ForgotPassword";
import ResetPassword from "./Page/ResetPassword";

// Dashboard
import Dashboard from "./Page/Dashboard";

// Students
import StudentList from "./Page/Students/StudentList";
import AddStudent from "./Page/Students/AddStudent";
import EditStudent from "./Page/Students/EditStudent";
import StudentProfile from "./Page/Students/StudentProfile";

// Courses
import CourseList from "./Page/Courses/CourseList";
import AddCourse from "./Page/Courses/AddCourse";
import EditCourse from "./Page/Courses/EditCourse";
import CourseDetails from "./Page/Courses/CourseDetails";

// Attendance
import MarkAttendance from "./Page/Attendance/MarkAttendance";
import AttendanceRecords from "./Page/Attendance/AttendanceRecords";
import AttendanceReport from "./Page/Attendance/AttendanceReport";

// Examinations
import ExamList from "./Page/Exams/ExamList";
import CreateExam from "./Page/Exams/CreateExam";
import EnterMarks from "./Page/Exams/EnterMarks";
import UpdateMarks from "./Page/Exams/UpdateMarks";
import Results from "./Page/Exams/Results";

// Timetable
import TimetableView from "./Page/Timetable/TimetableView";
import AddTimetable from "./Page/Timetable/AddTimetable";
import EditTimetable from "./Page/Timetable/EditTimetable";

// Faculty
import FacultyList from "./Page/Faculty/FacultyList";
import AddFaculty from "./Page/Faculty/AddFaculty";
import EditFaculty from "./Page/Faculty/EditFaculty";
import FacultyProfile from "./Page/Faculty/FacultyProfile";

// Notices
import NoticeList from "./Page/Notices/NoticeList";
import CreateNotice from "./Page/Notices/CreateNotice";
import EditNotice from "./Page/Notices/EditNotice";

// Reports
import Reports from "./Page/Reports/Reports";

// Settings
import Profile from "./Page/Settings/Profile";
import EditProfile from "./Page/Settings/EditProfile";
import ChangePassword from "./Page/Settings/ChangePassword";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Authentication Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Portal Layout Routes (Protected) */}
            <Route element={<ProtectedRoute />}>
              {/* Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Students Module */}
              <Route path="/students" element={<StudentList />} />
              <Route path="/students/add" element={<AddStudent />} />
              <Route path="/students/edit/:id" element={<EditStudent />} />
              <Route path="/students/:id" element={<StudentProfile />} />

              {/* Courses Module */}
              <Route path="/courses" element={<CourseList />} />
              <Route path="/courses/add" element={<AddCourse />} />
              <Route path="/courses/edit/:id" element={<EditCourse />} />
              <Route path="/courses/:id" element={<CourseDetails />} />

              {/* Attendance Module */}
              <Route path="/attendance/mark" element={<MarkAttendance />} />
              <Route path="/attendance/records" element={<AttendanceRecords />} />
              <Route path="/attendance/report" element={<AttendanceReport />} />

              {/* Examinations Module */}
              <Route path="/exams" element={<ExamList />} />
              <Route path="/exams/create" element={<CreateExam />} />
              <Route path="/exams/enter-marks" element={<EnterMarks />} />
              <Route path="/exams/update-marks" element={<UpdateMarks />} />
              <Route path="/exams/results" element={<Results />} />

              {/* Timetable Module */}
              <Route path="/timetable" element={<TimetableView />} />
              <Route path="/timetable/add" element={<AddTimetable />} />
              <Route path="/timetable/edit/:id" element={<EditTimetable />} />

              {/* Faculty Module */}
              <Route path="/faculty" element={<FacultyList />} />
              <Route path="/faculty/add" element={<AddFaculty />} />
              <Route path="/faculty/edit/:id" element={<EditFaculty />} />
              <Route path="/faculty/:id" element={<FacultyProfile />} />

              {/* Notices Module */}
              <Route path="/notices" element={<NoticeList />} />
              <Route path="/notices/create" element={<CreateNotice />} />
              <Route path="/notices/edit/:id" element={<EditNotice />} />

              {/* Reports Module */}
              <Route path="/reports" element={<Reports />} />

              {/* Settings Module */}
              <Route path="/settings/profile" element={<Profile />} />
              <Route path="/settings/edit-profile" element={<EditProfile />} />
              <Route path="/settings/change-password" element={<ChangePassword />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;