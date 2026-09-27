import express from "express";
import {
  getTimetable,
  createTimetable,
  updateTimetable,
  deleteTimetable,
} from "../controllers/timetableController.js";

const router = express.Router();

router.route("/").get(getTimetable).post(createTimetable);
router.route("/:id").put(updateTimetable).delete(deleteTimetable);

export default router;
