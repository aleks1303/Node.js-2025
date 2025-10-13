import { ITokenPair } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";

export type IUserWithTokens = {
  user: IUser;
  tokens: ITokenPair;
};
