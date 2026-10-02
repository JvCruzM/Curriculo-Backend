import professionalExperienceService from "../services/professionalExperienceService.js";

const getProfessionalExperiences = async (req, res, next) => {
  try {
    const experiences =
      await professionalExperienceService.getAllProfessionalExperiences();

    return res.status(200).json(experiences);
  } catch (error) {
    next(error);
  }
};

const getProfessionalExperience = async (req, res, next) => {
  try {
    const { professionalExperienceId } = req.params;

    const experience =
      await professionalExperienceService.getProfessionalExperienceById(
        professionalExperienceId,
      );

    if (!experience) {
      return res.status(404).json({
        error: "Experiência profissional não encontrada.",
      });
    }

    return res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
};

const createProfessionalExperience = async (req, res, next) => {
  try {
    const result =
      await professionalExperienceService.createProfessionalExperience(
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

const updateProfessionalExperience = async (req, res, next) => {
  try {
    const { professionalExperienceId } = req.params;

    const result =
      await professionalExperienceService.updateProfessionalExperience(
        professionalExperienceId,
        req.body,
      );

    if (!result) {
      return res.status(404).json({
        error: "Experiência profissional não encontrada.",
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

const deleteProfessionalExperience = async (req, res, next) => {
  try {
    const { professionalExperienceId } = req.params;

    const experience =
      await professionalExperienceService.deleteProfessionalExperience(
        professionalExperienceId,
      );

    if (!experience) {
      return res.status(404).json({
        error: "Experiência profissional não encontrada.",
      });
    }

    return res.status(200).json({
      message: "Experiência profissional excluída com sucesso.",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getProfessionalExperiences,
  getProfessionalExperience,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience,
};
