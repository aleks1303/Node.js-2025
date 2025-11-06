import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api.error";

class FileMiddleware {
  private maxSize = 5 * 1024 * 1024;
  private mimes = ["image/jpeg", "image/png", "image/jpg"];
  public isFileValid = () => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.files || !req.files.avatar) {
          throw new ApiError("File is not exist", 400);
        }
        const file = req.files.avatar as UploadedFile;
        if (file.size > this.maxSize) {
          throw new ApiError("large file allowed up to 5Mb", 400);
        }
        if (!this.mimes.includes(file.mimetype)) {
          throw new ApiError(`invalid file type, require${this.mimes}`, 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  };
}
export const fileMiddleware = new FileMiddleware();
