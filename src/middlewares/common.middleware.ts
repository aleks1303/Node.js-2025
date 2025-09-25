import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!isObjectIdOrHexString(req.params[key])) {
        throw new ApiError("Invalid ID", 400);
      }
      next();
    };
  }

  public isValidBody(
    schema: ObjectSchema,
    property: "body" | "query" | "params" = "body",
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req[property]);
      try {
        if (error) {
          throw new ApiError("Body is invalid", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const commonMiddleware = new CommonMiddleware();
