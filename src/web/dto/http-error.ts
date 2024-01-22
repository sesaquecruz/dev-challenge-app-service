import { ValidationError } from "../../error/validation";

class HttpError {
  constructor(readonly code: number, readonly messages: string[]) { }

  static fromError(error: Error): HttpError {
    if (error instanceof SyntaxError) {
      return new HttpError(400, [error.message]);
    }

    if (error instanceof ValidationError) {
      return new HttpError(422, (error as ValidationError).errors);
    }
    
    console.log(error);
    return new HttpError(500, ["server error"]);
  }
}

export { HttpError };
