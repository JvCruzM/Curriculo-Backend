import profileService from "../services/profileService.js";

const getProfiles = async (req, res, next) => {
  try {
    const profiles = await profileService.getAllProfiles();

    return res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;

    const profile = await profileService.getProfileById(profileId);

    if (!profile) {
      return res.status(404).json({
        error: "Perfil não encontrado.",
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const getFullProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;

    const profile = await profileService.getFullProfileById(profileId);

    if (!profile) {
      return res.status(404).json({
        error: "Perfil não encontrado.",
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const createProfile = async (req, res, next) => {
  try {
    const profile = await profileService.createProfile(req.body);

    return res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;

    const profile = await profileService.updateProfile(profileId, req.body);

    if (!profile) {
      return res.status(404).json({
        error: "Perfil não encontrado.",
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;

    const profile = await profileService.deleteProfile(profileId);

    if (!profile) {
      return res.status(404).json({
        error: "Perfil não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Perfil excluído com sucesso.",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getProfiles,
  getProfile,
  getFullProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
