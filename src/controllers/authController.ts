import { NextFunction, Request, Response } from "express";

import { authService } from "../services/authService";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      const user = await authService.signUp(dto);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
