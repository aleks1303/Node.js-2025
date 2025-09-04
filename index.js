// const http = require('node:http');
// const path = require('node:path');
// const readline = require('node:readline/promises');
// const fsPromises = require('node:fs/promises');
// const fs = require('node:fs');
// const EventEmitter = require('node:events');
// const os = require('node:os')


// Global model (objects) in Node.js


const index = async () => {

    //http
    // const server = http.createServer((req, res) => {
    //     res.writeHead(200, { 'Content-Type': 'application/json'});
    //     res.end(JSON.stringify({
    //         data:'Hello I am server'
    //     }));
    // });
    // server.listen(3000)

    // Path
    //  const pathToFile = __filename;
    //  console.log(pathToFile);
    //  console.log(path.dirname(pathToFile));
    //  console.log(path.extname(pathToFile));
    //  console.log(path.basename(pathToFile));
    //  console.log(path.parse(pathToFile));
    //  console.log(path.isAbsolute(pathToFile));

    //ReadLine
    // const rlInstance = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // })
    // const name = await rlInstance.question('Name?');
    // console.log(`Hello ${name}`)
    // process.exit(0)

    //fs
    // const pathToFile = path.join(__dirname, 'test.txt');
    // await fsPromises.writeFile(pathToFile, 'Hello! I am here, Ben.\n');
    // const data = await fsPromises.readFile(pathToFile, "utf-8")
    // console.log(data.toString())   // теж саме, що і utf-8
    // await fsPromises.appendFile(pathToFile, 'Oh, You are here, Hello!')
    // const folder = await fsPromises.mkdir(path.join(__dirname, 'folder'), {recursive:true}) // створення папки
    // // await fsPromises.rm(path.join(__dirname, 'folder'), {recursive: true}); // видалення папки
    // //await fsPromises.unlink(pathToFile) // видалення файла
    // //await fsPromises.rename(pathToFile, path.join(__dirname, 'new-test.txt'));
    // //await fsPromises.copyFile(pathToFile, path.join(__dirname, 'folder', 'new-test.txt'));
    // const stat = await fsPromises.stat(pathToFile)
    // console.log(stat)
    // console.log(stat.isDirectory())
    // console.log(stat.isFile())

    //Streams
    // Для того, щоб читати великий файл і не навантажувати оперативну пам'ять
    // створюють stream, щоб розбити файл та читати невеликими частини
    // const pathToFile = path.join(__dirname, 'stream.pgf');
    // await fsPromises.writeFile(pathToFile, 'Hello! I am here, Ben.\n');
    // const readStream = fs.createReadStream(pathToFile);
    // const writeStream = fs.createWriteStream(path.join(__dirname, 'new-big-file.pdf'));
    // readStream.on('data', (chunk) => {
    //     console.log('chunk', chunk.length);
    //     writeStream.write(chunk)
    // });
    // //
    // readStream.pipe(writeStream) // теж саме, що зверху stream readStream

    //Events
    // const emitter = new EventEmitter;
    // emitter.on('event', () => {
    //     console.log('Hello emitter')
    // });
    // emitter.emit('event') // це можна викликати в різних місцях багато раз
    //
    // emitter.on('event1', () => {
    //     console.log('Event happened 1')
    //
    // });
    // emitter.once('event1', (...args) => {
    //     console.log('Event happened 2')// відпрацює лише раз
    //     console.log(args)
    //     console.log('...............')
    // });
    // emitter.on('event1', (...args) => {
    //     console.log('Event happened 3 time')
    //     console.log(args)
    // })
    // emitter.emit('event1', 'hello', 43, 33, 'bye')
    // emitter.emit('event1')
    // emitter.emit('event1', 555)

    //OS взаємодія з операційною системою
    // console.log(os.arch())
    // console.log(os.cpus())
    // console.log(os.freemem() / 1024 / 1024 / 1024, 'gb')
    // console.log(os.totalmem()/ 1024 / 1024 / 1024, 'gb')
    // console.log(os.homedir())
    // console.log(os.hostname())
    // console.log(os.platform())
    // console.log(os.userInfo())


}
void index()

