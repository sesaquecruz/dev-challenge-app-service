import { Request, Response, NextFunction } from "express";
import { HttpError } from "../dto/http-error";
import { ValidationError } from "../../error/validation";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  let error: HttpError;

  if (err instanceof SyntaxError) {
    error = new HttpError(400, [err.message]);
  } else if (err instanceof ValidationError) {
    error = new HttpError(422, (err as ValidationError).errors);
  } else {
    error = new HttpError(500, ["server error"]);
  }

  if (res.headersSent) {
    return next(error);
  }

  return res.status(error.code).json(error);
}

export { errorHandler };
