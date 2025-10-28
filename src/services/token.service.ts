import jwt, { SignOptions } from "jsonwebtoken";

import { configs } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { TokenEnum } from "../enums/token.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateToken(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.JWT_ACCESS_EXPIRATION,
    } as SignOptions);
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: configs.JWT_REFRESH_EXPIRATION,
    } as SignOptions);
    return { accessToken, refreshToken };
  }

  public verifyToken(token: string, type: TokenEnum): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case TokenEnum.ACCESS:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case TokenEnum.REFRESH:
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      console.error(e);
      throw new ApiError("Token is not valid", 401);
    }
  }

  public generateActionToken(
    payload: ITokenPayload,
    tokenType: ActionTokenTypeEnum,
  ): string {
    let secret: string;
    let expiresIn: string;

    switch (tokenType) {
      case ActionTokenTypeEnum.FORGOT_PASSWORD:
        secret = configs.JWT_ACTION_FORGOT_PASSWORD_SECRET;
        expiresIn = configs.JWT_ACTION_FORGOT_PASSWORD_EXPIRATION;
        break;
      case ActionTokenTypeEnum.VERIFY_EMAIL:
        secret = configs.JWT_ACTION_VERIFY_SECRET;
        expiresIn = configs.JWT_ACTION_VERIFY_EXPIRATION;
        break;
      default:
        throw new ApiError("Invalid token type", 400);
    }
    return jwt.sign(payload, secret, {
      expiresIn,
    } as SignOptions);
  }

  public verifyActionToken(
    actionToken: string,
    type: ActionTokenTypeEnum,
  ): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case ActionTokenTypeEnum.FORGOT_PASSWORD:
          secret = configs.JWT_ACTION_FORGOT_PASSWORD_SECRET;
          break;
        case ActionTokenTypeEnum.VERIFY_EMAIL:
          secret = configs.JWT_ACTION_VERIFY_SECRET;
          break;
        default:
          throw new ApiError("Invalid token type", 400);
      }
      return jwt.verify(actionToken, secret) as ITokenPayload;
    } catch (e) {
      console.error(e);
      throw new ApiError("Token is not valid", 401);
    }
  }
}
export const tokenService = new TokenService();
