import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";
import { SignIn } from "../types/user-types/signIn";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const user = await authService.signUp(dto);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as SignIn;
      const user = await authService.SignIn(dto);
      res.status(201).send(user);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshTokenOld = req.headers.authorization.split(" ")[1];
      const tokens = await authService.refresh(refreshTokenOld);
      res.json(tokens);
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
