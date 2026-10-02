import { Router } from "express";
import projectController from "../controllers/projectController.js";

const router = Router();

router.get("/", projectController.getProjects);

router.get(
  "/:projectId/technologies",
  projectController.getProjectTechnologies,
);

router.post(
  "/:projectId/technologies",
  projectController.addTechnologyToProject,
);

router.delete(
  "/:projectId/technologies/:technologyId",
  projectController.removeTechnologyFromProject,
);

router.get("/:projectId", projectController.getProject);

router.post("/", projectController.createProject);

router.put("/:projectId", projectController.updateProject);

router.delete("/:projectId", projectController.deleteProject);

export default router;
