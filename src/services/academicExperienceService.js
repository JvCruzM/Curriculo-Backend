import { AcademicExperience, Profile } from "../models/index.js";

const getAllAcademicExperiences = async () => {
  return await AcademicExperience.findAll({
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

const getAcademicExperienceById = async (id) => {
  return await AcademicExperience.findByPk(id, {
    include: [
      {
        model: Profile,
        as: "profile",
        attributes: ["id", "name", "email"],
      },
    ],
  });
};

const createAcademicExperience = async (data) => {
  const profile = await Profile.findByPk(data.profileId);

  if (!profile) {
    return {
      error: "PROFILE_NOT_FOUND",
    };
  }

  return await AcademicExperience.create(data);
};

const updateAcademicExperience = async (id, data) => {
  const academicExperience = await AcademicExperience.findByPk(id);

  if (!academicExperience) {
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

  return await academicExperience.update(data);
};

const deleteAcademicExperience = async (id) => {
  const academicExperience = await AcademicExperience.findByPk(id);

  if (!academicExperience) {
    return null;
  }

  await academicExperience.destroy();

  return academicExperience;
};

export default {
  getAllAcademicExperiences,
  getAcademicExperienceById,
  createAcademicExperience,
  updateAcademicExperience,
  deleteAcademicExperience,
};
