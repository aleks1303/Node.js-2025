import { NextFunction, Request, Response } from "express";

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
}
export const userController = new UserController();
