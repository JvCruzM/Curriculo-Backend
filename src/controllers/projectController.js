import projectService from "../services/projectService.js";

const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects();

    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await projectService.getProjectById(projectId);

    if (!project) {
      return res.status(404).json({
        error: "Projeto não encontrado.",
      });
    }

    return res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const result = await projectService.createProject(req.body);

    if (result?.error === "PROFILE_NOT_FOUND") {
      return res.status(404).json({
        error: "Perfil informado não encontrado.",
      });
    }

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const result = await projectService.updateProject(projectId, req.body);

    if (!result) {
      return res.status(404).json({
        error: "Projeto não encontrado.",
      });
    }

    if (result?.error === "PROFILE_NOT_FOUND") {
      return res.status(404).json({
        error: "Perfil informado não encontrado.",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await projectService.deleteProject(projectId);

    if (!project) {
      return res.status(404).json({
        error: "Projeto não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Projeto excluído com sucesso.",
    });
  } catch (error) {
    next(error);
  }
};

const getProjectTechnologies = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const technologies = await projectService.getProjectTechnologies(projectId);

    if (!technologies) {
      return res.status(404).json({
        error: "Projeto não encontrado.",
      });
    }

    return res.status(200).json(technologies);
  } catch (error) {
    next(error);
  }
};

const addTechnologyToProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { technologyId } = req.body;

    if (!technologyId) {
      return res.status(400).json({
        error: "technologyId é obrigatório.",
      });
    }

    const result = await projectService.addTechnologyToProject(
      projectId,
      technologyId,
    );

    if (result?.error === "PROJECT_NOT_FOUND") {
      return res.status(404).json({
        error: "Projeto não encontrado.",
      });
    }

    if (result?.error === "TECHNOLOGY_NOT_FOUND") {
      return res.status(404).json({
        error: "Tecnologia não encontrada.",
      });
    }

    return res.status(201).json({
      message: "Tecnologia associada ao projeto com sucesso.",
      technology: result,
    });
  } catch (error) {
    next(error);
  }
};

const removeTechnologyFromProject = async (req, res, next) => {
  try {
    const { projectId, technologyId } = req.params;

    const result = await projectService.removeTechnologyFromProject(
      projectId,
      technologyId,
    );

    if (result?.error === "PROJECT_NOT_FOUND") {
      return res.status(404).json({
        error: "Projeto não encontrado.",
      });
    }

    if (result?.error === "TECHNOLOGY_NOT_FOUND") {
      return res.status(404).json({
        error: "Tecnologia não encontrada.",
      });
    }

    return res.status(200).json({
      message: "Tecnologia removida do projeto com sucesso.",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectTechnologies,
  addTechnologyToProject,
  removeTechnologyFromProject,
};
