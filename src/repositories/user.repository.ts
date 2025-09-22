import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getAllUsers(): Promise<IUser[]> {
    return await User.find({});
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }

  public async getUserById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }
}
export const userRepository = new UserRepository();
