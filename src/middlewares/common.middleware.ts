import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req.params[key])) {
          throw new ApiError("ID is not valid", 409);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(
    schema: ObjectSchema,
    property: "body" | "query" | "params" = "body",
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error } = schema.validate(req[property]);
        if (error) {
          throw new ApiError("Body is not valid", 409);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const commonMiddleware = new CommonMiddleware();
