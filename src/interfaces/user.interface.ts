import { RoleEnum } from "../enums/user.enum";

export interface IUser {
  _id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  phone?: string;
  role: RoleEnum;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updateAt: Date;
}
