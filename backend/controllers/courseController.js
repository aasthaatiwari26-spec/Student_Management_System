import mongoose from "mongoose";
import Course from "../models/Course.js";

export async function getCourses(req, res) {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
}

export async function createCourse(req, res) {
  try {
    const courseId = req.body.id || `CRS-${Math.floor(100 + Math.random() * 900)}`;

    const newCourse = await Course.create({
      ...req.body,
      id: courseId,
      duration: req.body.duration || "4 Months",
      credits: req.body.credits || 4,
      description: req.body.description || "",
      assignedFaculty: req.body.assignedFaculty || "Not Assigned",
    });

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to create course" });
  }
}

export async function updateCourse(req, res) {
  try {
    const query = mongoose.isValidObjectId(req.params.id)
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };

    const course = await Course.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: "Failed to update course" });
  }
}

export async function deleteCourse(req, res) {
  try {
    const query = mongoose.isValidObjectId(req.params.id)
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };

    const course = await Course.findOneAndDelete(query);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course removed from database" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course" });
  }
}
