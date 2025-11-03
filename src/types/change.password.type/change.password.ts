import { IUser } from "../../interfaces/user.interface";

export type ChangePassword = Pick<IUser, "password"> & { oldPassword: string };
