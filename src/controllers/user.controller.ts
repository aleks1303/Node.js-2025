import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
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

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const user = await userService.createUser(dto);
      res.status(201).json(user);
      return user;
    } catch (e) {
      next(e);
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const user = await userService.getUserById(userId);
      res.status(200).json(user);
      return user;
    } catch (e) {
      next(e);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const dto = req.body;
      const user = await userService.updateUser(userId, dto);
      res.status(201).json(user);
      return user;
    } catch (e) {
      next(e);
    }
  }

  // public async deleteUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const userId = Number(req.params.userId);
  //     const user = await userService.deleteUser(userId);
  //     res.status(204).json(user);
  //     return user;
  //   } catch (e) {
  //     next(e);
  //   }
  //}
}

export const userController = new UserController();
