import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findOne({ _id: userId });
  }

  public async deleteById(userId: string): Promise<void> {
    return await User.findByIdAndDelete(userId);
  }

  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email }).select("+password");
  }
}
export const userRepository = new UserRepository();
