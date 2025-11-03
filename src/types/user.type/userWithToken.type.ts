import { IPassword } from "../../interfaces/password.interface";
import { ITokenPair } from "../../interfaces/token.interface";
import { IUser } from "../../interfaces/user.interface";

export type UserWithToken = {
  user: IUser;
  tokens: ITokenPair;
};
export type UserWithTokenAndPassword = {
  user: IUser;
  tokens: ITokenPair;
  password: IPassword;
};
