import { ProfessionalExperience, Profile } from "../models/index.js";

const getAllProfessionalExperiences = async () => {
  return await ProfessionalExperience.findAll({
    include: [
      {
        model: Profile,
        as: "profile",
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["startDate", "DESC"]],
  });
};

const getProfessionalExperienceById = async (id) => {
  return await ProfessionalExperience.findByPk(id, {
    include: [
      {
        model: Profile,
        as: "profile",
        attributes: ["id", "name", "email"],
      },
    ],
  });
};

const createProfessionalExperience = async (data) => {
  const profile = await Profile.findByPk(data.profileId);

  if (!profile) {
    return {
      error: "PROFILE_NOT_FOUND",
    };
  }

  return await ProfessionalExperience.create(data);
};

const updateProfessionalExperience = async (id, data) => {
  const professionalExperience = await ProfessionalExperience.findByPk(id);

  if (!professionalExperience) {
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

  return await professionalExperience.update(data);
};

const deleteProfessionalExperience = async (id) => {
  const professionalExperience = await ProfessionalExperience.findByPk(id);

  if (!professionalExperience) {
    return null;
  }

  await professionalExperience.destroy();

  return professionalExperience;
};

export default {
  getAllProfessionalExperiences,
  getProfessionalExperienceById,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience,
};
