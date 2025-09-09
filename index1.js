const express = require('express');
const app = express();
const path = require("node:path");
const fs = require("node:fs/promises");
const {urlencoded} = require("express");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const usersFile = path.join(__dirname, 'users1.json');

const writeUser = async (users) => {
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2), "utf-8")
};

const readUser = async () => {
    try {
        const data = await fs.readFile(usersFile, "utf-8");
        return JSON.parse(data)
    } catch (e) {
        if (e.code === "ENOENT") {
            await fs.writeFile(usersFile, JSON.stringify([], null, 2))
            return []
        }
    }
};

app.get('/users', async (req, res) => {
   try {
       const users = await readUser();
       res.send(users)
   }
   catch (e) {
       return res.status(500).send(e.message)
   }
});

app.get('/users/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const users = await readUser()
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).send('User not found')
        }
        return res.send(user)
    } catch (e) {

    }
});
app.post('/users', async (req, res) => {
    try{
        const {name, age, email, password} = req.body;
        const users = await readUser();
        if (name < 3) {
            return res.send("Name too little")
        }
        if (age >= 0) {
            return res.send('age too little')
        }
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        const newUser = {id, name, age, email, password};
        users.push(newUser);
        await writeUser(users);
        return res.status(200).send(newUser)
    }
    catch (e) {
        return res.status(500).send(e.message)
    }
});



