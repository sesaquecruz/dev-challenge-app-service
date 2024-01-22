import { Request, Response, NextFunction } from "express";
import { HttpError } from "../dto/http-error";
import { FieldRules } from "../schema/field-rules";

function validator(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const errors: string[] = [];

    Object.keys(schema).forEach(field => {
      const fieldRules: FieldRules = schema[field];

      if (fieldRules.required && body[field] == undefined) {
        errors.push(`${field} is required`);
        return;
      }
      
      if (fieldRules.type !== typeof body[field]) {
        errors.push(`${field} must be ${fieldRules.type}`);
      }
    });

    if (errors.length > 0) {
      const error: HttpError = { code: 400, messages: errors };
      return res.status(error.code).json(error);
    }

    return next();
  };
}

export { validator };
