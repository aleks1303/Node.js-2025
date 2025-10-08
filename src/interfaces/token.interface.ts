import { RoleEnum } from "../enums/user.enum";

export interface IToken {
  _id: string;
  accessToken: string;
  refreshToken: string;
  _userId: string;
}

export interface ITokenPayload {
  _userId: string;
  role: RoleEnum;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
