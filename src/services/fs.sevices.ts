import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "../interfaces/user.interface";

const pathToFile = path.join(process.cwd(), "db.json");

const read = async () => {
  try {
    const data = await fs.readFile(pathToFile, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    if (e.code === "ENOENT") {
      await fs.writeFile(pathToFile, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
  }
};

const write = async (users: IUser): Promise<void> => {
  try {
    await fs.writeFile(pathToFile, JSON.stringify(users, null, 2), "utf-8");
  } catch (e) {
    console.log("Помилка запису", e.message);
  }
};

export { read, write };
