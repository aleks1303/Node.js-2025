import { NextFunction, Request, Response } from "express";

import { userController } from "../controllers/user.controller";

class UserService {
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    return await userController.getAllUsers();
  }
}
export const userService = new UserService();
