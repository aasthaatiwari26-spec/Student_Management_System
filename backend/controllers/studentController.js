import mongoose from "mongoose";
import Student from "../models/Student.js";

// @desc    Get all students
// @route   GET /api/students
export async function getStudents(req, res) {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
}

// @desc    Create new student
// @route   POST /api/students
export async function createStudent(req, res) {
  try {
    const studentId = req.body.id || `STU-${Math.floor(1000 + Math.random() * 9000)}`;

    const newStudent = await Student.create({
      ...req.body,
      id: studentId,
      admissionDate: req.body.admissionDate || new Date().toISOString().split("T")[0],
    });

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to create student" });
  }
}

// @desc    Update student
// @route   PUT /api/students/:id
export async function updateStudent(req, res) {
  try {
    const query = mongoose.isValidObjectId(req.params.id)
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };

    const student = await Student.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: "Failed to update student" });
  }
}

// @desc    Delete student
// @route   DELETE /api/students/:id
export async function deleteStudent(req, res) {
  try {
    const query = mongoose.isValidObjectId(req.params.id)
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };

    const student = await Student.findOneAndDelete(query);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, message: "Student removed from database" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete student" });
  }
}
