// import jwt from "jsonwebtoken";
//
// import { config } from "../configs/config";
// import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
//
// class TokenService {
//   public generateToken(payload: ITokenPayload): ITokenPair {
//     const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET as string, {
//       expiresIn: config.JWT_ACCESS_EXPIRATION as string,
//     });
//     const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
//       expiresIn: config.JWT_REFRESH_EXPIRATION,
//     });
//     return { accessToken, refreshToken };
//   }
// }
// export const tokenService = new TokenService();
