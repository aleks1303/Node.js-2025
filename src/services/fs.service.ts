import fs from "node:fs/promises";
import path from "node:path";

const pathToFile = path.join(process.cwd(), "db.json");

const read = async () => {
  const data = await fs.readFile(pathToFile, "utf-8");
  return data ? JSON.parse(data) : []
};
