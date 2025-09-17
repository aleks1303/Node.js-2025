import fs from "node:fs/promises";
import path from "node:path";

const pathToFile = path.join(process.cwd(), "db.json");

const read = async (users) => {
  await fs.readFile(pathToFile, JSON.stringify(users));
};

const write = () => {

};

export { read, write };
