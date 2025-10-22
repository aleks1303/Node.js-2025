import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/tokenRepository";
import { userRepository } from "../repositories/user.repository";
import { UserWithToken } from "../types/userWithToken.type";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(dto: Partial<IUser>): Promise<UserWithToken> {
    await this.isEmailExist(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.signUp({ ...dto, password });
    const tokens = tokenService.generateToken({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.createToken({ ...tokens, _userId: user._id });

    return { user, tokens };
  }

  private async isEmailExist(email: string): Promise<IUser> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exist", 401);
    }
    return user;
  }
}
export const authService = new AuthService();
