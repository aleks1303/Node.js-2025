import { IUser } from "../interfaces/user.interface";
import { read } from "../services/fs.sevices";

export const userRepository = {
  getAllUsers: async (): Promise<IUser[]> => {
    return await read();
  },
  create: () => {},
};
