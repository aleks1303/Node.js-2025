import express, {Request, Response} from 'express';

import {write, read} from "./fs.service";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await read()
        return res.send(users);
    } catch (e) {
        res.status(500).send(e.message)
    }
});

app.post('/users', async (req: Request, res: Response) => {
    try {
        const {name, age, email, password} = req.body;
        const users = await read();
        if (!name || name.length < 3) {
            return res.status(400).send('Name is wrong')
        }
        if (age <= 0 || age > 120) {
            return res.status(400).send('Age is wrong')
        }
        if (!email || !email.includes("@")) {
            return res.status(400).send('Email is wrong')
        }
        if (!password || password.length < 6) {
            return res.status(400).send('Password is wrong')
        }
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        const newUser = {id, name, age, email, password};
        users.push(newUser);
        await write(users);
        return res.status(201).send(newUser)
    } catch (e) {
        res.status(500).send(e.message)
    }
});

app.get('/users/:userId', async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const users = await read();
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).send('User not found')
        }
        return res.send(user)
    } catch (e) {
        return res.status(500).send(e.message)
    }
});

app.put('/users/:userId', async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const users = await read();
        const user = users.findIndex(user => user.id === userId);
        if (user === -1) {
            return res.status(404).send('User Not Found')
        }
        const {name, age, email, password} = req.body;
        users[user].name = name;
        users[user].age = age;
        users[user].email = email;
        users[user].password = password;
        await write(users);
        return res.status(201).send(users[user])
    } catch (e) {
        return res.status(500).send(e.message)
    }
});

app.delete('/users/:userId', async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const users = await read();
        const user = users.findIndex(user => user.id === userId);
        if (user === -1) {
            return res.status(404).send('User not found')
        }
        users.splice(user, 1)
        await write(users)
        return res.sendStatus(204);
    } catch (e) {
        return res.status(500).send(e.message)
    }
});

app.listen(3000, () => {
    console.log('We are listening on port 3000')
})
