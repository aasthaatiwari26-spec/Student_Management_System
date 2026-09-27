import mongoose from "mongoose";
import Faculty from "../models/Faculty.js";

export async function getFaculty(req, res) {
  try {
    const list = await Faculty.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch faculty" });
  }
}

export async function createFaculty(req, res) {
  try {
    const facId = req.body.id || `FAC-${Math.floor(100 + Math.random() * 900)}`;

    const newFaculty = await Faculty.create({
      ...req.body,
      id: facId,
      qualification: req.body.qualification || "Ph.D.",
      experience: req.body.experience || "5 Years",
      assignedCourses: req.body.assignedCourses || [],
    });

    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to create faculty member" });
  }
}

export async function updateFaculty(req, res) {
  try {
    const query = mongoose.isValidObjectId(req.params.id)
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };

    const faculty = await Faculty.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true }
    );
    if (!faculty) {
      return res.status(404).json({ message: "Faculty member not found" });
    }
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ message: "Failed to update faculty member" });
  }
}

export async function deleteFaculty(req, res) {
  try {
    const query = mongoose.isValidObjectId(req.params.id)
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };

    const faculty = await Faculty.findOneAndDelete(query);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.json({ message: "Faculty removed from database" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete faculty member" });
  }
}
