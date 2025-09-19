import { IUser } from "../interfaces/user.interface";
import { read, write } from "../services/fs.service";

class UserRepository {
  public async getAllUsers(): Promise<IUser[]> {
    return await read();
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
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
  public async getUserById(userId: number): Promise<IUser> {
    const users = await read();
    return users.find((user: IUser) => user.id === userId);
  }

  public async updateUser(userId: number, dto: Partial<IUser>): Promise<IUser> {
    const users = await read();
    const user = users.findIndex((user: IUser) => user.id === userId);
    users[user].name = dto.name;
    users[user].age = dto.age;
    users[user].email = dto.email;
    users[user].password = dto.password;
    users.push(users[user]);
    await write(users);
    return users[user];
  }
}

export const userRepository = new UserRepository();
