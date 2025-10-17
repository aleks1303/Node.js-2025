import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }
  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }
  public async deleteById(userId: string): Promise<void> {
    return await userRepository.deleteById(userId);
  }
}
export const userService = new UserService();
