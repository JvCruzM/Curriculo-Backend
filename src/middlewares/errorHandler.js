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
      error: "Registro duplicado.",
      details: error.errors.map((item) => item.message),
    });
  }

  const databaseErrorCode = error.original?.code;

  if (databaseErrorCode === "22P02") {
    return res.status(400).json({
      error: "ID informado possui formato inválido.",
    });
  }

  if (databaseErrorCode === "23503") {
    return res.status(400).json({
      error:
        "Não é possível realizar a operação porque o registro relacionado não existe.",
    });
  }

  if (databaseErrorCode === "23505") {
    return res.status(409).json({
      error: "Já existe um registro com os valores informados.",
    });
  }

  return res.status(500).json({
    error: "Erro interno do servidor.",
  });
};

export default errorHandler;
