import { RoleEnum } from "../enums/user.enum";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  phone?: string;
  role: RoleEnum;
  isVerified: boolean;
  isDeleted: boolean;
  createAt: Date;
  updateAt: Date;
}

export type ISignIn = Pick<IUser, "email" | "password">;
