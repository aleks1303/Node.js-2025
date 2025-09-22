import { RoleEnum } from "../enums/user.enum";

export interface IUser {
  _id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  enum?: RoleEnum;
}
