import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  }
  public async signUp(dto: Partial<IUser>) {
    return await User.create(dto);
  }
  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }
  public async deleteById(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }
}
export const userRepository = new UserRepository();
