// д/з
// створити 5 папок, а в кожній з них 5 файлів, прочитати їх і визначити, чи це файл, чи папка

const path = require('node:path');
const fsPromises = require('node:fs/promises');



const create = async () => {
    const basePath = path.join(__dirname, 'folders');
    await fsPromises.mkdir(basePath, {recursive:true})
    for (let i = 1; i <= 5; i++) {
        const folder = path.join(__dirname, 'folders', `folder${i}`)
        await fsPromises.mkdir(folder, {recursive: true})
        for (let j = 1; j <= 5; j++) {
            const file = path.join(folder, `test.txt${j}`)
            await fsPromises.writeFile(file, `Hello I am for folder${i} and file${j}`)
        }
    }
    const walk = async (dir) => {
        const items = await fsPromises.readdir(dir, { withFileTypes: true });

        for (const item of items) {
            const fullPath = path.join(dir, item.name);

            if (item.isDirectory()) {
                console.log(fullPath, `папка`);
                await walk(fullPath);
            } else if (item.isFile()) {
                console.log(fullPath, `файл`);
            }
        }
    };

    await walk(basePath);
}
void create();
