import { ITokenPair } from "../../interfaces/token.interface";
import { IUser } from "../../interfaces/user.interface";

export type UserWithTokens = {
  user: IUser;
  tokens: ITokenPair;
};
