import Technology from "../models/technology.js";

const getAllTechnologies = async () => {
  return await Technology.findAll({
    order: [["name", "ASC"]],
  });
};

const getTechnologyById = async (id) => {
  return await Technology.findByPk(id);
};

const createTechnology = async (data) => {
  return await Technology.create(data);
};

const updateTechnology = async (id, data) => {
  const technology = await Technology.findByPk(id);

  if (!technology) {
    return null;
  }

  return await technology.update(data);
};

const deleteTechnology = async (id) => {
  const technology = await Technology.findByPk(id);

  if (!technology) {
    return null;
  }

  await technology.destroy();

  return technology;
};

export default {
  getAllTechnologies,
  getTechnologyById,
  createTechnology,
  updateTechnology,
  deleteTechnology,
};
