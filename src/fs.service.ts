import fs from 'node:fs/promises';
import path from 'node:path';



const write = async (users) => {
    try {
        const pathToFile = path.join(process.cwd(), 'db.json');
        await fs.writeFile(pathToFile, JSON.stringify(users));
    }
    catch (e) {
        console.log("Помилка запису", e.message);
    }
};
const read = async () => {
    try {
        const pathToFile = path.join(process.cwd(), 'db.json');
        const data = await fs.readFile(pathToFile, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.log("Помилка запису", e.message);
    }
};

export { read, write };