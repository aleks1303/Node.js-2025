import bcrypt from "bcrypt";

import { passwordRepository } from "../repositories/password.repository";

class PasswordService {
  public async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  public async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // public async isPasswordValid(userId: string, days: number): Promise<boolean> {
  //   const oldDate = new Date();
  //   oldDate.setDate(oldDate.getDate() - days);
  //
  //   const passwords = await passwordRepository.findOldPasswords(
  //     userId,
  //     oldDate,
  //   );
  //   return passwords.length > 0;
  // }

  public async isPasswordValid(
    userId: string,
    newPassword: string,
    days: number,
  ): Promise<boolean> {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - days);

    const oldPasswords = await passwordRepository.findOldPasswords(
      userId,
      oldDate,
    );

    for (const password of oldPasswords) {
      const isCorrectPassword = await bcrypt.compare(
        newPassword,
        password.password,
      );
      if (isCorrectPassword) {
        return true;
      }
    }

    return false;
  }
}
export const passwordService = new PasswordService();
