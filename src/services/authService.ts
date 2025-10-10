import { IUser } from "../interfaces/user.interface";
import { authRepository } from "../repositories/auth.repository";
import { passwordService } from "./password.service";

class AuthService {
  public async signUp(dto: Partial<IUser>): Promise<IUser> {
    const password = await passwordService.hashPassword(dto.password);
    return await authRepository.signUp({ ...dto, password });
  }
}
export const authService = new AuthService();
