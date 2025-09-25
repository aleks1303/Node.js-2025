import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    const password = await passwordService.hashPassword(dto.password);
    return await userRepository.create({ ...dto, password });
  }

  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async update(userId: string, dto: IUser) {
    return await userRepository.update(userId, dto);
  }

  public async deleteById(userId: string): Promise<void> {
    return await userRepository.deleteById(userId);
  }
}
export const userService = new UserService();
