import { IPassword } from "../interfaces/password.interface";
import { Password } from "../models/password.model";

class PasswordRepository {
  public async createPassword(dto: Partial<IPassword>): Promise<IPassword> {
    return await Password.create(dto);
  }
}
export const passwordRepository = new PasswordRepository();
