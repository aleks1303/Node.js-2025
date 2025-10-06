import { model, Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: false },
    isVerified: { type: Boolean, required: false },
    isDeleted: { type: Boolean, required: false },
    createAt: { type: String, required: false },
    updateAt: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const User = model<IUser>("users", userSchema);
