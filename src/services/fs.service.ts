import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "../interfaces/user.interface";

const pathToFile = path.join(process.cwd(), "db.json");

const read = async (): Promise<IUser[]> => {
  const data = await fs.readFile(pathToFile, "utf-8");
  return data ? JSON.parse(data) : [];
};

const write = async (users: IUser[]): Promise<void> => {};
