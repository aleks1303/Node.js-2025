import { IUser } from "../interfaces/user.interface";
import { read, write } from "../services/fs.sevices";

export const userRepository = {
  getAllUsers: async (): Promise<IUser[]> => {
    return await read();
  },
  create: async (dto: Partial<IUser>) => {
    const users = await read();
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name: dto.name,
      age: dto.age,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await write(users);
    return newUser;
  },
  getUserById: async (userId: number): Promise<IUser> | null => {
    const users = await read();
    return users.find(user => user.id === userId);
  },
};
