import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";
import { SignIn } from "../types/user.type/singIn";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const user = await authService.signUp(dto);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async singIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as SignIn;
      const accessToken = req.res.locals.accessToken as string;
      const refreshToken = req.res.locals.refreshToken as string;
      const { user, tokens } = await authService.SignIn(
        dto,
        accessToken,
        refreshToken,
      );
      res.status(201).json({ user, tokens });
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.res.locals.refreshToken as string;
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const user = await authService.refresh(refreshToken, jwtPayload);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload;
      const refreshToken = req.res.locals.refreshToken as string;
      await authService.logout(jwtPayload.userId, refreshToken);
      res.status(200).json({ message: "You logout" });
    } catch (e) {
      next(e);
    }
  }
  public async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.res.locals.refreshToken as string;
      await authService.logoutAll(refreshToken);
      res.status(200).json({ message: "You logout all devices" });
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
