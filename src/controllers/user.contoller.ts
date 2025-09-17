import { NextFunction, Request, Response } from "express";

export const userController = {
  getAllUsers: async (res: Response, req: Request, next: NextFunction) => {
    const users = await userService.getAllUsers();
    res.json(users);
  },
};
