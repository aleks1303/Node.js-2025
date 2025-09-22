import { User } from "../models/user.model";

class UserRepository {
  public async getAllUsers() {
    return await User.find({});
  }
}
export const userRepository = new UserRepository();
