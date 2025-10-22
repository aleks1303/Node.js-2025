import { ITokenPair } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";

export type UserWithToken = {
  user: IUser;
  tokens: ITokenPair;
};
