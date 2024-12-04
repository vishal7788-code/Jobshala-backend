import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getAllApplications, getApplications, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getApplications);
router.route("/:id/applicants").get(isAuthenticated, getAllApplications);
router.route("/update/:id/status").post(isAuthenticated, updateStatus);
export default router