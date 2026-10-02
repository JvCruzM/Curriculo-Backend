const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Dados inválidos.",
      details: error.errors.map((item) => item.message),
    });
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      error: "Já existe um registro com um valor único informado.",
      details: error.errors.map((item) => item.message),
    });
  }

  return res.status(500).json({
    error: "Erro interno do servidor.",
  });
};

export default errorHandler;
