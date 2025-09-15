"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const pathToFile = node_path_1.default.join(process.cwd(), 'db.json');
const read = async () => {
    try {
        const data = await promises_1.default.readFile(pathToFile, 'utf-8');
        return data ? JSON.parse(data) : [];
    }
    catch (e) {
        if (e.code === "ENOENT") {
            await promises_1.default.writeFile(pathToFile, JSON.stringify([], null, 2), "utf-8");
            return [];
        }
        console.log("Помилка запису", e.message);
    }
};
exports.read = read;
const write = async (users) => {
    try {
        await promises_1.default.writeFile(pathToFile, JSON.stringify(users, null, 2), 'utf-8');
    }
    catch (e) {
        console.log("Помилка запису", e.message);
    }
};
exports.write = write;
