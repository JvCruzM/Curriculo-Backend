import { Router } from "express";
import academicExperienceController from "../controllers/academicExperienceController.js";

const router = Router();

router.get("/", academicExperienceController.getAcademicExperiences);
router.get(
  "/:academicExperienceId",
  academicExperienceController.getAcademicExperience,
);
router.post("/", academicExperienceController.createAcademicExperience);
router.put(
  "/:academicExperienceId",
  academicExperienceController.updateAcademicExperience,
);
router.delete(
  "/:academicExperienceId",
  academicExperienceController.deleteAcademicExperience,
);

export default router;
