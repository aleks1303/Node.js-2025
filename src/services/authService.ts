import { IUser } from "../interfaces/user.interface";
import { authRepository } from "../repositories/authRepository";
import { passwordService } from "./password.service";

class AuthService {
  public async createMe(dto: Partial<IUser>): Promise<IUser> {
    const password = await passwordService.hashPassword(dto.password);
    return await authRepository.createMe({ ...dto, password });
  }
}
export const authService = new AuthService();
