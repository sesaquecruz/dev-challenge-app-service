import { Request, Response, NextFunction } from "express";
import { HttpError } from "../dto/http-error";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const error = HttpError.fromError(err);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(error.code).json(error);
}

export { errorHandler };
