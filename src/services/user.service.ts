import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      console.log("Name is wrong");
    }
    if (!dto.email || dto.email.includes("@")) {
      console.log("Email is wrong");
    }
    if (!dto.age || dto.age === 0) {
      console.log("Age is wrong");
    }
    if (!dto.password || dto.password.length < 4) {
      console.log("Password is wrong");
    }
    return await userRepository.createUser(dto);
  }

  public async getUserByID(userId: number): Promise<IUser> {

   if (!user) {

   }
  }
}

export const userService = new UserService();
