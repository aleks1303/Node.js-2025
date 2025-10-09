import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 400);
    }
    return user;
  }

  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload._userId);
    if (!user) {
      throw new ApiError("User not found", 400);
    }
    return user;
  }

  public async updateMe(jwtPayload: ITokenPayload, dto: IUser) {
    const user = await userRepository.updateMe(jwtPayload._userId, dto);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
    return await userRepository.deleteById(jwtPayload._userId);
  }

  public async deleteById(userId: string): Promise<void> {
    return await userRepository.deleteById(userId);
  }
}
export const userService = new UserService();
