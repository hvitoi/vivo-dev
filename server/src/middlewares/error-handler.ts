import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Erro genérico
  return res.status(400).send({ errors: [{ message: 'Houve um problema' }] });
};

export { errorHandler };
