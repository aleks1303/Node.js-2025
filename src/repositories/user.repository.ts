import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getAllUsers(): Promise<IUser[]> {
    return await User.find();
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
  public async deleteById(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }
  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email }).select("+password");
  }
}
export const userRepository = new UserRepository();
