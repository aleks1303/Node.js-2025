import { ITokenPair } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";

export interface IUserWithTokens {
  user: IUser;
  tokens: ITokenPair;
}
