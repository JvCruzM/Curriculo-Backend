import express from "express";
import cors from "cors";

import profileRoutes from "./routes/profileRoutes.js";
import academicExperienceRoutes from "./routes/academicExperienceRoutes.js";
import professionalExperienceRoutes from "./routes/professionalExperienceRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import technologyRoutes from "./routes/technologyRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "API de Currículo funcionando!",
  });
});
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API de Currículo online.",
  });
});

app.use("/profiles", profileRoutes);
app.use("/academic-experiences", academicExperienceRoutes);
app.use("/professional-experiences", professionalExperienceRoutes);
app.use("/projects", projectRoutes);
app.use("/technologies", technologyRoutes);
app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada.",
  });
});

app.use(errorHandler);

export default app;
