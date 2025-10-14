import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { SignIn } from "../types/SignIn";
import { UserWithTokens } from "../types/UserWithTokens";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(dto: Partial<IUser>): Promise<UserWithTokens> {
    await this.isEmailExist(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.signUp({ ...dto, password });
    const tokens = tokenService.generateToken({
      _userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async signIn(dto: SignIn): Promise<UserWithTokens> {
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

    await tokenRepository.deleteByParams({ _userId: user._id });
    const tokens = tokenService.generateToken({
      _userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async refresh(refreshTokenOld: string): Promise<UserWithTokens> {
    const payload = tokenService.verifyToken(
      refreshTokenOld,
      TokenTypeEnum.REFRESH,
    );
    const pair = await tokenRepository.findByParams({
      refreshToken: refreshTokenOld,
    });
    if (!pair) {
      throw new ApiError("Token is not valid", 401);
    }

    const user = await userRepository.getById(payload._userId);
    await tokenRepository.deleteByParams({ refreshToken: refreshTokenOld });
    const tokens = tokenService.generateToken({
      _userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exists", 409);
    }
  }
}
export const authService = new AuthService();
