import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/tokenRepository";
import { userRepository } from "../repositories/user.repository";
import { SignIn } from "../types/user.type/singIn";
import { UserWithToken } from "../types/user.type/userWithToken.type";
import { emailService } from "./email.service";
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

  public async SignIn(
    dto: SignIn,
    accessToken: string,
    refreshToken: string,
  ): Promise<UserWithToken> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid is credentials", 401);
    }
    await tokenRepository.deleteByParams({ accessToken, refreshToken });
    const tokens = tokenService.generateToken({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.createToken({ ...tokens, _userId: user._id });
    await emailService.sendMail("aleksbulda13@gmail.com");
    return { user, tokens };
  }

  public async refresh(
    refreshToken: string,
    payload: ITokenPayload,
  ): Promise<ITokenPair> {
    await tokenRepository.deleteByParams({ refreshToken });
    const tokens = tokenService.generateToken({
      userId: payload.userId,
      role: payload.role,
    });
    await tokenRepository.createToken({ ...tokens, _userId: payload.userId });

    return tokens;
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
