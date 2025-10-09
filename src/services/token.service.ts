import jwt, { SignOptions } from "jsonwebtoken";

import { config } from "../configs/config";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateToken(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_EXPIRATION,
    } as SignOptions);
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRATION,
    } as SignOptions);
    return { accessToken, refreshToken };
  }

  public verifyToken(token: string) {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET) as ITokenPayload;
    } catch (e) {
      throw new ApiError(e.message, 409);
    }
  }
}
export const tokenService = new TokenService();
