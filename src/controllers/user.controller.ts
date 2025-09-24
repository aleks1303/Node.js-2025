import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.sevice";

class UserController {
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const user = await userService.createUser(dto);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
