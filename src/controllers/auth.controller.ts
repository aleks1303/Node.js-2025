import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const user = await authService.signUp(dto);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async signIn() {}
}
export const authController = new AuthController();
