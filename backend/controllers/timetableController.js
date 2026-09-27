import mongoose from "mongoose";
import Timetable from "../models/Timetable.js";

export async function getTimetable(req, res) {
  try {
    const list = await Timetable.find().sort({ day: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch timetable" });
  }
}

export async function createTimetable(req, res) {
  try {
    const entry = await Timetable.create({
      ...req.body,
      id: req.body.id || `TT-${Date.now()}`,
      classroom: req.body.classroom || "Room 101",
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to create timetable slot" });
  }
}

export async function updateTimetable(req, res) {
  try {
    const query = mongoose.isValidObjectId(req.params.id)
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };

    const entry = await Timetable.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: "Timetable slot not found" });
    res.json(entry);
  } catch (error) {
    res.status(400).json({ message: "Failed to update timetable slot" });
  }
}

export async function deleteTimetable(req, res) {
  try {
    const query = mongoose.isValidObjectId(req.params.id)
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };

    const entry = await Timetable.findOneAndDelete(query);
    if (!entry) return res.status(404).json({ message: "Timetable slot not found" });
    res.json({ message: "Timetable slot deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete timetable slot" });
  }
}
