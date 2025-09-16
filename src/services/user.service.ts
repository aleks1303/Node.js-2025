import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

// class UserService {
//   public async getUsers(): Promise<IUser[]> {
//     return await userRepository.getUsers();
//   }
//   public async create(dto: Partial<any>): Promise<any> {
//     return await userRepository.create(dto);
//   }
// }
// export const userService = new UserService();

//через функції
export const userService = {
  getUsers: async (): Promise<IUser[]> => {
    return await userRepository.getUsers();
  },
  create: async (dto: Partial<IUser>): Promise<IUser> => {
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
    return await userRepository.create(dto);
  },
  getUserByID: async (userId: number): Promise<IUser> => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  },
};
