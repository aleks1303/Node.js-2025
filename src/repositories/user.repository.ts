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

  public async update(userId: string, dto: IUser): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto);
  }

  public async deleteById(userId: string): Promise<void> {
    return await User.findByIdAndDelete(userId);
  }

  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email }).select("+password");
  }
}
export const userRepository = new UserRepository();
