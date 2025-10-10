import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/user.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: false },
    role: { type: String, enum: RoleEnum, default: RoleEnum.USER },
    isVerified: { type: Boolean, require: false },
    isDeleted: { type: Boolean, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const User = model<IUser>("users", userSchema);
