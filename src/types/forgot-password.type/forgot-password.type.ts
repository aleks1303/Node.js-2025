import { IUser } from "../../interfaces/user.interface";

export type ForgotPasswordSend = Pick<IUser, "email">;
export type ForgotPasswordSet = Pick<IUser, "password"> & {
  token: string;
};
