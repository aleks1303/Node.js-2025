// import { NextFunction } from "express";
// import { isObjectIdOrHexString } from "mongoose";
//
// import { ApiError } from "../errors/api.error";
//
// export class CommonMiddleware {
//   public isIdValid(key: string) {
//     return (req: Request, res: Response, next: NextFunction) => {
//       if (!isObjectIdOrHexString(req.body[key])) {
//         throw new ApiError("Id is not valid", 400);
//       }
//     };
//   }
// }
