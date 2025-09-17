import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
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
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as IUser;
      const users = await userService.create(dto);
      res.status(201).json(users);
    } catch (e) {
      next(e);
    }
  },
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const result = await userService.getUserById(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const dto = req.body;
      const result = await userService.update(userId, dto);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const result = await userService.delete(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
};
