import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req.params[key])) {
          throw new ApiError("Invalid Id", 400);
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
      const { error } = schema.validate(req[property]);
      try {
        if (error) {
          throw new ApiError("InValid Body", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const commonMiddleware = new CommonMiddleware();
