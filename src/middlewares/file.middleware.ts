import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { avatarConfig } from "../configs/avatar.config";
import { ApiError } from "../errors/api.error";

class FileMiddleware {
  public isFileValid() {
    const { maxSize, mimes } = avatarConfig;
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.files || !req.files.avatar) {
          throw new ApiError("File is not exist", 400);
        }
        const file = req.files.avatar as UploadedFile;
        if (file.size > maxSize) {
          throw new ApiError("large file allowed up to 5Mb", 400);
        }
        if (!mimes.includes(file.mimetype)) {
          throw new ApiError(
            `invalid file type, require ${mimes.join(", ")}`,
            400,
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const fileMiddleware = new FileMiddleware();
