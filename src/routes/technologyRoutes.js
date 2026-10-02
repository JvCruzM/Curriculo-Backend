import { Router } from "express";
import technologyController from "../controllers/technologyController.js";

const router = Router();

router.get("/", technologyController.getTechnologies);
router.get("/:technologyId", technologyController.getTechnology);
router.post("/", technologyController.createTechnology);
router.put("/:technologyId", technologyController.updateTechnology);
router.delete("/:technologyId", technologyController.deleteTechnology);

export default router;
