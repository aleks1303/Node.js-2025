import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("Header is provided", 401);
      }
    } catch (e) {
      next(e);
    }
  }
}
export const authMiddleware = new AuthMiddleware();
