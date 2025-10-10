import { IUser } from "../interfaces/user.interface";

class UserController {
  public async getAllUsers(): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }
}

export const userController = new UserController();
