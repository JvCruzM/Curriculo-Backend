import {
  Profile,
  AcademicExperience,
  ProfessionalExperience,
  Project,
  Technology,
} from "../models/index.js";

const getAllProfiles = async () => {
  return await Profile.findAll({
    order: [["createdAt", "ASC"]],
  });
};

const getProfileById = async (id) => {
  return await Profile.findByPk(id);
};

const getFullProfileById = async (id) => {
  return await Profile.findByPk(id, {
    include: [
      {
        model: AcademicExperience,
        as: "academicExperiences",
      },
      {
        model: ProfessionalExperience,
        as: "professionalExperiences",
      },
      {
        model: Project,
        as: "projects",
        include: [
          {
            model: Technology,
            as: "technologies",
            through: {
              attributes: [],
            },
          },
        ],
      },
    ],
  });
};

const createProfile = async (data) => {
  return await Profile.create(data);
};

const updateProfile = async (id, data) => {
  const profile = await Profile.findByPk(id);

  if (!profile) {
    return null;
  }

  return await profile.update(data);
};

const deleteProfile = async (id) => {
  const profile = await Profile.findByPk(id);

  if (!profile) {
    return null;
  }

  await profile.destroy();

  return profile;
};

export default {
  getAllProfiles,
  getProfileById,
  getFullProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
};