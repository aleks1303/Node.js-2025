import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!isObjectIdOrHexString(req.params[key])) {
        throw new ApiError("Id Invalid", 400);
      }
    };
  }

  // public isValidBody(
  //   schema: ObjectSchema,
  //   property: "body" | "query" | "params" = "body",
  // ) {
  //   (req: Request, res: Response, next: NextFunction) => {
  //     const {error} = schema.validate(req{property});
  //
  //   };
  // }
}
export const commonMiddleware = new CommonMiddleware();
