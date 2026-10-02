import sequelize from "./database.js";
import "../models/index.js";

const syncDatabase = async () => {
  try {
    await sequelize.sync();

    console.log("Banco de dados sincronizado com sucesso.");
    await sequelize.close();
  } catch (error) {
    console.error("Erro ao sincronizar banco de dados:", error);
    process.exit(1);
  }
};

syncDatabase();
