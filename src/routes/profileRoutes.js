import { Router } from "express";
import profileController from "../controllers/profileController.js";

const router = Router();

router.get("/", profileController.getProfiles);
router.get("/:profileId/full", profileController.getFullProfile);
router.get("/:profileId", profileController.getProfile);
router.post("/", profileController.createProfile);
router.put("/:profileId", profileController.updateProfile);
router.delete("/:profileId", profileController.deleteProfile);

export default router;
