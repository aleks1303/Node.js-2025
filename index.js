const express = require("express")
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const users = [
    {id: 1, name: 'vasya', age: 23, email: 'vas31@gmail.com', password: 'qwe233'},
    {id: 2, name: 'petya', age: 34, email: 'pet30@gmail.com', password: '233eds'},
    {id: 3, name: 'kolya', age: 53, email: 'kolya29@gmail.com', password: 'ddf3455'},
    {id: 4, name: 'olga', age: 13, email: 'olga28@gmail.com', password: 'red3455'},
    {id: 5, name: 'max', age: 33, email: 'max30@gmail.com', password: '43ew234'},
    {id: 6, name: 'anya', age: 27, email: 'anya31@gmail.com', password: '4e3w2'},
    {id: 7, name: 'oleg', age: 28, email: 'oleg28@gmail.com', password: '3we4r'},
    {id: 8, name: 'andrey', age: 43, email: 'andrey29@gmail.com', password: 'dfr43'},
    {id: 9, name: 'masha', age: 33, email: 'masha30@gmail.com', password: '432werf'},
    {id: 10, name: 'olga', age: 41, email: 'olya31@gmail.com', password: '432dfg'},

];

app.get('/users', (req, res) => {
    try{
        res.send(users)
    } catch (e) {
        res.status(500).send(e.message)
    }
});
app.post('/users', (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (name.length < 3) {
            res.send('Name is low')
        }
        if (email === !'@') {
            res.send('Email wrong')
        }
        if (password < 1 && password > 20) {
            res.send('Password wrong')
        }
        const id = users[users.length - 1].id + 1;
        const newUser = {id, name, email, password};
        users.push(newUser);
        res.status(201).send(newUser)
    }
    catch (e){
        res.send(500).send(e.message)
    }

});
app.get('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const user = users.find(user => user.id === userId);
        if (!user) {
            res.status(404).send('User Not found')
        }
        res.send(user)
        console.log(userId)
    } catch (e) {
        res.status(500).send(e.message)
    }
});

app.put('/users/:userId', (req, res) => {
    try{
        const userId = Number(req.params.userId);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1){
            return res.status(404).send('User not found')
        }
        const {name, email, password} = req.body;
        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].password = password;
        res.status(201).send(users[userIndex])
    }
    catch (e){
        res.status(500).send(e.message)
    }
})

app.delete('/users/:userId', (req, res) => {
    try{
        const userId = Number(req.params.userId)
        const userIndex = users.findIndex(user => user.id === userId)
        if (userIndex === -1) {
            res.status(404).send('User not found')
        }
        users.splice(userIndex, 1)
        res.sendStatus(204)
    }
    catch (e){
        res.status(500).send(e.message)
    }
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/users')
});


// Текстовий урок
// BE. NodeJS HW3
// Закінчити з CRUD операціями.
//
//     При створенні робити валідацію на імʼя і вік,
//
//     імʼя повинно бути більше за 3 символи, вік – не менше нуля
//
// На гет, пут, деліт юзерів перевірити чи такий юзер є в базі.
//
//     якщо немає – вивести помилку
//
// Використовуйте шляхи для нових ендпоінтів згідно REST правил

