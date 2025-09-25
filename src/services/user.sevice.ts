import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }

  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be at least 3 characters long",
        400,
      );
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }
    if (!dto.password || dto.password.length < 6) {
      throw new ApiError(
        "Password is required and should be at least 6 characters long",
        400,
      );
    }
    return await userRepository.createUser(dto);
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 400);
    }
    return user;
  }

  public async update(userId: string, dto: IUser) {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be at least 3 characters long",
        400,
      );
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }
    if (!dto.password || dto.password.length < 6) {
      throw new ApiError(
        "Password is required and should be at least 6 characters long",
        400,
      );
    }
    return await userRepository.update(userId, dto);
  }

  public async deleteById(userId: string): Promise<void> {
    return await userRepository.deleteById(userId);
  }
}
export const userService = new UserService();
