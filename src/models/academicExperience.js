import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AcademicExperience = sequelize.define(
  "AcademicExperience",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    profileId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    institution: {
      type: DataTypes.STRING(180),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    course: {
      type: DataTypes.STRING(180),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    degree: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "academic_experiences",
    timestamps: true,
    underscored: true,
  },
);

export default AcademicExperience;
