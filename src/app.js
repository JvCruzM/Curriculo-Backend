import express from "express";
import cors from "cors";

import profileRoutes from "./routes/profileRoutes.js";
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

app.use("/profiles", profileRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada.",
  });
});

app.use(errorHandler);

export default app;