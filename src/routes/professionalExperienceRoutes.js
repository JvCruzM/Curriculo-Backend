import { Router } from "express";
import professionalExperienceController from "../controllers/professionalExperienceController.js";

const router = Router();

router.get("/", professionalExperienceController.getProfessionalExperiences);

router.get(
  "/:professionalExperienceId",
  professionalExperienceController.getProfessionalExperience,
);

router.post("/", professionalExperienceController.createProfessionalExperience);

router.put(
  "/:professionalExperienceId",
  professionalExperienceController.updateProfessionalExperience,
);

router.delete(
  "/:professionalExperienceId",
  professionalExperienceController.deleteProfessionalExperience,
);

export default router;
