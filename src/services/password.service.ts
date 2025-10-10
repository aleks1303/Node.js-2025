import bcrypt from "bcrypt";

class PasswordService {
  public hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
export const passwordService = new PasswordService();
