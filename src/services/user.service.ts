import { UploadedFile } from "express-fileupload";

import { FileItemTypeEnum } from "../enums/fiile-item-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import {
  IUser,
  IUserListQuery,
  IUserListResponse,
} from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async getAllUsers(query: IUserListQuery): Promise<IUserListResponse> {
    const [entities, total] = await userRepository.getAllUsers(query);
    return userPresenter.toListResDto(entities, total, query);
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
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    await userRepository.deleteById(jwtPayload.userId);
  }

  public async uploadAvatar(
    jwtPayload: ITokenPayload,
    file: UploadedFile,
  ): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);
    const oldFilePath = user.avatar;
    const avatar = await s3Service.uploadFile(
      file,
      FileItemTypeEnum.USER,
      user._id,
      oldFilePath,
    );
    return await userRepository.updateById(user._id, { avatar });
  }

  public async deleteAvatar(jwtPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user.avatar) {
      throw new ApiError("User not have an avatar", 400);
    }
    await s3Service.deleteFile(user.avatar);
    await userRepository.updateById(user._id, { avatar: null });
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
  public async deleteById(userId: string): Promise<void> {
    await userRepository.deleteById(userId);
  }
}
export const userService = new UserService();
