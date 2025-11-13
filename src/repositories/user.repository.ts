import { FilterQuery } from "mongoose";

import { OrderEnum } from "../enums/order.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";
import { IUser, IUserListQuery } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getAllUsers(query: IUserListQuery): Promise<[IUser[], number]> {
    const filterObj: FilterQuery<IUser> = {};
    if (query.search) {
      filterObj.name = { $regex: query.search };
    }
    const skip = query.limit * (query.page - 1);
    let sort: Record<string, 1 | -1> = {};
    switch (query.orderBy) {
      case UserListOrderByEnum.NAME:
        sort = { name: query.order === OrderEnum.DESC ? -1 : 1 };
        break;
      case UserListOrderByEnum.AGE:
        sort = { age: query.order === OrderEnum.DESC ? -1 : 1 };
        break;
      default:
        sort = { createAt: -1 };
        break;
    }
    return await Promise.all([
      User.find(filterObj).sort(sort).limit(query.limit).skip(skip),
      User.countDocuments(filterObj),
    ]);
  }
  public async signUp(dto: Partial<IUser>) {
    return await User.create(dto);
  }
  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }
  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId).select("+password");
  }
  public async deleteById(userId: string): Promise<IUser> {
    return await User.findByIdAndDelete(userId);
  }
  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email }).select("+password");
  }
}
export const userRepository = new UserRepository();
