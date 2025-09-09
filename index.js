const express = require("express")
const app = express()
const path = require('node:path');
const fsPromises = require('node:fs/promises');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const usersFile = path.join(__dirname, 'users.json')

const userWrite = async (users) => {
    await fsPromises.writeFile(usersFile, JSON.stringify(users, null, 2), "utf-8")
};

const userRead = async () => {
    try {
        const data = await fsPromises.readFile(usersFile, "utf-8")
        return JSON.parse(data)
    } catch (e) {
        if (e.code === 'ENOENT') {
            await fsPromises.writeFile(usersFile, JSON.stringify([], null, 2), "utf-8")
            return []
        }
    }
};

app.get('/users', async (req, res) => {
    try {
        const users = await userRead()
        res.send(users)
    } catch (e) {
       return  res.status(500).send(e.message)
    }
});

app.post('/users', async (req, res) => {
    try {
        const {name, age, email, password} = req.body;
        const users = await userRead()
        if (name.length < 3) {
         return  res.send('Name is low')
        }
        if (age <= 0) {
           return  res.send('age wrong')
        }
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        const newUser = {id, name, age, email, password};
        users.push(newUser);
        await userWrite(users)
        res.status(201).send(newUser)
    } catch (e) {
       return res.status(500).send(e.message)
    }
});

app.get('/users/:userId', async (req, res) => {
    try {

        const userId = Number(req.params.userId);
        const users = await userRead()
        const user = users.find(user => user.id === userId);
        if (!user) {
           return  res.status(404).send('User Not found')
        }
       return res.send(user)

    } catch (e) {
        res.status(500).send(e.message)
    }
});

app.put('/users/:userId', async (req, res) => {
    try {

        const userId = Number(req.params.userId);
        const users = await userRead();
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send('User not found')
        }
        const {name, age, email, password} = req.body;
        users[userIndex].name = name;
        users[userIndex].age = age;
        users[userIndex].email = email;
        users[userIndex].password = password;
        await userWrite(users)
        res.status(201).send(users[userIndex])
    } catch (e) {
       return  res.status(500).send(e.message)
    }
});

app.delete('/users/:userId', async (req, res) => {
    try {

        const userId = Number(req.params.userId);
        const users = await userRead()
        const userIndex = users.findIndex(user => user.id === userId)
        if (userIndex === -1) {
           return  res.status(404).send('User not found')
        }
        users.splice(userIndex, 1)
        await userWrite(users)
        res.sendStatus(204)
    } catch (e) {
       return  res.status(500).send(e.message)
    }
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/users')
});


