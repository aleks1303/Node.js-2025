import { IUser } from "../interfaces/user.interface";
import { read } from "../services/fs.service";

class UserRepository {
  public async getAllUsers(): Promise<IUser[]> {
    return await read();
  }
}

export const userRepository = new UserRepository();
