import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async createToken(dto: Partial<IToken>): Promise<IToken> {
    return await Token.create(dto);
  }
  public async deleteByParams(params: Partial<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }
}
export const tokenRepository = new TokenRepository();
