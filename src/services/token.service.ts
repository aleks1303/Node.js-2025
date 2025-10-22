import jwt, { SignOptions } from "jsonwebtoken";

import { configs } from "../configs/config";
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
}
export const tokenService = new TokenService();
