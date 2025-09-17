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
    return users.find((user: IUser) => user.id === userId);
  },
  update: async (userId: number, dto: Partial<IUser>): Promise<IUser> => {
    const users = await read();
    const user = users.findIndex((user: IUser) => user.id === userId);
    users[user].name = dto.name;
    users[user].age = dto.age;
    users[user].email = dto.email;
    users[user].password = dto.password;
    await write(users);
    return users[user];
  },
};
