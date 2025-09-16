import { IUser } from "../interfaces/user.interface";
import { read, write } from "../services/fs.service";

class UserRepository {
  public async getUsers(): Promise<IUser[]> {
    return await read();
  }
  public async create(dto: Partial<IUser>): Promise<IUser> {
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
  }
  public async getUserById(userId: number): Promise<IUser> | null {
    const users = await read();
    return users.find((user) => user.id === userId);
  }
}
export const userRepository = new UserRepository();

//через функції
// export const userRepository = {
//   getList: async () => {},
//   create: async (dto: Partial<any>) => {},
// };
