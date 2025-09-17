import { NextFunction, Request, Response } from "express";

import { read, write } from "../services/fs.sevices";
import { userService } from "../services/user.service";

export const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction, dto) => {
    try {
      const users = await userService.create(dto);

      return res.status(201).send(newUser);
    } catch (e) {
      next(e);
    }
  },
};
