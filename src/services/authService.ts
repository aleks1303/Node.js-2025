import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";

class AuthService {
  public async createMe(dto: Partial<IUser>, password: string): Promise<IUser> {
    const password = await passwordService.hashPassword(password);
    const user = await userRepository.createMe({ ...dto, password });
    return { user, password };
  }
}
export const authService = new AuthService();
