import express from "express";
import {
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController.js";

const router = express.Router();

router.route("/").get(getFaculty).post(createFaculty);
router.route("/:id").put(updateFaculty).delete(deleteFaculty);

export default router;
