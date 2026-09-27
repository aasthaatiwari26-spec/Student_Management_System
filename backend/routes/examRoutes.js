import express from "express";
import {
  getExams,
  createExam,
  updateExam,
  deleteExam,
  getMarks,
  saveMarks,
  updateSingleMark,
} from "../controllers/examController.js";

const router = express.Router();

router.route("/").get(getExams).post(createExam);
router.route("/:id").put(updateExam).delete(deleteExam);

// Marks sub-routes
router.route("/marks/all").get(getMarks);
router.route("/marks/save").post(saveMarks);
router.route("/marks/:id").put(updateSingleMark);

export default router;
