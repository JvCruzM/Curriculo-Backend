import academicExperienceService from "../services/academicExperienceService.js";

const getAcademicExperiences = async (req, res, next) => {
  try {
    const experiences =
      await academicExperienceService.getAllAcademicExperiences();

    return res.status(200).json(experiences);
  } catch (error) {
    next(error);
  }
};

const getAcademicExperience = async (req, res, next) => {
  try {
    const { academicExperienceId } = req.params;

    const experience =
      await academicExperienceService.getAcademicExperienceById(
        academicExperienceId,
      );

    if (!experience) {
      return res.status(404).json({
        error: "Experiência acadêmica não encontrada.",
      });
    }

    return res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
};

const createAcademicExperience = async (req, res, next) => {
  try {
    const result = await academicExperienceService.createAcademicExperience(
      req.body,
    );

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

const updateAcademicExperience = async (req, res, next) => {
  try {
    const { academicExperienceId } = req.params;

    const result = await academicExperienceService.updateAcademicExperience(
      academicExperienceId,
      req.body,
    );

    if (!result) {
      return res.status(404).json({
        error: "Experiência acadêmica não encontrada.",
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

const deleteAcademicExperience = async (req, res, next) => {
  try {
    const { academicExperienceId } = req.params;

    const experience =
      await academicExperienceService.deleteAcademicExperience(
        academicExperienceId,
      );

    if (!experience) {
      return res.status(404).json({
        error: "Experiência acadêmica não encontrada.",
      });
    }

    return res.status(200).json({
      message: "Experiência acadêmica excluída com sucesso.",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAcademicExperiences,
  getAcademicExperience,
  createAcademicExperience,
  updateAcademicExperience,
  deleteAcademicExperience,
};
