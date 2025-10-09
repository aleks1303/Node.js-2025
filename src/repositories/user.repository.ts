import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  }

  public async signUp(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select("+password");
  }

  // public async updateMe(dto: Partial<IUser>, userId: string): Promise<IUser> {
  //   return await User.findByIdAndUpdate(dto, userId, { new: true });
  // }

  public async deleteById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}
export const userRepository = new UserRepository();
