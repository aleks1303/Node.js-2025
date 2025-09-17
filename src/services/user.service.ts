import { ApiError } from "../errors/user.error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

export const userService = {
  getAllUsers: async (): Promise<IUser[]> => {
    return await userRepository.getAllUsers();
  },
  create: async (dto: Partial<IUser>): Promise<any> => {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError("Name is wrong", 400);
    }
    if (dto.age <= 0 || dto.age > 120) {
      throw new ApiError("Age is wrong", 400);
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is wrong", 400);
    }
    if (!dto.password || dto.password.length < 6) {
      throw new ApiError("Password is wrong", 400);
    }
    return userRepository.create;
  },
};
