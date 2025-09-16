import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

// class UserController {
//   public async getUsers(req: Request, res: Response, next: NextFunction) {
//     try {
//       const result = await userService.getUsers();
//       res.json(result);
//     } catch (e) {
//       next(e);
//     }
//   }
//   public async create(req: Request, res: Response, next: NextFunction) {
//     try {
//       const dto = req.body as IUser;
//       const result = await userService.create(dto);
//       res.status(201).json(result);
//     } catch (e) {
//       next(e);
//     }
//   }
// }
// export const userController = new UserController();

export const userController = {
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.getUsers();
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as IUser;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  },
  getUserByID: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const result = await userService.getUserByID(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
};
