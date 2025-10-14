import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { SignIn } from "../types/signIn";
import { UserWithTokens } from "../types/userWithTokens";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(dto: Partial<IUser>): Promise<UserWithTokens> {
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

  public async SignIn(dto: SignIn): Promise<UserWithTokens> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }
    const tokens = tokenService.generateToken({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.createToken({ ...tokens, _userId: user._id });

    return { user, tokens };
  }

  public async refresh(refreshTokenOld: string) {}

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exist", 409);
    }
  }
}
export const authService = new AuthService();
