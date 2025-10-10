import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async deleteById(userId: string): Promise<void> {
    await userRepository.deleteById(userId);
  }
}
export const userService = new UserService();
