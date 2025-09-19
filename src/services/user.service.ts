import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError("Name is wrong", 400);
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is wrong", 400);
    }
    if (!dto.age || dto.age === 0) {
      throw new ApiError("Age is wrong", 400);
    }
    if (!dto.password || dto.password.length < 4) {
      throw new ApiError("Password is wrong", 400);
    }
    return await userRepository.createUser(dto);
  }

  public async getUserById(userId: number): Promise<IUser> {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new ApiError("Not found", 404);
    }
    return user;
  }

  public async updateUser(userId: number, dto: Partial<IUser>): Promise<IUser> {
    const user = await userRepository.updateUser(userId, dto);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
}

export const userService = new UserService();
