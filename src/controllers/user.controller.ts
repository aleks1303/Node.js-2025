import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

class UserController {
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getAllUsers();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async createUser (req: Request, res: Response, next: NextFunction) {
    try {
      const dto = await req.body;


    } catch (e) {}
  }
}

export const userController = new UserController();
