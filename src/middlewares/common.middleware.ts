import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!isObjectIdOrHexString(req.params[key])) {
        throw new ApiError("Id is not valid", 409);
      }
      next();
    };
  }

  // public isBodyValid(
  //   schema: ObjectSchema,
  //   property: "body" | "query" = "body",
  // ) {
  //   (req: Request, res: Response, next: NextFunction) => {
  //     const { error } = schema.validate(req[property]);
  //   };
  // }
}
export const commonMiddleware = new CommonMiddleware();
