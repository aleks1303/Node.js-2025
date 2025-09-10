const express = require('express');
const app = express();
const path = require('node:path');
const fs = require('node:fs/promises');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userFile = path.join(__dirname, 'users.json');

const writeUser = async (users) => {
    await fs.writeFile(userFile, JSON.stringify(users, null, 2));
};

const readUser = async () => {
    try {
        const data = await fs.readFile(userFile, 'utf-8')
        return JSON.parse(data)
    } catch (e) {
        if (e.code === 'ENOENT') {
            await fs.writeFile(userFile, JSON.stringify([], null, 2));
            return []
        }
    }
};

app.get('/users', async (req, res) => {
    const users = await readUser()
    return res.send(users);
});

app.post('/users', async (req, res) => {
    try {
        const {name, age, email, password} = req.body;
        const users = await readUser();
        if (name.length < 3) {
            return res.send('Name is wrong')
        }
        if (age <= 0 && age > 120) {
            return res.send('Age is wrong')
        }
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        const newUser = {id, name, age, email, password};
        users.push(newUser);
        await writeUser(users);
        return res.status(201).send(newUser)
    } catch (e) {
        res.status(500).send(e.message)
    }
});

app.get('/users/:userId',async (req, res) => {
    try{
        const userId = Number(req.params.userId);
        const users = await readUser();
        const user = users.find(user => user.id === userId);
        if (!user) {
           return res.status(404).send('User not found')
        }
        return res.send(user)
    }
    catch (e){
        return res.status(500).send(e.message)
    }
});

app.put('/users/:userId', async (req, res) => {
    try{
        const userId = Number(req.params.userId);
        const users = await readUser();
        const user = users.findIndex(user => user.id === userId);
        if (user === -1) {
            return res.status(404).send('User Not Found')
        }
        const {name, age, email, password} = req.body;
        users[user].name = name;
        users[user].age = age;
        users[user].email = email;
        users[user].password = password;
        await writeUser(users);
        return res.status(201).send(users[user])
    }
    catch (e){
        return res.status(500).send(e.message)
    }
});

app.delete('/users/:userId', async (req, res) => {
    try{
        const userId = Number(req.params.userId);
        const users = await readUser();
        const user = users.findIndex(user => user.id === userId);
        if (user === -1) {
            return res.status(404).send('User not found')
        }
        users.splice(user, 1)
        await writeUser(users)
        return res.sendStatus(204);
    }
    catch (e){
        return res.status(500).send(e.message)
    }
});

app.listen(3000, () => {
    console.log('We are listening on port 3000')
})