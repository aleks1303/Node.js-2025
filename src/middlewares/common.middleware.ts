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
}
export const commonMiddleware = new CommonMiddleware();
