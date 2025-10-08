import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class AuthRepository {
  public async signUp(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }
}
export const authRepository = new AuthRepository();
