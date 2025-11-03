import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { ChangePassword } from "../types/change.password.type/change.password";
import {
  ForgotPasswordSend,
  ForgotPasswordSet,
} from "../types/forgot-password.type/forgot-password.type";
import { SignIn } from "../types/user.type/singIn";
import { UserWithToken } from "../types/user.type/userWithToken.type";
import { VerifyType } from "../types/verify.type/verify.type";
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
    const actionToken = tokenService.generateActionToken(
      {
        userId: user._id,
        role: user.role,
      },
      ActionTokenTypeEnum.FORGOT_PASSWORD,
    );
    await tokenRepository.createToken({ ...tokens, _userId: user._id });
    await emailService.sendMail(EmailTypeEnum.WELCOME, user.email, {
      name: user.name,
      email: user.email,
      actionToken: actionToken,
    });
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

  public async logout(userId: string, refreshToken: string): Promise<void> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    await tokenRepository.logout({ refreshToken });
    await emailService.sendMail(EmailTypeEnum.LOGOUT, user.email, {
      name: user.name,
    });
  }

  public async logoutAll(refreshToken: string): Promise<void> {
    return await tokenRepository.logoutAll({ refreshToken });
  }

  public async forgotPasswordSendEmail(dto: ForgotPasswordSend): Promise<void> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    const actionToken = tokenService.generateActionToken(
      {
        userId: user._id,
        role: user.role,
      },
      ActionTokenTypeEnum.FORGOT_PASSWORD,
    );
    await actionTokenRepository.create({
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
      _userId: user._id,
      actionToken,
    });
    await emailService.sendMail(EmailTypeEnum.FORGOT_PASSWORD, user.email, {
      name: user.name,
      email: user.email,
      actionToken: actionToken,
    });
  }

  public async forgotPasswordSet(
    dto: ForgotPasswordSet,
    jwtPayload: ITokenPayload,
  ) {
    const password = await passwordService.hashPassword(dto.password);
    await userRepository.updateById(jwtPayload.userId, { password });
    await actionTokenRepository.deleteManyByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
    });
    await tokenRepository.deleteByParams({ _userId: jwtPayload.userId });
  }

  public async changePassword(jwtPayload: ITokenPayload, dto: ChangePassword) {
    const user = await userRepository.getById(jwtPayload.userId);
    const isPasswordCorrect = await passwordService.comparePassword(
      user.password,
      dto.oldPassword,
    );
    if (isPasswordCorrect) {
      throw new ApiError("Invalid previous password", 400);
    }
    const password = await passwordService.hashPassword(dto.password);
    await userRepository.updateById(jwtPayload.userId, { password });
    await tokenRepository.deleteManyByParams({ _userId: jwtPayload.userId });
  }

  public async verify(dto: VerifyType) {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    const verifyToken = tokenService.generateActionToken(
      {
        userId: user._id,
        role: user.role,
      },
      ActionTokenTypeEnum.VERIFY_EMAIL,
    );
    await actionTokenRepository.create({
      type: ActionTokenTypeEnum.VERIFY_EMAIL,
      _userId: user._id,
      actionToken: verifyToken,
    });

    await emailService.sendMail(EmailTypeEnum.WELCOME, user.email, {
      email: user.email,
      name: user.name,
      actionToken: verifyToken,
    });
  }

  public async verifyTokenEmail(token: string): Promise<void> {
    const tokenData = await actionTokenRepository.findByParams({
      actionToken: token,
      type: ActionTokenTypeEnum.VERIFY_EMAIL,
    });
    await userRepository.updateById(tokenData._userId, { isVerified: true });
    await actionTokenRepository.deleteManyByParams({ actionToken: token });
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
