import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";

class AuthService {
  public async signUp(dto: Partial<IUser>): Promise<IUser> {
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.signUp({ ...dto, password });
    return user;
  }
}
export const authService = new AuthService();
