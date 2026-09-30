import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Technology = sequelize.define(
  "Technology",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "technologies",
    timestamps: true,
    underscored: true,
  },
);

export default Technology;