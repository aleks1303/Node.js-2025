import { RoleEnum } from "../enums/user.enum";

export interface IUser {
  _id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  phone?: string;
  role: RoleEnum;
  createAt: Date;
  updateAt: Date;
}
