import Profile from "./profile.js";
import AcademicExperience from "./academicExperience.js";
import ProfessionalExperience from "./professionalExperience.js";
import Project from "./project.js";
import Technology from "./technology.js";
import ProjectTechnology from "./projectTechnology.js";

Profile.hasMany(AcademicExperience, {
  foreignKey: "profileId",
  as: "academicExperiences",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

AcademicExperience.belongsTo(Profile, {
  foreignKey: "profileId",
  as: "profile",
});

Profile.hasMany(ProfessionalExperience, {
  foreignKey: "profileId",
  as: "professionalExperiences",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ProfessionalExperience.belongsTo(Profile, {
  foreignKey: "profileId",
  as: "profile",
});

Profile.hasMany(Project, {
  foreignKey: "profileId",
  as: "projects",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Project.belongsTo(Profile, {
  foreignKey: "profileId",
  as: "profile",
});

Project.belongsToMany(Technology, {
  through: ProjectTechnology,
  foreignKey: "projectId",
  otherKey: "technologyId",
  as: "technologies",
});

Technology.belongsToMany(Project, {
  through: ProjectTechnology,
  foreignKey: "technologyId",
  otherKey: "projectId",
  as: "projects",
});

ProjectTechnology.belongsTo(Project, {
  foreignKey: "projectId",
  as: "project",
});

ProjectTechnology.belongsTo(Technology, {
  foreignKey: "technologyId",
  as: "technology",
});

Project.hasMany(ProjectTechnology, {
  foreignKey: "projectId",
  as: "projectTechnologies",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Technology.hasMany(ProjectTechnology, {
  foreignKey: "technologyId",
  as: "projectTechnologies",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export {
  Profile,
  AcademicExperience,
  ProfessionalExperience,
  Project,
  Technology,
  ProjectTechnology,
};
