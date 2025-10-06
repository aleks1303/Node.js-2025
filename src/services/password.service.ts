import bcrypt from "bcrypt";

class PasswordService {
  public async hashPassword(password: string): Promise<string> {
    await bcrypt.hash(password, 10);
    return password;
  }
}
export const passwordService = new PasswordService();
