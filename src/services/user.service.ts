import { NextFunction, Request, Response } from "express";

class UserService {
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      return await userRepository.getAllUsers();
    } catch (e) {
      next(e);
    }
  }
}
export const userService = new UserService();
