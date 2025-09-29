import { NextFunction, Request, Response } from "express";

import { ISignIn, IUser } from "../interfaces/user.interface";
import { authService } from "../services/auth.sevice";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const user = await authService.singUp(dto);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ISignIn;
      const user = await authService.singIn(dto);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
