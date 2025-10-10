import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { authRepository } from "../repositories/auth.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";

class AuthService {
  public async signUp(dto: Partial<IUser>): Promise<IUser> {
    await authService.isEmailExist(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    return await authRepository.signUp({ ...dto, password });
  }

  private async isEmailExist(email: string): Promise<IUser> {
    const user = await userRepository.getByEmail(email);
    if (email) {
      throw new ApiError("Email already exist", 409);
    }
    return user;
  }
}
export const authService = new AuthService();
