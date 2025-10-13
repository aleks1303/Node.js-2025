import { IUser } from "../interfaces/user.interface";

export type SignIn = Pick<IUser, "email" | "password">;
