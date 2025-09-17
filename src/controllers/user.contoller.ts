import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

export const userController = {
  getAllUsers: async (res: Response, req: Request, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  },
};
