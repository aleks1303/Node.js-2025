import { OrderEnum } from "../enums/order.enum";
import { RoleEnum } from "../enums/user.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";

export interface IUser {
  _id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role: RoleEnum;
  isVerified: boolean;
  isDeleted: boolean;
  createAt: Date;
  updateAt: Date;
}

export interface IUserListQuery {
  limit?: number;
  page?: number;
  search?: string;
  order?: OrderEnum;
  orderBy?: UserListOrderByEnum;
}

export type IUserResponse = Pick<
  IUser,
  | "_id"
  | "name"
  | "email"
  | "age"
  | "role"
  | "avatar"
  | "isDeleted"
  | "isVerified"
>;

export interface IUserListResponse {
  data: IUserResponse[];
  total: number;
  query?: IUserListQuery;
}
