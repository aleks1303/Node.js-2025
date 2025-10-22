import { ITokenPair } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";

export type UserWithTokenType = {
  user: IUser;
  tokens: ITokenPair;
};
