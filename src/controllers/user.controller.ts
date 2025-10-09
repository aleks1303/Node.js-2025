import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

class UserController {
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const user = await userService.getById(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  // public async updateMe(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const dto = req.body as IUser;
  //     const userId = req.params.userId;
  //     const user = await userService.updateMe(dto, userId);
  //     res.json(user);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      await userService.deleteById(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
