import {
  Project,
  Profile,
  Technology,
  ProjectTechnology,
} from "../models/index.js";

const projectInclude = [
  {
    model: Profile,
    as: "profile",
    attributes: ["id", "name", "email"],
  },
  {
    model: Technology,
    as: "technologies",
    through: {
      attributes: [],
    },
    order: [["name", "ASC"]],
  },
];

const getAllProjects = async () => {
  return await Project.findAll({
    include: projectInclude,
    order: [["createdAt", "DESC"]],
  });
};

const getProjectById = async (id) => {
  return await Project.findByPk(id, {
    include: projectInclude,
  });
};

const createProject = async (data) => {
  const profile = await Profile.findByPk(data.profileId);

  if (!profile) {
    return {
      error: "PROFILE_NOT_FOUND",
    };
  }

  const project = await Project.create(data);

  return await Project.findByPk(project.id, {
    include: projectInclude,
  });
};

const updateProject = async (id, data) => {
  const project = await Project.findByPk(id);

  if (!project) {
    return null;
  }

  if (data.profileId) {
    const profile = await Profile.findByPk(data.profileId);

    if (!profile) {
      return {
        error: "PROFILE_NOT_FOUND",
      };
    }
  }

  await project.update(data);

  return await Project.findByPk(project.id, {
    include: projectInclude,
  });
};

const deleteProject = async (id) => {
  const project = await Project.findByPk(id);

  if (!project) {
    return null;
  }

  await project.destroy();

  return project;
};

const getProjectTechnologies = async (projectId) => {
  const project = await Project.findByPk(projectId, {
    include: {
      model: Technology,
      as: "technologies",
      through: {
        attributes: [],
      },
      order: [["name", "ASC"]],
    },
  });

  if (!project) {
    return null;
  }

  return project.technologies;
};

const addTechnologyToProject = async (projectId, technologyId) => {
  const project = await Project.findByPk(projectId);

  if (!project) {
    return {
      error: "PROJECT_NOT_FOUND",
    };
  }

  const technology = await Technology.findByPk(technologyId);

  if (!technology) {
    return {
      error: "TECHNOLOGY_NOT_FOUND",
    };
  }

  const existingRelation = await ProjectTechnology.findOne({
    where: {
      projectId,
      technologyId,
    },
  });

  if (existingRelation) {
    return {
      error: "TECHNOLOGY_ALREADY_ASSOCIATED",
    };
  }

  await project.addTechnology(technology);

  return technology;
};

const removeTechnologyFromProject = async (projectId, technologyId) => {
  const project = await Project.findByPk(projectId);

  if (!project) {
    return {
      error: "PROJECT_NOT_FOUND",
    };
  }

  const technology = await Technology.findByPk(technologyId);

  if (!technology) {
    return {
      error: "TECHNOLOGY_NOT_FOUND",
    };
  }

  const existingRelation = await ProjectTechnology.findOne({
    where: {
      projectId,
      technologyId,
    },
  });

  if (!existingRelation) {
    return {
      error: "RELATION_NOT_FOUND",
    };
  }

  await project.removeTechnology(technology);

  return technology;
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectTechnologies,
  addTechnologyToProject,
  removeTechnologyFromProject,
};
