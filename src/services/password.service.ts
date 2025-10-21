import bcrypt from "bcrypt";

import { IUser } from "../interfaces/user.interface";

class PasswordService {
  public hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  public comparePassword(hashedPassword: string, dto: Partial<IUser>) {
    return bcrypt.compare(dto.password, hashedPassword);
  }
}
export const passwordService = new PasswordService();
