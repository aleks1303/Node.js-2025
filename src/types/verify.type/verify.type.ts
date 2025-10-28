import { IUser } from "../../interfaces/user.interface";

export type VerifyType = Pick<IUser, "email" | "isVerified">;
