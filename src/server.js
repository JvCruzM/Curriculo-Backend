import "dotenv/config";
import app from "./app.js";
import sequelize from "./config/database.js";
import "./models/index.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("Conexão com PostgreSQL estabelecida com sucesso.");

    app.listen(PORT, () => {
      console.log(`Servidor executando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar com PostgreSQL:", error.message);
    process.exit(1);
  }
};

startServer();
