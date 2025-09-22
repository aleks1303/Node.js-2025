import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAllUsers() {
    return await userRepository.getAllUsers();
  }
}
export const userService = new UserService();
