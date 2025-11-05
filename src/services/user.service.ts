import { UploadedFile } from "express-fileupload";

import { FileItemTypeEnum } from "../enums/fiile-item-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }

  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async updateMe(jwtPayload: ITokenPayload, dto: IUser): Promise<IUser> {
    return await userRepository.updateById(jwtPayload.userId, dto);
  }

  public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
    return await userRepository.deleteById(jwtPayload.userId);
  }

  public async uploadAvatar(
    jwtPayload: ITokenPayload,
    file: UploadedFile,
  ): Promise<IUser> {
    const avatar = await s3Service.uploadFile(
      file,
      FileItemTypeEnum.USER,
      jwtPayload.userId,
    );
    console.log(avatar);
    return await userRepository.getById(jwtPayload.userId);
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
  public async deleteById(userId: string): Promise<void> {
    return await userRepository.deleteById(userId);
  }
}
export const userService = new UserService();
