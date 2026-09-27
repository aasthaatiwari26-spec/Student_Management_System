# Education Management (SMS Portal) — Full MERN Stack Project

A modern, production-grade **Student Management System (SMS)** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). Designed for college project submissions, viva presentations, and real-world academic record keeping.

---

## 🏛️ System Architecture (MERN Stack)

```
[ Frontend (React + Vite) ]  <--->  [ Backend API (Node.js + Express) ]  <--->  [ Database (MongoDB) ]
  Port: 5173                          Port: 5000                                 Port: 27017
  React Router, Context API,          RESTful Routing, Controllers,               Mongoose Schemas,
  Lucide Icons, Protected Routes      Bcrypt Hashing, CORS, Dotenv                Indexes & Timestamps
```

- **M** - **MongoDB**: NoSQL database running locally at `mongodb://127.0.0.1:27017/student_management_db`.
- **E** - **Express.js**: Backend web framework organizing MVC routes and controllers.
- **R** - **React.js**: Fast, component-driven frontend powered by Vite with clean styling and intuitive layouts.
- **N** - **Node.js**: Asynchronous JavaScript runtime executing the backend server.

---

## 🔑 Default Login Credentials (Pre-seeded in MongoDB)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@college.edu` | `password123` |
| **Faculty** | `faculty@college.edu` | `password123` |
| **Student** | `pooja@college.edu` | `password123` |

> *Note: Passwords are automatically hashed with `bcryptjs` salt rounds before saving to MongoDB.*

---

## 🚀 How to Run the Project

### Quick Start (Single Command - Recommended)
Open a terminal in the root folder (`Anamika/`) and run:
```powershell
npm run dev
```
This automatically starts **both** the backend Express server (Port 5000) and the React Vite frontend (Port 5173) together!

---

### Alternative: Run in Separate Terminals

#### 1. Ensure MongoDB is Running
Make sure the MongoDB service is active on your machine (runs as Windows Service `MongoDB` on port `27017`):
```powershell
net start MongoDB
```

#### 2. Start the Backend (Port 5000)
Open a terminal in the `backend/` folder:
```powershell
cd "c:\Users\Anamika  Vishwakarma\Desktop\Anamika\backend"
node server.js
```
The server will connect to MongoDB, automatically seed initial sample records if the database is empty, and start listening on `http://localhost:5000`.

#### 3. Start the Frontend (Port 5173)
Open a second terminal in the `Student management/` folder:
```powershell
cd "c:\Users\Anamika  Vishwakarma\Desktop\Anamika\Student management"
npm run dev
```
Open your browser at: `http://localhost:5173/`

---

## 📂 Project Directory Structure

```
Anamika/
├── backend/                         # Express & MongoDB API Server
│   ├── config/
│   │   └── db.js                    # Mongoose database connection
│   ├── models/                      # MongoDB Schemas
│   │   ├── User.js                  # User accounts (Admin, Faculty, Student)
│   │   ├── Student.js               # Enrolled student profiles
│   │   ├── Course.js                # Department courses & credits
│   │   ├── Faculty.js               # Instructor profiles & qualifications
│   │   ├── Attendance.js            # Daily roll-call records
│   │   ├── Exam.js                  # Scheduled exams
│   │   ├── Mark.js                  # Exam marks, percentages & grades
│   │   ├── Timetable.js             # Weekly schedule slots
│   │   └── Notice.js                # Official campus announcements
│   ├── controllers/                 # Business logic for all endpoints
│   │   ├── authController.js        # Sign up, Login, Profile, Password Change
│   │   ├── studentController.js     # Student CRUD
│   │   ├── courseController.js      # Course CRUD
│   │   ├── facultyController.js     # Faculty CRUD
│   │   ├── attendanceController.js  # Attendance records
│   │   ├── examController.js        # Exams and Marks calculation
│   │   ├── timetableController.js   # Timetable CRUD
│   │   └── noticeController.js      # Notice CRUD
│   ├── routes/                      # RESTful Express route handlers
│   ├── seeder.js                    # Initial MongoDB data population script
│   ├── server.js                    # Express app entry point
│   ├── package.json                 # Backend dependencies
│   └── .env                         # PORT, MONGO_URI, JWT_SECRET
│
├── Student management/              # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx          # Navigation with "Education Management" branding
│   │   │   ├── Header.jsx           # Top search bar and user profile dropdown
│   │   │   └── ProtectedRoute.jsx   # Route guard (blocks unauthenticated visits)
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Authentication state connected to MongoDB
│   │   │   └── DataContext.jsx      # Global data store with live MongoDB sync
│   │   ├── Page/
│   │   │   ├── Login.jsx            # Authentication Login screen
│   │   │   ├── SignUp.jsx           # Registration screen
│   │   │   ├── Dashboard.jsx        # Summary KPI cards, charts & quick links
│   │   │   ├── Students/            # Student list, add, edit, profile view
│   │   │   ├── Courses/             # Course directory & course creation
│   │   │   ├── Faculty/             # Faculty directory & faculty creation
│   │   │   ├── Attendance/          # Roll-call sheet & attendance records
│   │   │   ├── Exams/               # Examination timetable & marks entry
│   │   │   ├── Timetable/           # Weekly class schedule
│   │   │   ├── Notices/             # Campus bulletin board
│   │   │   └── Settings.jsx         # Profile management & password reset
│   │   ├── App.jsx                  # Main router configuration
│   │   └── index.css                # Global theme styling
│   ├── package.json                 # Frontend dependencies
│   └── vite.config.js               # Dev server configuration and proxy
│
└── README.md                        # Documentation
```

---

## 🗄️ Database Collections & Schemas

1. **`users`**:
   - `fullName`, `email`, `phone`, `role` (`Admin`, `Faculty`, `Student`), `password` (hashed via bcrypt), `timestamps`.
2. **`students`**:
   - `id` (e.g. `STU-1001`), `fullName`, `email`, `phone`, `dob`, `gender`, `address`, `course`, `admissionDate`, `status`, `academicYear`, `semester`, `attendancePercentage`.
3. **`courses`**:
   - `id` (e.g. `CSE-101`), `name`, `department`, `duration`, `credits`, `description`, `assignedFaculty`, `enrolledCount`.
4. **`faculties`**:
   - `id` (e.g. `FAC-001`), `name`, `email`, `phone`, `department`, `qualification`, `experience`, `assignedCourses`, `status`.
5. **`attendances`**:
   - `id` (e.g. `ATT-12345`), `date`, `course`, `subject`, `records: [{ studentId, studentName, status }]`.
6. **`exams`**:
   - `id` (e.g. `EXM-001`), `name`, `course`, `subject`, `date`, `totalMarks`, `passingMarks`.
7. **`marks`**:
   - `id`, `examId`, `examName`, `studentId`, `studentName`, `course`, `subject`, `marksObtained`, `totalMarks`, `percentage`, `grade`, `resultStatus`.
8. **`timetables`**:
   - `id`, `day`, `time`, `course`, `subject`, `faculty`, `classroom`.
9. **`notices`**:
   - `id`, `title`, `description`, `category`, `priority`, `date`, `author`.

---

## 🎓 College Viva & Project Presentation Q&A

### Q1: Why did you choose the MERN stack?
> **Answer**: MERN enables an end-to-end JavaScript environment. React provides high reactivity with a virtual DOM, Node/Express provides high-concurrency non-blocking I/O for REST APIs, and MongoDB offers flexible JSON-like document modeling (BSON) ideal for academic entities.

### Q2: How is security handled for passwords?
> **Answer**: Passwords are never stored in plain text. When a user registers or updates their password, `bcryptjs` generates a cryptographic salt and hashes the password before persisting it in MongoDB. During login, `bcrypt.compare()` validates the input against the stored hash.

### Q3: How do Protected Routes work?
> **Answer**: The application includes a `ProtectedRoute` component. When a visitor tries to navigate to any internal page (like `/dashboard` or `/students`), `ProtectedRoute` checks the authentication state in `AuthContext`. If no valid session exists, the visitor is redirected to `/login`.

### Q4: How is data synced between React and MongoDB?
> **Answer**: The frontend uses a React Context API (`DataContext.jsx`). On page load, `DataContext` performs asynchronous HTTP requests (`GET /api/students`, etc.) to MongoDB. When adding, editing, or deleting items, the UI updates optimistically while concurrently firing asynchronous `POST`, `PUT`, or `DELETE` requests to the Express server to ensure permanent database persistence.
