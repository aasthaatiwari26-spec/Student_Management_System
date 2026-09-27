import mongoose from "mongoose";
import Notice from "../models/Notice.js";

export async function getNotices(req, res) {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notices" });
  }
}

export async function createNotice(req, res) {
  try {
    const newNotice = await Notice.create({
      ...req.body,
      id: req.body.id || `NOT-${Date.now()}`,
      category: req.body.category || "Academic",
      priority: req.body.priority || "Normal",
      date: req.body.date || new Date().toISOString().split("T")[0],
      author: req.body.author || "Dean of Academics",
    });

    res.status(201).json(newNotice);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to create notice" });
  }
}

export async function updateNotice(req, res) {
  try {
    const query = mongoose.isValidObjectId(req.params.id)
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };

    const notice = await Notice.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true }
    );
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.json(notice);
  } catch (error) {
    res.status(400).json({ message: "Failed to update notice" });
  }
}

export async function deleteNotice(req, res) {
  try {
    const query = mongoose.isValidObjectId(req.params.id)
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };

    const notice = await Notice.findOneAndDelete(query);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.json({ message: "Notice removed from bulletin" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete notice" });
  }
}
