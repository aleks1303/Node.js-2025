import jwt, { SignOptions } from "jsonwebtoken";

import { config } from "../configs/config";
import { TokenTypeEnum } from "../enums/token.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateToken(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_EXPIRATION,
    } as SignOptions);
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_ACCESS_EXPIRATION,
    } as SignOptions);
    return { accessToken, refreshToken };
  }

  public verifyToken(token: string, type: TokenTypeEnum): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case TokenTypeEnum.ACCESS:
          secret = config.JWT_ACCESS_SECRET;
          break;
        case TokenTypeEnum.REFRESH:
          secret = config.JWT_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      console.error(e);
      throw new ApiError("Token invalid", 401);
    }
  }
}
export const tokenService = new TokenService();
