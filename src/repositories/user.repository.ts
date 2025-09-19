import { IUser } from "../interfaces/user.interface";
import { read } from "../services/fs.service";

class UserRepository {
  public async getAllUsers(): Promise<IUser[]> {
    return await read();
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    const users = await read();
    const newUser = {
    }

  }
}

export const userRepository = new UserRepository();
