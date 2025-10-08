import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { authRepository } from "../repositories/auth.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";

class AuthService {
  public async signUp(dto: Partial<IUser>): Promise<IUser> {
    await this.isEmailExist(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    return await authRepository.signUp({ ...dto, password });
  }

  public async signIn() {}

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exists", 409);
    }
  }
}
export const authService = new AuthService();
