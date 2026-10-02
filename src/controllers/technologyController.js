import technologyService from "../services/technologyService.js";

const getTechnologies = async (req, res, next) => {
  try {
    const technologies = await technologyService.getAllTechnologies();

    return res.status(200).json(technologies);
  } catch (error) {
    next(error);
  }
};

const getTechnology = async (req, res, next) => {
  try {
    const { technologyId } = req.params;

    const technology = await technologyService.getTechnologyById(technologyId);

    if (!technology) {
      return res.status(404).json({
        error: "Tecnologia não encontrada.",
      });
    }

    return res.status(200).json(technology);
  } catch (error) {
    next(error);
  }
};

const createTechnology = async (req, res, next) => {
  try {
    const technology = await technologyService.createTechnology(req.body);

    return res.status(201).json(technology);
  } catch (error) {
    next(error);
  }
};

const updateTechnology = async (req, res, next) => {
  try {
    const { technologyId } = req.params;

    const technology = await technologyService.updateTechnology(
      technologyId,
      req.body,
    );

    if (!technology) {
      return res.status(404).json({
        error: "Tecnologia não encontrada.",
      });
    }

    return res.status(200).json(technology);
  } catch (error) {
    next(error);
  }
};

const deleteTechnology = async (req, res, next) => {
  try {
    const { technologyId } = req.params;

    const technology = await technologyService.deleteTechnology(technologyId);

    if (!technology) {
      return res.status(404).json({
        error: "Tecnologia não encontrada.",
      });
    }

    return res.status(200).json({
      message: "Tecnologia excluída com sucesso.",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getTechnologies,
  getTechnology,
  createTechnology,
  updateTechnology,
  deleteTechnology,
};
