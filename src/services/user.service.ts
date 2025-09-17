import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

export const userService = {
  getAllUsers: async (): Promise<IUser[]> => {
    return await userRepository.getAllUsers();
  },
};
